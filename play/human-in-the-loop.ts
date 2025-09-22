import { z } from 'zod';
import readline from 'node:readline/promises';
import fs from 'node:fs/promises';
import { Agent, run, tool, RunState, RunResult, setDefaultOpenAIClient, setOpenAIAPI, setTracingDisabled } from '@openai/agents';

import OpenAI from 'openai';
import { observeOpenAI } from "@langfuse/openai";
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.EXAMPLE_BASE_URL || '';
const API_KEY = process.env.EXAMPLE_API_KEY || '';
const MODEL_NAME = process.env.EXAMPLE_MODEL_NAME || '';


if (!BASE_URL || !API_KEY || !MODEL_NAME) {
  throw new Error(
    'Please set EXAMPLE_BASE_URL, EXAMPLE_API_KEY, EXAMPLE_MODEL_NAME via env var or code.',
  );
}

const openaiClient = observeOpenAI(new OpenAI({
  apiKey: API_KEY,
  baseURL: BASE_URL,
}))

setDefaultOpenAIClient(openaiClient); // Pass the OpenAI client instance
setOpenAIAPI('chat_completions');
// Enable tracing to work with Langfuse
setTracingDisabled(false);


const getWeatherTool = tool({
  name: 'get_weather',
  description: '获取指定城市的天气',
  parameters: z.object({
    city: z.string(),
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is sunny`;
  },
});

// A specialist sub-agent that we will expose as a tool.
const weatherAgent = new Agent({
  name: 'Weather agent',
  instructions: '您根据输入提供简明的天气信息。',
  handoffDescription: '处理与天气相关的查询',
  model: MODEL_NAME,
  tools: [getWeatherTool],
});
  
const getTemperatureTool = tool({
  name: 'get_temperature',
  description: '获取指定城市的温度',
  parameters: z.object({
    city: z.string(),
  }),
  needsApproval: async (_ctx, { city }) => city.includes('Oakland'),
  execute: async ({ city }) => {
    return `The temperature in ${city} is 20° Celsius`;
  },
});

// Main agent that can call the weather agent as a tool.
const agent = new Agent({
  name: 'Basic test agent',
  instructions:
    '您是一个基础代理。对于天气问题，使用天气代理工具并输入适当的字符串，然后回答。',
  model: MODEL_NAME,
  tools: [
    getTemperatureTool,
    weatherAgent.asTool({
      toolName: 'ask_weather_agent',
      toolDescription:
        '询问天气代理关于一个地点。传递一个短输入字符串。',
      // Demonstrate approvals at the agent-as-tool level.
      // Require approval when the input mentions San Francisco.
      needsApproval: async (_ctx, { input }) => input.includes('San Francisco'),
    }),
  ],
});

async function confirm(question: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await rl.question(`${question} (y/n): `);
  const normalizedAnswer = answer.toLowerCase();
  rl.close();
  return normalizedAnswer === 'y' || normalizedAnswer === 'yes';
}

async function main() {
  let result: RunResult<unknown, Agent<unknown, any>> = await run(
    agent,
    '北京和杭州的天气和温度是多少？根据需要使用可用工具。',
  );
  let hasInterruptions = result.interruptions?.length > 0;
  while (hasInterruptions) {
    // storing
    await fs.writeFile(
      'result.json',
      JSON.stringify(result.state, null, 2),
      'utf-8',
    );

    // from here on you could run things on a different thread/process

    // reading later on
    const storedState = await fs.readFile('result.json', 'utf-8');
    const state = await RunState.fromString(agent, storedState);

    for (const interruption of result.interruptions) {
      const confirmed = await confirm(
        `代理 ${interruption.agent.name} 想要使用工具 ${interruption.rawItem.name} 并传递 "${interruption.rawItem.arguments}"。您是否批准？`,
      );

      if (confirmed) {
        state.approve(interruption);
      } else {
        state.reject(interruption);
      }
    }

    // resume execution of the current state
    result = await run(agent, state);
    hasInterruptions = result.interruptions?.length > 0;
  }

  console.log(result.finalOutput);
}

main().catch((error) => {
  console.dir(error, { depth: null });
});

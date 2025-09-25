import "./instrumentation.ts"; 

import {
  Agent,
  run,
  setTracingDisabled,
  tool,
  setDefaultOpenAIClient,
  setOpenAIAPI,
} from '@openai/agents';
import OpenAI from 'openai';
import { observeOpenAI } from "@langfuse/openai";
import { z } from 'zod';
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

// ---- 通用工具（可被多个 Agent 复用） ----
const getWeather = tool({
  name: 'get_weather',
  description: '获取指定城市的天气信息',
  parameters: {
    type: 'object',
    properties:{
      city: {
        type: 'string',
        description: '要查询天气的城市名称',
      },
    },
    required: ['city'],
    additionalProperties: false,
  },
  async execute(input) {
    console.log(`[debug] 正在查询 ${input} 的天气`);
    const { city } = input as { city: string };
    console.log(`[debug] 正在查询 ${city} 的天气`);
    return `${city} 多云，气温 12-22°C，无风`;
  },
});

const getTravelInfo = tool({
  name: 'get_travel_info',
  description: '获取城市的旅行景点和活动信息',
  parameters: z.object({
    city: z.string().describe('要查询旅行信息的城市名称'),
  }),
  async execute(input) {
    console.log(`[debug] 正在查询 ${input.city} 的旅行信息`);
    return `${input.city} 有很多值得探索的景点, 宽窄巷子、锦里、武侯祠等文化古迹`;
  },
});

const getRestaurantInfo = tool({
  name: 'get_restaurant_info',
  description: '获取城市的特色餐厅和美食推荐',
  parameters: z.object({
    city: z.string().describe('要查询餐厅信息的城市名称'),
  }),
  async execute(input) {
    console.log(`[debug] 正在查询 ${input.city} 的餐厅信息`);
    return `${input.city} 有很多特色餐厅值得尝试, 蜀九香火锅、陈麻婆豆腐、龙抄手等川菜`;
  },
});

// ---- 专业代理们（各司其职） ----
const weatherAgent = new Agent({
  name: 'weather_agent',
  instructions: '天气信息专家。专门负责查询和分析天气信息，为旅行规划提供天气建议。',
  model: MODEL_NAME,
  tools: [getWeather],
});

const travelAgent = new Agent({
  name: 'travel_agent',
  instructions: '旅行景点专家。专门负责推荐旅行景点和活动，提供详细的游览建议。',
  model: MODEL_NAME,
  tools: [getTravelInfo],
});

const restaurantAgent = new Agent({
  name: 'restaurant_agent',
  instructions: '美食餐厅专家。专门负责推荐特色餐厅和美食，介绍当地饮食文化。',
  model: MODEL_NAME,
  tools: [getRestaurantInfo],
});


// ---- 主入口代理：负责意图理解与多代理交接 ----
const concierge = Agent.create({
  name: 'concierge',
  instructions: `你是智能旅行助手总协调员。当用户询问旅行相关问题时，你需要协调各个专家来提供服务
请用中文与用户友好交流。`,
  model: MODEL_NAME,
  handoffs: [weatherAgent, travelAgent, restaurantAgent],
});

async function main() {
  try {
    const result = await run(concierge, '成都的天气如何');

    console.log(`📝 回复: ${result.finalOutput}`);

  } catch (error) {
    console.error('❌ 系统错误:', error);
  }
}

main();

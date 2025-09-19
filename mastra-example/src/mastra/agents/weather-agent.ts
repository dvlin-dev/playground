import { createOpenAI } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';

// 创建自定义 OpenAI 配置，支持自定义 base URL
const customOpenAI = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1", // 从环境变量读取，默认使用官方 API
  apiKey: process.env.OPENAI_API_KEY,
});

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      您是一位有帮助的天气助手，提供准确的天气信息，并能根据天气帮助规划活动。

      您的主要功能是帮助用户获取特定地点的天气详情。回复时：

      - 如果未提供地点，始终询问地点

      - 如果地点名称不是英文，请翻译

      - 如果地点包含多个部分（例如“New York, NY”），使用最相关的部分（例如“New York”）

      - 包含相关细节，如湿度、风况和降水情况

      - 回复简洁但信息丰富

      - 如果用户询问活动并提供天气预报，根据天气预报建议活动

      - 如果用户询问活动，按其要求的格式回复

      使用weatherTool获取当前天气数据。
`,
  model: customOpenAI('gpt-4.1'), // 使用自定义配置的 OpenAI
  tools: { weatherTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});

import * as readline from 'readline';
import { ChatClient } from './client/client';
import { getPrompts } from './prompts/prompts';
import { ServerTool } from './server/server';
import { handleToolRequest } from './tool/tool';
import * as dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

/**
 * 启动对话循环
 */
async function startConversationLoop(apiKey: string, apiUrl: string, model: string): Promise<void> {
  try {
    // 初始化 MCP 服务器
    const mcpServers = await ServerTool.newTool();
    const prompt = getPrompts(mcpServers.getMCPServerStringList());
    const chatClient = new ChatClient(apiKey, apiUrl, model, prompt);

    // 创建一个 readline 接口用于读取用户输入
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // 定义一个函数来获取用户输入
    function getUserInput(): Promise<string> {
      return new Promise((resolve) => {
        rl.question('You: ', (answer: string) => {
          resolve(answer);
        });
      });
    }

    // 开始对话循环
    while (true) {
      const userInput = await getUserInput();
      try {
        const response = await chatClient.sendMessage(userInput);
        
        // 处理响应以检查是否包含 ToolRequest
        const handled = await handleToolRequest(response, mcpServers, chatClient);
        if (handled) {
          continue; // 如果处理了 ToolRequest，则继续下一次迭代
        }

        console.log('Assistant:', response);
      } catch (error) {
        console.error(`Error: ${error}`);
        break;
      }
    }

    rl.close();
  } catch (error) {
    console.error(`Fatal error: ${error}`);
    process.exit(1);
  }
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  // 从环境变量中读取API密钥和URL
  const apiKey = process.env.API_KEY || '';
  const apiUrl = process.env.API_URL || 'https://api.deepseek.com/v1/chat/completions';
  const model = process.env.MODEL || 'deepseek-chat';
  
  // 验证必要的环境变量
  if (!apiKey) {
    console.error('错误：缺少API_KEY环境变量');
    process.exit(1);
  }
  
  await startConversationLoop(apiKey, apiUrl, model);
}

// 调用主函数
main().catch((error) => {
  console.error(`Unhandled error: ${error}`);
  process.exit(1);
}); 
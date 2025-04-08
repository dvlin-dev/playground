import { ChatClient } from '../client/client';
import { ServerTool } from '../server/server';
import { buildRequest } from '../req/request';

/**
 * ToolRequest 接口表示 JSON 响应中的 "server" 和 "arguments"
 */
export interface ToolRequest {
  name: string;
  arguments: { [key: string]: any };
}

/**
 * 处理工具请求函数，用于处理并检查响应是否为 ToolRequest 类型
 */
export async function handleToolRequest(
  response: string,
  mcpServers: ServerTool,
  chatClient: ChatClient
): Promise<boolean> {
  try {
    // 尝试将响应解析为 ToolRequest 结构
    const request = JSON.parse(response) as ToolRequest;
    
    // 如果解析失败或没有 name 属性，则返回 false 继续正常处理
    if (!request || !request.name) {
      return false;
    }

    // 搜索对应的 mcpServer 并向其发送请求
    for (const mcpServer of mcpServers.getServer()) {
      if (request.name === mcpServer.name) {
        try {
          const requestStr = await buildRequest(mcpServer.host, request.arguments);
          const response = await chatClient.sendMessage(requestStr);
          console.log('Assistant:', response);
          return true;
        } catch (error) {
          throw new Error(`Error sending message: ${error}`);
        }
      }
    }
    
    return false;
  } catch (error) {
    // 如果它不是一个 ToolRequest，返回 false 继续正常处理
    return false;
  }
} 
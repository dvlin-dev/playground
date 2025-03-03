import * as fs from 'fs';
import * as path from 'path';

export interface Args {
  key: string;
  value: string;
  description: string;
}

export interface MCPServer {
  name: string;
  version: string;
  type: string;
  host: string;
  description: string;
  args: Args[];
  response: string;
}

export interface Tool {
  server: MCPServer[];
}

export class ServerTool {
  private tool: Tool;

  constructor(data: Tool) {
    this.tool = data;
  }

  /**
   * 创建一个新的 ServerTool 实例
   */
  static async newTool(): Promise<ServerTool> {
    try {
      // 读取 server.json 文件
      const filePath = path.resolve(__dirname, '../../server.json');
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      const data = JSON.parse(fileContent) as Tool;
      
      return new ServerTool(data);
    } catch (error) {
      throw new Error(`Failed to load server.json: ${error}`);
    }
  }

  /**
   * 获取 MCP 服务器列表的字符串表示
   */
  getMCPServerStringList(): string {
    const servers = this.tool.server;
    const result: string[] = [];

    for (const server of servers) {
      // 构建每个 MCPServer 的字符串表示
      let serverInfo = `Name: ${server.name}, Version: ${server.version}, Type: ${server.type}, ` +
                      `Host: ${server.host}, Description: ${server.description}, Response: ${server.response}`;

      // 如果有参数信息，则添加
      if (server.args && server.args.length > 0) {
        const argsInfo = server.args.map(arg => 
          `Key: ${arg.key}, Value: ${arg.value}, Description: ${arg.description}`
        );
        serverInfo = `${serverInfo}, Args: [${argsInfo.join('; ')}]`;
      }

      // 将 MCPServer 的信息添加到结果列表
      result.push(serverInfo);
    }

    // 将所有 MCPServer 信息合并为一个字符串
    return result.join('\n');
  }

  /**
   * 获取服务器列表
   */
  getServer(): MCPServer[] {
    return this.tool.server;
  }
} 
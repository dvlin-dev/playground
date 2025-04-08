import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import readline from "readline/promises";
import dotenv from "dotenv";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Command } from "commander";

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const API_MODEL = process.env.API_MODEL;
if (!API_KEY) {
  throw new Error("API_KEY is not set");
}

class MCPClient {
  private mcp: Client;
  private openai: OpenAI;
  private transport: SSEClientTransport | StdioClientTransport | null = null;
  private tools: ChatCompletionTool[] = [];

  constructor() {
    this.openai = new OpenAI({
      apiKey: API_KEY,
      baseURL: API_URL,
    });
    this.mcp = new Client({ 
      name: "mcp-client-cli", 
      version: "1.0.0",
      capabilities: {
        resources: {},
        tools: {},
      }
    });
  }
  
  async connectToServer(url: string, type: "sse" | "stdio" = "stdio") {
    console.log("Connecting to server at:", url, type);
    try {
      if (type === "sse") {
        this.transport = new SSEClientTransport(
          new URL(url)
        );
        console.info("SSE transport created");
      } else {
        const isJs = url.endsWith(".js");
        const isPy = url.endsWith(".py");
        if (!isJs && !isPy) {
          throw new Error("Server script must be a .js or .py file");
        }
        const command = isPy
          ? process.platform === "win32"
            ? "python"
            : "python3"
          : process.execPath;
        this.transport = new StdioClientTransport({
          command,
          args: [url],
        });
        console.info("Stdio transport created");
      }
      await this.mcp.connect(this.transport);
      console.info("Connect to server");
      const toolsResult = await this.mcp.listTools();
      this.tools = toolsResult.tools.map((tool) => {
        return {
          type: "function",
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.inputSchema,
          }
        };
      });
      console.log(
        "Connected to server with tools:",
        this.tools.map(({ function: { name } }) => name)
      );
    } catch (e) {
      console.log("Failed to connect to MCP server: ", e);
      throw e;
    }
  }

  async processQuery(query: string) {
    try {
      const messages: ChatCompletionMessageParam[] = [
        {
          role: "user",
          content: query,
        },
      ];
  
      const response = await this.openai.chat.completions.create({
        model: API_MODEL || 'gpt-4o',
        max_tokens: 1000,
        messages,
        tools: this.tools,
      });
  
      const finalText = [];
      const toolResults = [];

      if (response.choices[0]?.message?.tool_calls?.length) {
        const toolCalls = response.choices[0].message.tool_calls;

        for (const toolCall of toolCalls) {
          const toolName = toolCall.function.name;
          const toolArgs = JSON.parse(toolCall.function.arguments);
          
          const result = await this.mcp.callTool({
            name: toolName,
            arguments: toolArgs,
          });

          toolResults.push(result);
          finalText.push(
            `[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`
          );
    
          messages.push({
            role: "assistant",
            tool_calls: [toolCall],
          });
          
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: result.content as string,
          });
    
          
          const followUpResponse = await this.openai.chat.completions.create({
            model: API_MODEL || 'gpt-4o',
            messages,
          });

          finalText.push(followUpResponse.choices[0]?.message?.content || "");
        }
      } else if (response.choices[0]?.message?.content) {
        finalText.push(response.choices[0].message.content);
      }
    
      return finalText.join("\n");
    } catch (error) {
      console.log('processQueryerror:', error);
      throw error;
    }
  }

  async chatLoop() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    try {
      console.log("\nMCP Client Started!");
      console.log("Type your queries or 'quit' to exit.");
  
      while (true) {
        const message = await rl.question("\nQuery: ");
        if (message.toLowerCase() === "quit") {
          break;
        }
        const response = await this.processQuery(message);
        console.log("\n" + response);
      }
    } finally {
      rl.close();
    }
  }
  
  async cleanup() {
    await this.mcp.close();
  }
}

async function main() {
  const program = new Command();
  
  program
    .name("mcp-client")
    .description("MCP 客户端命令行工具")
    .version("1.0.0")
    .argument("<url>", "服务器 URL 或脚本路径")
    .option("-t, --transport <type>", "传输类型 (sse 或 stdio)", "stdio")
    .addHelpText("after", `
示例:
  SSE模式: node build/index.js --transport sse http://127.0.0.1:5101/sse
  stdio模式: node build/index.js ../servers/weather/build/index.js
    `)
    .parse(process.argv);

  const options = program.opts();
  const serverUrl = program.args[0];
  const transportType = options.transport as "sse" | "stdio";

  const mcpClient = new MCPClient();
  try {
    await mcpClient.connectToServer(serverUrl, transportType);
    await mcpClient.chatLoop();
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();
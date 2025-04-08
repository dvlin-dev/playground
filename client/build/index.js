import { Anthropic } from "@anthropic-ai/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline/promises";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const API_MODEL = process.env.API_MODEL;
if (!API_KEY) {
    throw new Error("API_KEY is not set");
}
class MCPClient {
    mcp;
    anthropic;
    transport = null;
    tools = [];
    constructor() {
        this.anthropic = new Anthropic({
            apiKey: API_KEY,
            baseURL: API_URL,
        });
        this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
    }
    async connectToServer(serverScriptPath) {
        try {
            const isJs = serverScriptPath.endsWith(".js");
            const isPy = serverScriptPath.endsWith(".py");
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
                args: [serverScriptPath],
            });
            this.mcp.connect(this.transport);
            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    input_schema: tool.inputSchema,
                };
            });
            console.log("Connected to server with tools:", this.tools.map(({ name }) => name));
        }
        catch (e) {
            console.log("Failed to connect to MCP server: ", e);
            throw e;
        }
    }
    async processQuery(query) {
        try {
            const messages = [
                {
                    role: "user",
                    content: query,
                },
            ];
            console.log(API_KEY, API_MODEL, API_URL);
            const response = await this.anthropic.messages.create({
                model: API_MODEL || 'claude-3-5-sonnet-20241022',
                max_tokens: 1000,
                messages,
                tools: this.tools,
            });
            console.log(response);
            const finalText = [];
            const toolResults = [];
            for (const content of response.content) {
                if (content.type === "text") {
                    finalText.push(content.text);
                }
                else if (content.type === "tool_use") {
                    const toolName = content.name;
                    const toolArgs = content.input;
                    const result = await this.mcp.callTool({
                        name: toolName,
                        arguments: toolArgs,
                    });
                    toolResults.push(result);
                    finalText.push(`[Calling tool ${toolName} with args ${JSON.stringify(toolArgs)}]`);
                    messages.push({
                        role: "user",
                        content: result.content,
                    });
                    const response = await this.anthropic.messages.create({
                        model: "claude-3-5-sonnet-20241022",
                        max_tokens: 1000,
                        messages,
                    });
                    finalText.push(response.content[0].type === "text" ? response.content[0].text : "");
                }
            }
            return finalText.join("\n");
        }
        catch (error) {
            console.log('processQueryerror:', error);
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
        }
        finally {
            rl.close();
        }
    }
    async cleanup() {
        await this.mcp.close();
    }
}
async function main() {
    if (process.argv.length < 3) {
        console.log("Usage: node index.ts <path_to_server_script>");
        return;
    }
    const mcpClient = new MCPClient();
    try {
        await mcpClient.connectToServer(process.argv[2]);
        await mcpClient.chatLoop();
    }
    finally {
        await mcpClient.cleanup();
        process.exit(0);
    }
}
main();

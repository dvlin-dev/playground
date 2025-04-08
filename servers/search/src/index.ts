import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { search, SearchParams, SearchError } from "./handle.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const PORT = Number(process.env.PORT) || 5101;
const HOST = process.env.HOST || '0.0.0.0'; 

const app = express();

// 创建服务器实例
const server = new McpServer({
  name: "search",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// 添加基本的健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

server.tool(
  "web-search",
  "搜索互联网上的内容",
  {
    query: z.string().describe("搜索查询的内容"),
  },
  async (params) => {
    try {
      const searchParams: SearchParams = {
        query: params.query,
        type: 'keyword',
        numResults: 10,
        maxTextChars: 3000,
      };
      
      const searchResult = await search(searchParams);
      
      if (!searchResult.results || searchResult.results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "没有找到匹配的结果。",
            },
          ],
        };
      }

      // 格式化搜索结果
      const formattedResults = searchResult.results.map((result, index) => {
        let resultText = `${index + 1}. ${result.title}\n${result.url}`;
        
        if (result.author) {
          resultText += `\n作者: ${result.author}`;
        }
        
        if (result.publishedDate) {
          resultText += `\n发布日期: ${result.publishedDate}`;
        }
        
        if (result.text) {
          resultText += `\n内容片段: ${result.text}`;
        }
        
        return resultText;
      }).join('\n\n');
      
      return {
        content: [
          {
            type: "text",
            text: `搜索结果 (${searchResult.results.length}个):\n\n${formattedResults}`,
          },
        ],
      };
    } catch (error) {
      console.error("搜索出错:", error);
      let errorMessage = "搜索时发生错误";
      
      if (error instanceof SearchError) {
        errorMessage = `搜索错误 (${error.status}): ${error.message}`;
      } else {
        errorMessage = `搜索时发生错误: ${error instanceof Error ? error.message : String(error)}`;
      }
      
      return {
        content: [
          {
            type: "text",
            text: errorMessage,
          },
        ],
      };
    }
  },
);

let transport: SSEServerTransport | null = null;

app.get("/sse", (req, res) => {
  console.log("SSE连接已接收");
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
    if (transport) {
      transport.handlePostMessage(req, res);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`服务器运行于 http://${HOST}:${PORT}`);
});
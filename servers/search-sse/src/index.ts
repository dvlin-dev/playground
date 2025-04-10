import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z  } from "zod";
import { search, SearchParams } from "./handle.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import cors from "cors";

const PORT = Number(process.env.PORT) || 5101;
const HOST = process.env.HOST || '0.0.0.0'; 

const app = express();

// 全局未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  // 不退出进程，让服务继续运行
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的Promise拒绝:', reason);
});

// 启用CORS
app.use(cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

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
        contents: {
          text: {
            maxCharacters: 3000,
          },
        },
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
      
      const stringifyResults = JSON.stringify(searchResult.results);

      return {
        content: [
          {
            type: "text",
            text: stringifyResults,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: error.message,
          },
        ],
      };
    }
  },
);

// 使用 Map 存储多个连接
const connections = new Map<string, SSEServerTransport>();

app.get("/sse", (req, res) => {
  // 为每个连接生成唯一的ID
  const connectionId = Date.now().toString();
  
  req.on('close', () => {
    console.log('连接关闭', connectionId);
    connections.delete(connectionId);
  });
  
  const transport = new SSEServerTransport(`/messages/${connectionId}`, res);
  connections.set(connectionId, transport);
  
  try {
    server.connect(transport);
  } catch (error) {
    console.error("建立SSE连接时出错:", error);
    connections.delete(connectionId);
    res.end();
  }
});

app.post("/messages/:connectionId", (req, res) => {
  try {
    // 优先从URL参数获取连接ID，如果没有则尝试从请求头获取
    let connectionId = req.params.connectionId;
    if (!connectionId) {
      connectionId = req.headers['x-connection-id'] as string;
    }
    
    console.info("连接", req.params.connectionId);
    const transport = connectionId ? connections.get(connectionId) : null;
    
    if (transport) {
      transport.handlePostMessage(req, res);
    } else {
      res.status(503).json({ error: "SSE连接尚未建立或已失效" });
    }
  } catch (error) {
    console.error("处理消息时出错:", error);
    res.status(500).json({ error: "处理消息时出错" });
  }
});

app.get("/", (req, res) => {
  res.send(`
    <h1>web search mcp service</h1>
    <ul>
      <li><a href="/health">/health</a> - 健康检查端点</li>
      <li><a href="/sse">/sse</a> - SSE连接端点</li>
    </ul>
  `);
});

app.listen(PORT, HOST, () => {
  console.log(`服务器运行于 http://${HOST}:${PORT}`);
});
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 5100,
      cors: {
        allowOrigin: "*"
      },
      batchTimeout: 30 * 1000 // 30s
    }
  }});

server.start();
import { MCPServer } from "mcp-framework";

const server = new MCPServer({
  transport: {
    type: "http-stream",
    options: {
      port: 5102,
      cors: {
        allowOrigin: "*"
      }
    }
  }});

server.start();
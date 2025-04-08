import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getWeather } from "./handle.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "get-forecast",
  "Get weather forecast of this day for a location",
  {
    adcode: z.string().describe("adcode of the location, adcode is a 6-digit number, from amap.com"),
    extensions: z.enum(["base", "all"]).optional().describe("Weather type: 'base' for current weather, 'all' for forecast"),
  },
  async ({ adcode, extensions = "all" }) => {
    try {
      const weather = await getWeather(adcode, extensions as 'base' | 'all');
      
      if (weather.status !== "1") {
        return {
          content: [
            {
              type: "text",
              text: `获取天气信息失败: ${weather.info}`,
            },
          ],
        };
      }

      // 处理实况天气信息
      if (extensions === "base" && weather.lives && weather.lives.length > 0) {
        const live = weather.lives[0];
        return {
          content: [
            {
              type: "text",
              text: `${live.province}${live.city}
              实时天气:
              气温: ${live.temperature}°C
              天气: ${live.weather}
              风向: ${live.winddirection}
              风力: ${live.windpower}级
              湿度: ${live.humidity}%
              发布时间: ${live.reporttime}`,
            },
          ],
        };
      }
      
      // 处理天气预报信息
      if (extensions === "all" && weather.forecast && weather.forecast.length > 0) {
        const forecast = weather.forecast[0];
        const formattedForecast = forecast.casts.map(cast => 
          `${cast.date} (星期${cast.week}):
          白天: ${cast.dayweather}, ${cast.daytemp}°C, ${cast.daywind}风${cast.daypower}级
          夜间: ${cast.nightweather}, ${cast.nighttemp}°C, ${cast.nightwind}风${cast.nightpower}级`
        ).join("\n");
        
        return {
          content: [
            {
              type: "text",
              text: `${forecast.province}${forecast.city}
              天气预报:${formattedForecast}
              发布时间: ${forecast.reporttime}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: "未找到天气信息",
          },
        ],
      };
    } catch (error) {
      console.error("获取天气信息出错:", error);
      return {
        content: [
          {
            type: "text",
            text: `获取天气信息时发生错误: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  },
);


let transport: SSEServerTransport | null = null;

app.get("/sse", (req, res) => {
  console.log("SSE connection received");
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(5100,'127.0.0.1',()=>{
  console.log("Server is running on http://127.0.0.1:5100");
});
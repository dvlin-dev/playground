import { MCPTool } from "mcp-framework";
import { z } from "zod";
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, '../../.env');

// 检查并加载.env文件
if (existsSync(envPath)) {
    dotenv.config({ path: envPath });
}

export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;

interface ImageGenClientInput {
  prompt: string
}


class ImageGenClientTool extends MCPTool<ImageGenClientInput> {
  name = "image-gen";
  description = "图片生成器";

  schema = {
    prompt: {
      type: z.string(),
      description: "描述图片的 prompt",
    },
  };

  async execute({ prompt }: ImageGenClientInput) {
    try {
      const openai = new OpenAI({
        apiKey: API_KEY,
        baseURL: API_URL,
      });
      
      const response = await openai.images.generate({
        model: "grok-2-image",
        prompt,
      });

      const url = response.data[0].url;

      console.info('image url: ', url)

      if (!url) {
        return {
          content: [
            {
              type: "image",
              text: "error",
            },
          ],
        };
      }
      
      
      return {
        content: [
          {
            type: "image",
            text: url,
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "image",
            text: error.message,
          },
        ],
      };
    }
  }
}

export default ImageGenClientTool;
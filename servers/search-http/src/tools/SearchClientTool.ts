import { MCPTool } from "mcp-framework";
import { z } from "zod";

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

export const EXA_API_KEY = process.env.EXA_API_KEY;
export const EXA_API_BASE = "https://api.exa.ai";

// 搜索结果
export interface SearchResult {
    title: string;
    url: string;
    publishedDate?: string;
    author?: string;
    score: number;
    id: string;
    image?: string;
    favicon?: string;
    text?: string;
    highlights?: string[];
    highlightScores?: number[];
    summary?: string;
    extras?: {
        links?: string[];
    };
}

// 搜索API返回结果
export interface SearchResponse {
    requestId: string;
    autopromptString?: string;
    autoDate?: string;
    resolvedSearchType?: string;
    results: SearchResult[];
    searchType: string;
}

// 搜索参数
export interface SearchParams {
    query: string;
    useAutoprompt?: boolean;
    type?: 'keyword' | 'neural' | 'auto';
    numResults?: number;
    contents?: {
        text?: {
            maxCharacters?: number;
        };
    };
}

export async function search(params: SearchParams): Promise<SearchResponse> {
  const url = `${EXA_API_BASE}/search`;
  
  try {
    // 检查API密钥是否设置
    if (!EXA_API_KEY) {
      throw new Error('API密钥未设置，请检查环境变量EXA_API_KEY');
    }
    
    // 检查查询参数
    if (!params.query || params.query.trim() === '') {
      throw new Error('搜索查询不能为空');
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EXA_API_KEY}`
      },
      body: JSON.stringify(params)
    });
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    
    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}



interface SearchClientInput {
  query: string;
}

class SearchClientTool extends MCPTool<SearchClientInput> {
  name = "web-search";
  description = "搜索互联网上的内容";

  schema = {
    query: {
      type: z.string(),
      description: "搜索查询的内容",
    },
  };

  async execute({ query }: SearchClientInput) {
    try {
      const searchParams: SearchParams = {
        query,
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
      console.info("search query:", query);
      
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
  }
}

export default SearchClientTool;
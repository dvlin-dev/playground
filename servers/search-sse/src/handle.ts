import { EXA_API_BASE, EXA_API_KEY } from "./const.js";

// 搜索结果中的高亮部分
export interface Highlight {
  text: string;
  score: number;
}

// 搜索结果的子页面
export interface Subpage {
  id: string;
  url: string;
  title: string;
  author?: string;
  publishedDate?: string;
  text?: string;
  summary?: string;
  highlights?: string[];
  highlightScores?: number[];
}

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
  subpages?: Subpage[];
  extras?: {
    links?: string[];
  };
}

// 成本信息
export interface CostInfo {
  total: number;
  breakDown: {
    search: number;
    contents: number;
    breakdown: {
      keywordSearch: number;
      neuralSearch: number;
      contentText: number;
      contentHighlight: number;
      contentSummary: number;
    };
  }[];
  perRequestPrices: {
    neuralSearch_1_25_results: number;
    neuralSearch_26_100_results: number;
    neuralSearch_100_plus_results: number;
    keywordSearch_1_100_results: number;
    keywordSearch_100_plus_results: number;
  };
  perPagePrices: {
    contentText: number;
    contentHighlight: number;
    contentSummary: number;
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
  costDollars: CostInfo;
}

// 搜索参数
export interface SearchParams {
  query: string;
  useAutoprompt?: boolean;
  type?: 'keyword' | 'neural' | 'auto';
  category?: string;
  numResults?: number;
  includeDomains?: string[];
  excludeDomains?: string[];
  text?: boolean;
  highlight?: boolean;
  summary?: boolean;
  maxTextChars?: number;
  maxLines?: number;
}

// 定义错误类型
export class SearchError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'SearchError';
    this.status = status;
  }
}

export async function search(params: SearchParams): Promise<SearchResponse> {
  const url = `${EXA_API_BASE}/search`;
  
  try {
    // 检查API密钥是否设置
    if (!EXA_API_KEY) {
      throw new SearchError('API密钥未设置，请检查环境变量EXA_API_KEY', 401);
    }
    
    // 检查查询参数
    if (!params.query || params.query.trim() === '') {
      throw new SearchError('搜索查询不能为空', 400);
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
      const errorText = await response.text();
      let errorMessage = `Exa API 错误: ${response.status}`;
      
      try {
        // 尝试解析错误响应为JSON
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage += ` - ${errorJson.message}`;
        } else {
          errorMessage += ` - ${errorText}`;
        }
      } catch {
        errorMessage += ` - ${errorText}`;
      }
      
      throw new SearchError(errorMessage, response.status);
    }
    
    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    // 处理不同类型的错误
    if (error instanceof SearchError) {
      throw error;
    } else if (error instanceof TypeError) {
      // 网络错误或其他TypeError
      throw new SearchError(`网络请求错误: ${error.message}`, 503);
    } else {
      // 其他未知错误
      throw new SearchError(`搜索过程中发生未知错误: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

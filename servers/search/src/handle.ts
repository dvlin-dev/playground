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

export async function search(params: SearchParams): Promise<SearchResponse> {
  const url = `${EXA_API_BASE}/search`;
  console.log('搜索请求', url);
  
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
    throw new Error(`Exa API 错误: ${response.status} ${errorText}`);
  }
  
  const data: SearchResponse = await response.json();
  return data;
}

import axios from 'axios';
import { URL } from 'url';

/**
 * 构建请求函数
 */
export async function buildRequest(urlStr: string, argsMap: Record<string, any>): Promise<string> {
  try {
    // 解析 URL
    const baseURL = new URL(urlStr);
    
    // 创建一个 axios 实例
    const response = await axios.post(baseURL.toString(), argsMap, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // 返回响应体
    return typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data);
  } catch (error) {
    throw new Error(`Failed to build request: ${error}`);
  }
} 
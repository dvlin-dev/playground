import axios from 'axios';

export interface Message {
  role: string;
  content: string;
}

export interface Model {
  apiKey: string;
  apiUrl: string;
  name: string;
}

export class ChatClient {
  private model: Model;
  private messages: Message[];

  /**
   * 创建一个新的 ChatClient 实例
   */
  constructor(apiKey: string, apiUrl: string, model: string, message: string) {
    this.model = {
      apiKey,
      apiUrl,
      name: model,
    };
    this.messages = [{ role: 'system', content: message }];
  }

  /**
   * 发送消息并获取响应
   */
  async sendMessage(userMessage: string): Promise<string> {
    // 将用户消息添加到对话历史中
    this.messages.push({ role: 'user', content: userMessage });

    // 创建请求负载
    const requestBody = {
      model: this.model.name,
      messages: this.messages,
      max_tokens: 2048,
      temperature: 0.7,
    };

    try {
      // 设置请求头
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.model.apiKey}`,
      };

      // 发送请求
      const response = await axios.post(this.model.apiUrl, requestBody, { headers });
      
      if (response.data.choices && response.data.choices.length > 0) {
        const assistantMessage = response.data.choices[0].message.content;
        this.messages.push({ role: 'assistant', content: assistantMessage });
        return assistantMessage;
      }

      throw new Error('No response received');
    } catch (error) {
      throw new Error(`Failed to send message: ${error}`);
    }
  }
} 
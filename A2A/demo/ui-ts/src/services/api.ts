import axios from 'axios';

// 创建API实例
const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:12000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API类型定义
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: string;
}

export interface Conversation {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  agents: string[];
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Task {
  id: string;
  description: string;
  status: string;
  agent_id: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  type: string;
  data: any;
  timestamp: string;
}

// API 方法
export const apiService = {
  // 代理相关
  async getAgents(): Promise<Agent[]> {
    const response = await api.get('/agents');
    return response.data;
  },
  
  async getAgent(id: string): Promise<Agent> {
    const response = await api.get(`/agents/${id}`);
    return response.data;
  },
  
  // 会话相关
  async getConversations(): Promise<Conversation[]> {
    const response = await api.get('/conversations');
    return response.data;
  },
  
  async getConversation(id: string): Promise<Conversation> {
    const response = await api.get(`/conversations/${id}`);
    return response.data;
  },
  
  async createConversation(name: string = '新会话'): Promise<Conversation> {
    const response = await api.post('/conversations', { name });
    return response.data;
  },
  
  // 消息相关
  async getMessages(conversationId: string): Promise<Message[]> {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  },
  
  async sendMessage(conversationId: string, senderId: string, content: string): Promise<Message> {
    const response = await api.post(`/conversations/${conversationId}/messages`, {
      sender_id: senderId,
      content
    });
    return response.data;
  },
  
  // 任务相关
  async getTasks(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data;
  },
  
  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  
  // 事件相关
  async getEvents(): Promise<Event[]> {
    const response = await api.get('/events');
    return response.data;
  },
  
  // 轮询事件流
  async subscribeToEvents(callback: (event: Event) => void, intervalMs: number = 5000) {
    let active = true;
    
    const poll = async () => {
      if (!active) return;
      
      try {
        const lastEvent = await this.getEvents();
        if (lastEvent && lastEvent.length > 0) {
          callback(lastEvent[0]);
        }
      } catch (error) {
        console.error('轮询事件出错:', error);
      }
      
      setTimeout(poll, intervalMs);
    };
    
    poll();
    
    return () => {
      active = false;
    };
  }
};

export default apiService; 
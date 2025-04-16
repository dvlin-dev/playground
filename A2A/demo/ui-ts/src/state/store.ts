import { create } from 'zustand';

// 状态类型定义，对应Python的AppState
export type ThemeMode = 'light' | 'dark';

export interface AppState {
  // 主题模式
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  
  // 当前会话ID
  currentConversationId: string;
  setCurrentConversationId: (id: string) => void;
  
  // 轮询状态
  isPolling: boolean;
  setPolling: (isPolling: boolean) => void;
  
  // 会话列表
  conversations: Array<{id: string, name: string}>;
  setConversations: (conversations: Array<{id: string, name: string}>) => void;
  
  // 代理列表
  agents: Array<{id: string, name: string}>;
  setAgents: (agents: Array<{id: string, name: string}>) => void;
  
  // 当前选中的代理
  selectedAgentId: string;
  setSelectedAgentId: (id: string) => void;
}

// 创建存储
export const useAppStore = create<AppState>((set) => ({
  // 主题模式
  themeMode: 'light',
  setThemeMode: (mode) => set({ themeMode: mode }),
  
  // 当前会话ID
  currentConversationId: '',
  setCurrentConversationId: (id) => set({ currentConversationId: id }),
  
  // 轮询状态
  isPolling: false,
  setPolling: (isPolling) => set({ isPolling }),
  
  // 会话列表
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  
  // 代理列表
  agents: [],
  setAgents: (agents) => set({ agents }),
  
  // 当前选中的代理
  selectedAgentId: '',
  setSelectedAgentId: (id) => set({ selectedAgentId: id }),
})); 
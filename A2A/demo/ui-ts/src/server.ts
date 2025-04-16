import express from 'express';
import { createServer } from 'http';
import next from 'next';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// 加载环境变量
dotenv.config();

const port = parseInt(process.env.A2A_UI_PORT || '12000', 10);
const host = process.env.A2A_UI_HOST || '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 模拟数据
const agents = [
  { 
    id: 'agent-1', 
    name: '研究员代理', 
    description: '专注于收集和分析信息的代理', 
    status: 'active'
  },
  { 
    id: 'agent-2', 
    name: '开发者代理', 
    description: '专注于编写和调试代码的代理', 
    status: 'active'
  },
  { 
    id: 'agent-3', 
    name: '设计师代理', 
    description: '专注于用户界面和用户体验设计的代理', 
    status: 'inactive'
  }
];

const conversations = [
  {
    id: 'conv-1',
    name: '研究项目讨论',
    created_at: '2023-10-10T10:00:00Z',
    updated_at: '2023-10-10T11:30:00Z',
    agents: ['agent-1', 'agent-2']
  },
  {
    id: 'conv-2',
    name: 'UI设计讨论',
    created_at: '2023-10-11T09:00:00Z',
    updated_at: '2023-10-11T10:15:00Z',
    agents: ['agent-2', 'agent-3']
  }
];

const messages = [
  {
    id: 'msg-1',
    conversation_id: 'conv-1',
    sender_id: 'agent-1',
    content: '我们需要研究最新的机器学习论文',
    created_at: '2023-10-10T10:00:00Z'
  },
  {
    id: 'msg-2',
    conversation_id: 'conv-1',
    sender_id: 'agent-2',
    content: '我可以帮你实现论文中的算法',
    created_at: '2023-10-10T10:05:00Z'
  },
  {
    id: 'msg-3',
    conversation_id: 'conv-2',
    sender_id: 'agent-3',
    content: '我设计了一个新的用户界面',
    created_at: '2023-10-11T09:00:00Z'
  },
  {
    id: 'msg-4',
    conversation_id: 'conv-2',
    sender_id: 'agent-2',
    content: '看起来不错，我可以开始实现了',
    created_at: '2023-10-11T09:10:00Z'
  }
];

const tasks = [
  {
    id: 'task-1',
    description: '研究论文并整理摘要',
    status: 'completed',
    agent_id: 'agent-1',
    created_at: '2023-10-10T10:10:00Z',
    updated_at: '2023-10-10T11:00:00Z'
  },
  {
    id: 'task-2',
    description: '实现机器学习算法',
    status: 'in_progress',
    agent_id: 'agent-2',
    created_at: '2023-10-10T11:00:00Z',
    updated_at: '2023-10-10T11:30:00Z'
  },
  {
    id: 'task-3',
    description: '设计新的用户界面',
    status: 'completed',
    agent_id: 'agent-3',
    created_at: '2023-10-11T09:00:00Z',
    updated_at: '2023-10-11T10:00:00Z'
  }
];

const events = [
  {
    id: 'event-1',
    type: 'message',
    data: { message_id: 'msg-1' },
    timestamp: '2023-10-10T10:00:00Z'
  },
  {
    id: 'event-2',
    type: 'task',
    data: { task_id: 'task-1', status: 'created' },
    timestamp: '2023-10-10T10:10:00Z'
  },
  {
    id: 'event-3',
    type: 'task',
    data: { task_id: 'task-1', status: 'completed' },
    timestamp: '2023-10-10T11:00:00Z'
  }
];

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  
  // API路由
  
  // 获取代理列表
  server.get('/agents', (req, res) => {
    res.json(agents);
  });
  
  // 获取单个代理
  server.get('/agents/:id', (req, res) => {
    const agent = agents.find(a => a.id === req.params.id);
    if (!agent) {
      return res.status(404).json({ error: '代理不存在' });
    }
    res.json(agent);
  });
  
  // 获取会话列表
  server.get('/conversations', (req, res) => {
    res.json(conversations);
  });
  
  // 创建新会话
  server.post('/conversations', (req, res) => {
    const { name = '新会话' } = req.body;
    const newConversation = {
      id: `conv-${uuidv4()}`,
      name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      agents: []
    };
    conversations.push(newConversation);
    res.status(201).json(newConversation);
  });
  
  // 获取单个会话
  server.get('/conversations/:id', (req, res) => {
    const conversation = conversations.find(c => c.id === req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: '会话不存在' });
    }
    res.json(conversation);
  });
  
  // 获取会话消息
  server.get('/conversations/:id/messages', (req, res) => {
    const conversationMessages = messages.filter(m => m.conversation_id === req.params.id);
    res.json(conversationMessages);
  });
  
  // 发送消息
  server.post('/conversations/:id/messages', (req, res) => {
    const { sender_id, content } = req.body;
    if (!sender_id || !content) {
      return res.status(400).json({ error: '发送者ID和内容为必填项' });
    }
    
    const conversation = conversations.find(c => c.id === req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: '会话不存在' });
    }
    
    const newMessage = {
      id: `msg-${uuidv4()}`,
      conversation_id: req.params.id,
      sender_id,
      content,
      created_at: new Date().toISOString()
    };
    
    messages.push(newMessage);
    
    // 更新会话的更新时间
    conversation.updated_at = new Date().toISOString();
    
    // 将发送者添加到会话中，如果不存在
    if (!conversation.agents.includes(sender_id) && sender_id !== 'user') {
      conversation.agents.push(sender_id);
    }
    
    res.status(201).json(newMessage);
  });
  
  // 获取任务列表
  server.get('/tasks', (req, res) => {
    res.json(tasks);
  });
  
  // 获取单个任务
  server.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
      return res.status(404).json({ error: '任务不存在' });
    }
    res.json(task);
  });
  
  // 获取事件列表
  server.get('/events', (req, res) => {
    res.json(events);
  });
  
  // 处理所有其他请求
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  // 启动服务器
  createServer(server).listen(port, host, () => {
    console.log(`> 服务已启动，地址：http://${host}:${port}`);
  });
}); 
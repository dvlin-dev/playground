import { Box, TextField, Button, Typography, Paper, Avatar, CircularProgress } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useAppStore } from '@/state/store';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import apiService, { Message } from '@/services/api';

export default function ConversationPage() {
  const router = useRouter();
  const { currentConversationId, selectedAgentId } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState<{id: string, name: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // 加载会话和消息
  useEffect(() => {
    const conversationId = router.query.conversation_id as string || currentConversationId;
    
    if (!conversationId) {
      return;
    }
    
    const loadConversation = async () => {
      setLoading(true);
      try {
        const conversationData = await apiService.getConversation(conversationId);
        setConversation(conversationData);
        
        const messagesData = await apiService.getMessages(conversationId);
        setMessages(messagesData);
      } catch (error) {
        console.error('加载会话失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversation();
  }, [router.query.conversation_id, currentConversationId]);
  
  // 消息变化时滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // 发送消息
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversation) return;
    
    const conversationId = conversation.id;
    const senderId = selectedAgentId || 'user'; // 如果没有选择代理，则默认为用户
    
    try {
      const message = await apiService.sendMessage(conversationId, senderId, newMessage);
      setMessages([...messages, message]);
      setNewMessage('');
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  };
  
  // 处理按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <PageScaffold>
      <Header title={conversation?.name || '会话'} icon="chat">
        {loading && <CircularProgress size={24} />}
      </Header>
      
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
          marginTop: 2,
        }}
      >
        {/* 消息区域 */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body1" align="center" sx={{ marginTop: 4 }}>
              还没有消息，开始对话吧！
            </Typography>
          ) : (
            messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender_id === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    padding: 2,
                    maxWidth: '70%',
                    backgroundColor: message.sender_id === 'user' ? '#E3F2FD' : '#F5F5F5',
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                    <Avatar
                      sx={{ width: 24, height: 24, marginRight: 1 }}
                      alt={message.sender_id}
                    >
                      {message.sender_id.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle2">{message.sender_id}</Typography>
                  </Box>
                  <Typography variant="body1">{message.content}</Typography>
                </Paper>
              </Box>
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>
        
        {/* 输入区域 */}
        <Box
          sx={{
            display: 'flex',
            padding: 2,
            borderTop: '1px solid #eee',
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="输入消息..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            sx={{ marginRight: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            发送
          </Button>
        </Box>
      </Box>
    </PageScaffold>
  );
} 
import { Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, IconButton, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppStore } from '@/state/store';
import apiService, { Conversation } from '@/services/api';

export default function ConversationList() {
  const router = useRouter();
  const { currentConversationId, setCurrentConversationId } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  
  // 加载会话列表
  useEffect(() => {
    const loadConversations = async () => {
      setLoading(true);
      try {
        const data = await apiService.getConversations();
        setConversations(data);
      } catch (error) {
        console.error('加载会话列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversations();
  }, []);
  
  // 选择会话
  const handleSelectConversation = (id: string) => {
    setCurrentConversationId(id);
    router.push(`/conversation?conversation_id=${id}`);
  };
  
  // 删除会话（这里只是示例，实际需要调用API）
  const handleDeleteConversation = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // 在实际应用中，这里应该调用接口删除会话
    // await apiService.deleteConversation(id);
    
    // 从列表中移除
    setConversations(conversations.filter(conv => conv.id !== id));
    
    // 如果删除的是当前会话，则清空当前会话ID
    if (id === currentConversationId) {
      setCurrentConversationId('');
    }
  };
  
  // 格式化时间
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }
  
  if (conversations.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" align="center" color="text.secondary">
          没有历史会话
        </Typography>
      </Box>
    );
  }
  
  return (
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Typography variant="subtitle2" sx={{ px: 2, py: 1, fontWeight: 'bold' }}>
        会话历史
      </Typography>
      <Divider />
      
      {conversations.map((conversation) => (
        <ListItem
          key={conversation.id}
          disablePadding
          secondaryAction={
            <IconButton 
              edge="end" 
              aria-label="delete"
              onClick={(e) => handleDeleteConversation(conversation.id, e)}
            >
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemButton
            selected={conversation.id === currentConversationId}
            onClick={() => handleSelectConversation(conversation.id)}
          >
            <ListItemText
              primary={conversation.name}
              secondary={formatTime(conversation.updated_at)}
              primaryTypographyProps={{
                noWrap: true,
                style: { maxWidth: '180px' }
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
} 
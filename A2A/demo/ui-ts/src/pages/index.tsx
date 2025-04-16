import { Box, Typography, Button } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useAppStore } from '@/state/store';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const router = useRouter();
  const { agents, conversations } = useAppStore();
  const [loading, setLoading] = useState(false);
  
  // 处理创建新会话
  const handleCreateConversation = async () => {
    setLoading(true);
    try {
      // 这里应添加实际的API调用，创建新会话
      // const response = await api.createConversation();
      // router.push(`/conversation?conversation_id=${response.id}`);
      
      // 临时模拟
      setTimeout(() => {
        router.push('/conversation');
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('创建会话失败:', error);
      setLoading(false);
    }
  };
  
  return (
    <PageScaffold>
      <Header title="Agent2Agent 演示" icon="home">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateConversation}
          disabled={loading}
        >
          {loading ? '创建中...' : '新建会话'}
        </Button>
      </Header>
      
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          欢迎使用 Agent2Agent 演示系统
        </Typography>
        
        <Typography variant="body1" align="center" paragraph>
          这是一个Agent2Agent演示界面，允许代理相互交流和协作完成任务。
        </Typography>
        
        <Typography variant="body1" align="center" paragraph>
          当前系统有 {agents.length} 个代理和 {conversations.length} 个会话。
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleCreateConversation}
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? '创建中...' : '开始新会话'}
        </Button>
      </Box>
    </PageScaffold>
  );
} 
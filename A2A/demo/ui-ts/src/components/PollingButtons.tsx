import { Box, Button } from '@mui/material';
import { useAppStore } from '@/state/store';
import { useState, useEffect } from 'react';

export default function PollingButtons() {
  const { isPolling, setPolling } = useAppStore();
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  
  // 处理轮询开始
  const handleStartPolling = () => {
    setPolling(true);
    
    // 设置轮询间隔
    const interval = setInterval(() => {
      // 这里可以添加实际的轮询逻辑，例如：
      console.log('轮询中...');
      // fetchAgentState();
      // fetchConversations();
    }, 5000); // 5秒间隔
    
    setPollingInterval(interval);
  };
  
  // 处理轮询停止
  const handleStopPolling = () => {
    setPolling(false);
    
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };
  
  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);
  
  return (
    <Box>
      {isPolling ? (
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleStopPolling}
        >
          停止轮询
        </Button>
      ) : (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleStartPolling}
        >
          开始轮询
        </Button>
      )}
    </Box>
  );
} 
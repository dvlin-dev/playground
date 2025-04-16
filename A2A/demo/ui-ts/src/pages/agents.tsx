import { Box, Typography, Button, Card, CardContent, CardActions, Grid, Chip, CircularProgress } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useAppStore } from '@/state/store';
import { useState, useEffect } from 'react';
import apiService, { Agent } from '@/services/api';
import { useRouter } from 'next/router';

export default function AgentsPage() {
  const router = useRouter();
  const { setSelectedAgentId } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<Agent[]>([]);
  
  // 加载代理列表
  useEffect(() => {
    const loadAgents = async () => {
      setLoading(true);
      try {
        const data = await apiService.getAgents();
        setAgents(data);
      } catch (error) {
        console.error('加载代理列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAgents();
  }, []);
  
  // 选择代理并跳转到对话页面
  const handleSelectAgent = (agentId: string) => {
    setSelectedAgentId(agentId);
    router.push('/conversation');
  };
  
  // 获取状态对应的颜色
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'busy':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  return (
    <PageScaffold>
      <Header title="代理列表" icon="people">
        {loading && <CircularProgress size={24} />}
      </Header>
      
      <Box sx={{ mt: 4, p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : agents.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            没有可用的代理
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {agents.map((agent) => (
              <Grid item xs={12} sm={6} md={4} key={agent.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {agent.name}
                      </Typography>
                      <Chip 
                        label={agent.status} 
                        color={getStatusColor(agent.status) as any}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {agent.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      onClick={() => handleSelectAgent(agent.id)}
                    >
                      选择代理
                    </Button>
                    <Button 
                      size="small" 
                      color="info"
                      onClick={() => router.push(`/agents/${agent.id}`)}
                    >
                      查看详情
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PageScaffold>
  );
} 
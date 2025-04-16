import { Box, Typography, Card, CardContent, Chip, Grid, CircularProgress, LinearProgress, Divider } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import apiService, { Task } from '@/services/api';

export default function TaskListPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // 加载任务列表
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const data = await apiService.getTasks();
        setTasks(data);
      } catch (error) {
        console.error('加载任务列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTasks();
    
    // 设置轮询间隔，定期刷新任务列表
    const interval = setInterval(loadTasks, 5000); // 每5秒刷新一次
    
    return () => clearInterval(interval);
  }, []);
  
  // 根据任务状态返回对应的颜色
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };
  
  // 根据任务状态获取进度百分比
  const getProgressPercentage = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in_progress':
        return 50;
      case 'pending':
        return 0;
      case 'failed':
        return 100;
      default:
        return 0;
    }
  };
  
  // 格式化时间戳
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <PageScaffold>
      <Header title="任务列表" icon="task">
        {loading && <CircularProgress size={24} />}
      </Header>
      
      <Box sx={{ mt: 4, p: 2 }}>
        {loading && tasks.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : tasks.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            没有任务记录
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task) => (
              <Grid item xs={12} md={6} key={task.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        任务 #{task.id.slice(0, 8)}
                      </Typography>
                      <Chip 
                        label={task.status} 
                        color={getStatusColor(task.status) as any}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {task.description}
                    </Typography>
                    
                    <LinearProgress 
                      variant="determinate" 
                      value={getProgressPercentage(task.status)} 
                      color={getStatusColor(task.status) as any}
                      sx={{ mb: 2 }}
                    />
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        代理: {task.agent_id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        创建: {formatTimestamp(task.created_at)}
                      </Typography>
                    </Box>
                    
                    {task.updated_at && (
                      <Typography variant="body2" color="text.secondary" align="right">
                        更新: {formatTimestamp(task.updated_at)}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PageScaffold>
  );
} 
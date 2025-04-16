import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Chip } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import apiService, { Event } from '@/services/api';

export default function EventListPage() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  
  // 加载事件列表
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await apiService.getEvents();
        setEvents(data);
      } catch (error) {
        console.error('加载事件列表失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
    
    // 设置轮询间隔，定期刷新事件列表
    const interval = setInterval(loadEvents, 10000); // 每10秒刷新一次
    
    return () => clearInterval(interval);
  }, []);
  
  // 根据事件类型返回对应的颜色
  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'message':
        return 'primary';
      case 'task':
        return 'secondary';
      case 'error':
        return 'error';
      case 'system':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  // 格式化时间戳
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  
  return (
    <PageScaffold>
      <Header title="事件列表" icon="event">
        {loading && <CircularProgress size={24} />}
      </Header>
      
      <Box sx={{ mt: 4, p: 2 }}>
        {loading && events.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : events.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            没有事件记录
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="事件列表表格">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>类型</TableCell>
                  <TableCell>时间</TableCell>
                  <TableCell>数据</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {event.id}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={event.type} 
                        color={getEventTypeColor(event.type) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatTimestamp(event.timestamp)}</TableCell>
                    <TableCell>
                      {typeof event.data === 'object' 
                        ? JSON.stringify(event.data)
                        : String(event.data)
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </PageScaffold>
  );
} 
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import TaskIcon from '@mui/icons-material/Task';
import SettingsIcon from '@mui/icons-material/Settings';
import ConversationList from './ConversationList';

// 侧边导航宽度
const drawerWidth = 240;

// 导航项定义
const navItems = [
  { name: '主页', path: '/', icon: <HomeIcon /> },
  { name: '代理', path: '/agents', icon: <PeopleIcon /> },
  { name: '会话', path: '/conversation', icon: <ChatIcon /> },
  { name: '事件列表', path: '/event-list', icon: <EventIcon /> },
  { name: '任务列表', path: '/task-list', icon: <TaskIcon /> },
  { name: '设置', path: '/settings', icon: <SettingsIcon /> },
];

export default function SideNav() {
  const router = useRouter();
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <img 
          src="/logo.png" 
          alt="A2A Demo" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={router.pathname === item.path}
              onClick={() => router.push(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
      {/* 会话列表 */}
      <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
        <ConversationList />
      </Box>
    </Drawer>
  );
} 
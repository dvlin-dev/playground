import { Box, Container, Paper } from '@mui/material';
import SideNav from './SideNav';
import React from 'react';

interface PageScaffoldProps {
  children: React.ReactNode;
}

export default function PageScaffold({ children }: PageScaffoldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* 侧边导航 */}
      <SideNav />
      
      {/* 主内容区 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          padding: 3,
          height: '100vh',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Paper
            elevation={2}
            sx={{
              padding: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {children}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
} 
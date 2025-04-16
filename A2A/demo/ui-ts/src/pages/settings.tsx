import { Box, Typography, Card, CardContent, Switch, FormControlLabel, Divider, TextField, Button, Alert, Snackbar } from '@mui/material';
import PageScaffold from '@/components/PageScaffold';
import Header from '@/components/Header';
import { useState } from 'react';
import { useAppStore } from '@/state/store';

export default function SettingsPage() {
  const { themeMode, setThemeMode } = useAppStore();
  const [apiKey, setApiKey] = useState(process.env.GOOGLE_API_KEY || '');
  const [apiUrl, setApiUrl] = useState(process.env.API_URL || 'http://localhost:12000');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  // 切换主题模式
  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  
  // 保存设置
  const handleSaveSettings = () => {
    // 在实际应用中，这里应该调用接口保存设置
    // 或者使用localStorage保存
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('apiUrl', apiUrl);
    setShowSnackbar(true);
  };
  
  // 关闭提示
  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };
  
  return (
    <PageScaffold>
      <Header title="设置" icon="settings" />
      
      <Box sx={{ mt: 4, p: 2 }}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              界面设置
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={handleThemeToggle}
                  color="primary"
                />
              }
              label="深色模式"
            />
          </CardContent>
        </Card>
        
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              API 设置
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Google API Key"
                variant="outlined"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                type="password"
                margin="normal"
                helperText="用于 Google API 服务的密钥"
              />
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="API URL"
                variant="outlined"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                margin="normal"
                helperText="Agent2Agent 服务器地址"
              />
            </Box>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSaveSettings}
            >
              保存设置
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              关于
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" paragraph>
              Agent2Agent Demo UI - TypeScript 版本
            </Typography>
            <Typography variant="body2" color="text.secondary">
              版本: 0.1.0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              这是一个使用 Next.js 和 Material UI 构建的 Agent2Agent 演示界面。
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          设置已保存
        </Alert>
      </Snackbar>
    </PageScaffold>
  );
} 
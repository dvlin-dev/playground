import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAppStore } from '@/state/store';
import { useEffect } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  const { themeMode, setCurrentConversationId } = useAppStore();
  
  // 创建主题
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  // 处理URL参数，类似于原始Python代码中的on_load函数
  useEffect(() => {
    if (router.query.conversation_id) {
      setCurrentConversationId(router.query.conversation_id as string);
    } else {
      setCurrentConversationId('');
    }
  }, [router.query, setCurrentConversationId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 
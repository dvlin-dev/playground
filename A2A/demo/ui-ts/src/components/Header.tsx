import { Box, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import PollingButtons from './PollingButtons';

interface HeaderProps {
  title: string;
  icon: string;
  children?: React.ReactNode;
}

export default function Header({ title, icon, children }: HeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Icon>{icon}</Icon>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'Google Sans',
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
      <PollingButtons />
    </Box>
  );
} 
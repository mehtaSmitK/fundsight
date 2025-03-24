import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0070df' },
    secondary: { main: '#dc004e' },
    background: { default: '#171616', paper: '#1b1a1a' },
    text: { primary: '#fff', secondary: '#aaa' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});
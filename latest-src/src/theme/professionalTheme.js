import { createTheme } from '@mui/material/styles';

const professionalTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'Arial', 'sans-serif'].join(','),
    h1: { fontSize: '2.8rem', fontWeight: 700, textTransform: 'none', letterSpacing: '0px', color: '#000000' },
    h4: { fontWeight: 600, letterSpacing: '0px', color: '#000000' },
    body1: { lineHeight: 1.6, fontSize: '1rem', color: '#000000' },
  },
  palette: {
    mode: 'light',
    primary: { main: '#000000' },
    secondary: { main: '#6B7280' },
    background: { 
      default: '#F3F4F6',
      paper: '#F3F4F6',
    },
    text: { 
      primary: '#000000',
      secondary: '#6B7280',
    },
    divider: '#E5E7EB',
    error: { main: '#DC2626' },
    success: { main: '#059669' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          border: '1px solid #000000',
          padding: '10px 20px',
          fontWeight: 600,
          letterSpacing: '0.5px',
          textTransform: 'none',
          backgroundColor: 'transparent',
          color: '#000000',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#E5E7EB',
            color: '#000000',
            borderColor: '#000000',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          },
        },
        outlined: {
          border: '1px solid #6B7280',
          color: '#6B7280',
          backgroundColor: 'transparent',
          '&:hover': { 
            backgroundColor: '#E5E7EB',
            color: '#000000', 
            borderColor: '#000000' 
          },
        },
        contained: {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: '1px solid #000000',
          '&:hover': {
            backgroundColor: '#4B5563',
            borderColor: '#4B5563',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { 
        root: { 
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          backgroundColor: '#F3F4F6',
        } 
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: {
          color: '#6B7280',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: '#F3F4F6',
          color: '#000000',
          border: '1px solid #E5E7EB',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

export default professionalTheme;
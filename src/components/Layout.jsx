import React from 'react';
import { Box, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children, handleCloseSnackbar, snackbar }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Header />
      {isHomePage ? (
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>{children}</Box>
      ) : (
        <Container component="main" maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>{children}</Container>
      )}
      <Box
        component="footer"
        sx={{
          py: { xs: 3, sm: 4 },
          px: 2,
          mt: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255,255,255,0.2)',
          color: '#FFFFFF',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" align="center" sx={{ letterSpacing: '1px', textTransform: 'uppercase', mb: 0.5, fontSize: '0.875rem', color: '#FFFFFF' }}>
            Outcome-Driven Strategy. Measurable Results.
          </Typography>
          <Typography variant="caption" display="block" align="center" sx={{ opacity: 0.8, fontSize: '0.75rem', color: '#FFFFFF' }}>
            © {new Date().getFullYear()} RareKez Consultation Hub. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
      {snackbar && (
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
export default Layout;
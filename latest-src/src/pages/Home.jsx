import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => (
  <Box
    sx={{
      minHeight: '65vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      color: '#FFFFFF',
      width: '100%',
      py: 12,
    }}
    role="banner"
    aria-label="Hero banner for RareKez Consultation Hub"
  >
    <Container maxWidth="md">
      <Typography
        variant="h1"
        data-testid="hero-title"
        sx={{
          mb: 4,
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 800,
          lineHeight: 1.1,
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
          color: '#FFFFFF',
        }}
      >
        Welcome to RareKez Consultation Hub
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
          fontWeight: 400,
          lineHeight: 1.4,
          textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
          color: '#FFFFFF',
        }}
      >
        Your Strategic Partner for Product Excellence and Business Growth
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/contact"
          size="large"
          startIcon={<EmailIcon sx={{ color: '#FFFFFF' }} aria-hidden="true" />}
          sx={{
            backgroundColor: '#6B7280',
            color: '#FFFFFF',
            border: '1px solid #6B7280',
            px: 4,
            py: 2,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: '#4B5563',
              borderColor: '#4B5563',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            },
          }}
          aria-label="Contact us for web development services"
        >
          Contact Us
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/insights"
          size="large"
          startIcon={<BookIcon sx={{ color: '#FFFFFF' }} aria-hidden="true" />}
          sx={{
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            px: 4,
            py: 2,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: '#F9FAFB',
            },
          }}
          aria-label="View insights and articles"
        >
          View Insights
        </Button>
      </Box>
    </Container>
  </Box>
);
const WelcomeCard = () => {
  const { user, logout } = useAuth();
  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
            Welcome back, {user?.firstName || 'User'}!
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: '#6B7280' }}>
            You have successfully logged in to the RareKez Consultation Hub. Explore our strategic insights, 
            consulting services, and connect with our team to drive your business forward.
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>
            <strong>Member since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/users"
            size="large"
            startIcon={<GroupIcon />}
            sx={{
              backgroundColor: '#6B7280',
              color: '#FFFFFF',
              px: 3,
              '&:hover': {
                backgroundColor: '#4B5563',
              },
            }}
          >
            View All Users
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={logout}
            size="large"
            sx={{ px: 3 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
const Home = () => {
  const { user } = useAuth();
  return (
    <Box>
      {user && <WelcomeCard />}
      <HeroSection />
      {}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          textAlign="center" 
          sx={{ mb: 4, color: '#FFFFFF', textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          Our Services
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 4 }}>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
              Strategy Consulting
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Transform your business with outcome-driven strategies and OKR implementation.
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
              Product Discovery
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Uncover real customer needs through structured workshops and validation techniques.
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#000000' }}>
              Executive Coaching
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              Leadership alignment and strategic execution guidance for C-level executives.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
export default Home;
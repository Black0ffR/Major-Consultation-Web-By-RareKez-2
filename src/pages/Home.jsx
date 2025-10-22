import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import professionalTheme from '../theme/professionalTheme';

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
        Take that bold step by contacting a capable and time-driven Web Dev Today
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="/contact"
        size="large"
        startIcon={<EmailIcon sx={{ color: '#FFFFFF' }} aria-hidden="true" />}
        sx={{
          mt: 3,
          backgroundColor: '#6B7280',
          color: '#FFFFFF',
          border: '1px solid #6B7280',
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
    </Container>
  </Box>
);

export default HeroSection;
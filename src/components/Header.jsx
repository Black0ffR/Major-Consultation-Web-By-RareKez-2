import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Container, useScrollTrigger } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import professionalTheme from '../theme/professionalTheme';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const MenuLinkItem = ({ to, children }) => (
    <MenuItem
      onClick={handleClose}
      component={RouterLink}
      to={to}
      aria-label={`Navigate to ${to.replace('/', '')}`}
      sx={{
        color: '#FFFFFF',
        '&:hover': { 
          backgroundColor: '#4B5563',
          color: '#FFFFFF',
        },
      }}
    >
      {children}
    </MenuItem>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: trigger ? 'blur(10px)' : 'none',
        backgroundImage: trigger ? 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))' : 'none',
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 1300,
      }}
      elevation={0}
      role="banner"
      aria-label="Main navigation for RareKez Consultation Hub"
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, overflow: 'hidden' }}>
            <MenuBookIcon sx={{ mr: 1, fontSize: 30, flexShrink: 0, color: '#FFFFFF' }} aria-hidden="true" />
            <Typography
              variant="h6"
              component="div"
              data-testid="app-title"
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '1.1rem', sm: '1.4rem' }, 
                color: '#FFFFFF' 
              }}
            >
              RareKez Consultation Hub
            </Typography>
          </Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: '#FFFFFF',
              '&:hover': { 
                color: '#F9FAFB', 
                backgroundColor: 'transparent' 
              } 
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/insights" 
            sx={{ 
              color: '#FFFFFF',
              '&:hover': { 
                color: '#F9FAFB', 
                backgroundColor: 'transparent' 
              } 
            }}
          >
            Insights
          </Button>
          <Button
            id="services-button"
            aria-controls={open ? 'services-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
            sx={{ 
              color: '#FFFFFF',
              '&:hover': { 
                color: '#F9FAFB', 
                backgroundColor: 'transparent' 
              } 
            }}
          >
            Services <ExpandMoreIcon sx={{ ml: 0.5, color: '#FFFFFF' }} aria-hidden="true" />
          </Button>
          <Menu
            id="services-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'services-button' }}
            PaperProps={{
              sx: {
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.2)',
                mt: '2px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: 'rgba(0,0,0,0.95)',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
              },
            }}
          >
            <MenuLinkItem to="/consulting">Strategy Consulting</MenuLinkItem>
            <MenuLinkItem to="/research">Product Discovery</MenuLinkItem>
            <MenuLinkItem to="/pricing">Pricing Guide</MenuLinkItem>
          </Menu>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/about" 
            sx={{ 
              color: '#FFFFFF',
              '&:hover': { 
                color: '#F9FAFB', 
                backgroundColor: 'transparent' 
              } 
            }}
          >
            About
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/contact" 
            sx={{ 
              color: '#FFFFFF',
              '&:hover': { 
                color: '#F9FAFB', 
                backgroundColor: 'transparent' 
              } 
            }}
          >
            Contact
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
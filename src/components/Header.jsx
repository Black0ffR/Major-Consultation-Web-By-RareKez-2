import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  useScrollTrigger,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import professionalTheme from '../theme/professionalTheme';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  const isMobile = useMediaQuery(professionalTheme.breakpoints.down('md'));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevOpen) => !prevOpen);
  };

  const drawerWidth = 280;

  const desktopButtonSx = {
    minWidth: '100px',
    padding: { xs: '8px 16px', md: '10px 20px' },
    fontSize: { md: '0.875rem' },
    transition: 'all 0.2s ease',
  };

  const MobileMenu = () => (
    <Box
      role="navigation"
      tabIndex={0}
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
      sx={{ width: '100%', height: '100vh' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuBookIcon sx={{ mr: 1, fontSize: 30, color: '#FFFFFF' }} aria-hidden="true" />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
            RareKez Hub
          </Typography>
        </Box>
        <IconButton
          aria-label="close drawer"
          onClick={handleDrawerToggle}
          sx={{ color: '#FFFFFF' }}
          data-testid="close-menu"
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List role="list" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.95)', color: '#FFFFFF', p: 0 }}>
        <ListItem role="listitem" disablePadding key="home">
          <ListItemButton
            component={RouterLink}
            to="/"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Home" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding key="insights">
          <ListItemButton
            component={RouterLink}
            to="/insights"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Insights" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding key="services-header" aria-expanded="false">
          <ListItemButton disabled sx={{ color: '#FFFFFF', opacity: 0.8 }}>
            <ListItemText primary="Services" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding sx={{ pl: 4 }} key="strategy">
          <ListItemButton
            component={RouterLink}
            to="/consulting"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Strategy Consulting" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding sx={{ pl: 4 }} key="product">
          <ListItemButton
            component={RouterLink}
            to="/research"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Product Discovery" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding sx={{ pl: 4 }} key="pricing">
          <ListItemButton
            component={RouterLink}
            to="/pricing"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Pricing Guide" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding key="about">
          <ListItemButton
            component={RouterLink}
            to="/about"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="About" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
        <ListItem role="listitem" disablePadding key="contact">
          <ListItemButton
            component={RouterLink}
            to="/contact"
            sx={{ color: '#FFFFFF', '&:hover': { backgroundColor: '#4B5563' } }}
          >
            <ListItemText primary="Contact" primaryTypographyProps={{ color: '#FFFFFF' }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const drawer = <MobileMenu />;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: trigger ? 'blur(10px)' : 'none',
        backgroundImage: () =>
          trigger
            ? `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`
            : 'none',
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 1300,
      }}
      elevation={0}
      role="banner"
      aria-label="Main navigation for RareKez Consultation Hub"
    >
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'space-between' : 'space-between', 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: isMobile ? 1 : 0,
              overflow: 'hidden',
              justifyContent: isMobile ? 'center' : 'flex-start',
              transition: 'opacity 0.3s ease',
              opacity: isMobile && mobileOpen ? 0 : 1,
              pointerEvents: isMobile && mobileOpen ? 'none' : 'auto',
            }}
          >
            <MenuBookIcon
              sx={{ mr: 1, fontSize: { xs: 24, md: 30 }, flexShrink: 0, color: '#FFFFFF' }}
              aria-hidden="true"
            />
            <Typography
              variant="h6"
              component="div"
              data-testid="app-title"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                color: '#FFFFFF',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              RareKez Consultation Hub
            </Typography>
          </Box>

          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              color: '#FFFFFF',
              display: { md: 'none' },
              ml: 'auto',
              mr: 1,
              zIndex: 1401,
            }}
            data-testid="open-menu"
          >
            <MenuIcon />
          </IconButton>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                color="inherit"
                component={RouterLink}
                to="/"
                sx={{
                  ...desktopButtonSx,
                  color: '#FFFFFF',
                  '&:hover': { color: '#F9FAFB', backgroundColor: 'transparent' },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/insights"
                sx={{
                  ...desktopButtonSx,
                  color: '#FFFFFF',
                  '&:hover': { color: '#F9FAFB', backgroundColor: 'transparent' },
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
                  ...desktopButtonSx,
                  color: '#FFFFFF',
                  '&:hover': { color: '#F9FAFB', backgroundColor: 'transparent' },
                }}
              >
                Services
                <ExpandMoreIcon sx={{ ml: 0.25, fontSize: 18, color: '#FFFFFF' }} aria-hidden="true" />
              </Button>
              <Menu
                id="services-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                
                PopperProps={{
                  modifiers: [
                    { name: 'offset', options: { offset: [0, 0] } },
                  ],
                }}
                MenuListProps={{ 'aria-labelledby': 'services-button' }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    minWidth: 200,
                    zIndex: 1400,
                  },
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/consulting"
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#4B5563', color: '#FFFFFF' },
                  }}
                >
                  Strategy Consulting
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/research"
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#4B5563', color: '#FFFFFF' },
                  }}
                >
                  Product Discovery
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={RouterLink}
                  to="/pricing"
                  sx={{
                    color: '#FFFFFF',
                    '&:hover': { backgroundColor: '#4B5563', color: '#FFFFFF' },
                  }}
                >
                  Pricing Guide
                </MenuItem>
              </Menu>
              <Button
                color="inherit"
                component={RouterLink}
                to="/about"
                sx={{
                  ...desktopButtonSx,
                  color: '#FFFFFF',
                  '&:hover': { color: '#F9FAFB', backgroundColor: 'transparent' },
                }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/contact"
                sx={{
                  ...desktopButtonSx,
                  color: '#FFFFFF',
                  '&:hover': { color: '#F9FAFB', backgroundColor: 'transparent' },
                }}
              >
                Contact
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          'aria-labelledby': 'open-menu',
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'fixed',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
            backdropFilter: 'blur(10px)',
            zIndex: 1400,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
import React from 'react';
import { Paper, Typography, Divider, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import professionalTheme from '../theme/professionalTheme';

const Research = () => (
  <Paper sx={{ p: { xs: 2, md: 4 } }}>
    <Typography variant="h1" gutterBottom data-testid="research-title">
      Product Discovery Workshops
    </Typography>
    <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
    <Typography variant="body1" paragraph>
      Our Product Discovery service helps teams uncover real customer needs and validate ideas before heavy investment. Through structured workshops, we apply lean methods to build a shared understanding of problems, opportunities, and viable solutions—ensuring every feature aligns with measurable business outcomes.
    </Typography>
    <Typography variant="h4" sx={{ mb: 2, color: professionalTheme.palette.secondary.main }}>
      What We Cover
    </Typography>
    <List sx={{ mb: 4 }}>
      <ListItem>
        <ListItemText primary="User Research & Interviews" secondary="Gather insights from target users to identify pain points and desires." />
      </ListItem>
      <ListItem>
        <ListItemText primary="Opportunity Mapping" secondary="Prioritize problems using frameworks like Opportunity Solution Trees." />
      </ListItem>
      <ListItem>
        <ListItemText primary="Rapid Prototyping & Testing" secondary="Create low-fidelity mocks and validate assumptions with quick experiments." />
      </ListItem>
      <ListItem>
        <ListItemText primary="OKR Alignment" secondary="Tie discoveries to your Objectives and Key Results for outcome-focused roadmaps." />
      </ListItem>
    </List>
    <Box sx={{ my: 4, textAlign: 'center' }}>
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontStyle: 'italic',
          fontSize: '1.5rem',
          letterSpacing: '0px',
          color: professionalTheme.palette.text.secondary,
        }}
      >
        "Discovery isn't about ideas—it's about evidence."
      </Typography>
    </Box>
    <Typography variant="body2" sx={{ mt: 3, pt: 2, borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
      Tailored for teams of 5-15; typically 4-8 weeks.
    </Typography>
    <Button 
      component={RouterLink} 
      to="/contact" 
      variant="contained" 
      color="secondary" 
      sx={{ mt: 4, display: 'block', mx: 'auto' }}
      aria-label="Contact us for product discovery details"
    >
      Schedule a Workshop
    </Button>
  </Paper>
);

export default Research;
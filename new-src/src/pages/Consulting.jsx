import React from 'react';
import { Paper, Typography, Divider, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import professionalTheme from '../theme/professionalTheme';

const Consulting = () => (
  <Paper sx={{ p: { xs: 2, md: 4 } }}>
    <Typography variant="h1" gutterBottom data-testid="consulting-title">Strategy Consulting</Typography>
    <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
    <Typography variant="body1" paragraph>
      Our core consulting service helps organizations define their product strategy, implement OKRs, and transition to outcome-based roadmaps. We provide tailored, hands-on guidance for your leadership and product teams.
    </Typography>
    <Button component={RouterLink} to="/" variant="contained" color="secondary" sx={{ mt: 3 }}>
      Return to Home
    </Button>
  </Paper>
);

export default Consulting;
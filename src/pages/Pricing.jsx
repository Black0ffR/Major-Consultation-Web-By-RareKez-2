import React from 'react';
import { Paper, Typography, Divider, Button, Box, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import professionalTheme from '../theme/professionalTheme';

const PricingCard = ({ title, price, features, isRecommended = false }) => (
  <Paper
    sx={{
      p: 3,
      textAlign: 'center',
      border: isRecommended ? '2px solid #6B7280' : '1px solid #E5E7EB',
      backgroundColor: isRecommended ? '#E5E7EB' : '#F3F4F6',
    }}
  >
    <Typography variant="h4" sx={{ mb: 1, color: professionalTheme.palette.primary.main }}>
      {title}
    </Typography>
    <Typography variant="h3" sx={{ mb: 3, color: professionalTheme.palette.secondary.main }}>
      ${price}/month
    </Typography>
    <Box sx={{ mb: 3 }}>
      {features.map((feature, index) => (
        <Typography key={index} variant="body2" sx={{ mb: 1, color: professionalTheme.palette.text.primary }}>
          • {feature}
        </Typography>
      ))}
    </Box>
    <Button variant="outlined" color="secondary" sx={{ mb: isRecommended ? 0 : 2 }}>
      Get Started
    </Button>
  </Paper>
);
const Pricing = () => (
  <Paper sx={{ p: { xs: 2, md: 4 } }}>
    <Typography variant="h1" gutterBottom data-testid="pricing-title">
      Flexible Pricing Packages
    </Typography>
    <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
    <Typography variant="body1" paragraph>
      We offer value-based pricing tailored to your needs—no hidden fees, just clear outcomes. Choose from our standard packages or contact us for custom consulting. All include ongoing support and measurable results tracking.
    </Typography>
    <Grid container spacing={4} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <PricingCard
          title="Basic"
          price="1,500"
          features={[
            "Initial strategy session (4 hours)",
            "OKR framework setup",
            "Monthly check-in report",
            "Email support"
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PricingCard
          title="Standard"
          price="3,500"
          features={[
            "Full discovery workshop (8 hours)",
            "Custom roadmap development",
            "Bi-weekly coaching calls",
            "Priority email & chat support"
          ]}
          isRecommended={true}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <PricingCard
          title="Premium"
          price="6,000+"
          features={[
            "Ongoing embedded consulting (20+ hours/month)",
            "Advanced product discovery & testing",
            "Executive alignment sessions",
            "Dedicated Slack channel & 24/7 support"
          ]}
        />
      </Grid>
    </Grid>
    <Typography variant="body2" sx={{ mt: 3, pt: 2, borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
      Prices are estimates; final quotes based on scope. Annual discounts available.
    </Typography>
    <Button 
      component={RouterLink} 
      to="/contact" 
      variant="contained" 
      color="secondary" 
      sx={{ mt: 4, display: 'block', mx: 'auto' }}
      aria-label="Contact us for a custom quote"
    >
      Request Custom Quote
    </Button>
  </Paper>
);
export default Pricing;
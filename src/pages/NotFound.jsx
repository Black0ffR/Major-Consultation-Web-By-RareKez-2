import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" data-testid="404-title">404</Typography>
        <Typography variant="h5" gutterBottom>Page Not Found</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
            The page you are looking for might have been moved or is temporarily unavailable.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" color="secondary" aria-label="Go to homepage">
            Go to Homepage
        </Button>
    </Paper>
);

export default NotFound;
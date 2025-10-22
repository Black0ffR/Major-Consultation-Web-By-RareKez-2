import React from 'react';
import { Paper, Typography, Divider, Box } from '@mui/material';
import professionalTheme from '../theme/professionalTheme';

const About = () => (
    <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h1" gutterBottom data-testid="about-title">Our Ethos & Approach</Typography>
        <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
        <Typography variant="h4" sx={{ mb: 2, color: professionalTheme.palette.secondary.main }}>
            Focused on Measurable Outcomes
        </Typography>
        <Typography variant="body1" paragraph>
            RareKez Consultation Hub is a strategic partner specializing in translating complex business challenges into clear, actionable, and measurable outcomes. We move beyond vanity metrics and feature delivery to focus intensely on customer-centricity and business impact. Our philosophy is rooted in the Lean and Agile principles of continuous delivery and validated learning.
        </Typography>
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
                “We don't manage projects; we manage business results.”
            </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 2, color: professionalTheme.palette.secondary.main }}>
            Expertise in OKRs and Product Discovery
        </Typography>
        <Typography variant="body1" paragraph>
            Our core service is empowering teams to define and achieve success using Objectives and Key Results (OKRs), coupled with modern Product Discovery techniques. We provide workshops, coaching, and strategic guidance to align your organization, from executives to product teams, ensuring every effort contributes to a defined, customer-validated objective.
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, pt: 2, borderTop: '1px solid #E0E0E0' }}>
            RareKez Hub: Building cultures that build great products.
        </Typography>
    </Paper>
);

export default About;
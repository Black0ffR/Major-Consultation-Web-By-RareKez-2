import React, { useState } from 'react';
import { Paper, Typography, Divider, Box, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import professionalTheme from '../theme/professionalTheme';

const Contact = ({ showSnackbar }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showSnackbar) {
      showSnackbar('Thank you for your message! We will get back to you shortly.', 'success');
    }
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h1" gutterBottom data-testid="contact-title">Contact Us</Typography>
      <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
      <Typography variant="body1" paragraph>
        Have a question about our services or want to discuss a potential project? Fill out the form below, and our team will get in touch with you promptly.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          aria-required="true"
        />
        <TextField
          label="Your Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          aria-required="true"
        />
        <TextField
          label="Your Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          multiline
          rows={5}
          required
          variant="outlined"
          aria-required="true"
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<EmailIcon aria-hidden="true" />}
          sx={{
            alignSelf: 'flex-start',
            mt: 2,
            backgroundColor: professionalTheme.palette.secondary.main,
            color: 'white',
            border: '1px solid ' + professionalTheme.palette.secondary.main,
            '&:hover': {
              backgroundColor: professionalTheme.palette.secondary.dark,
              borderColor: professionalTheme.palette.secondary.dark,
            },
          }}
          aria-label="Send contact message"
        >
          Send Message
        </Button>
      </Box>
    </Paper>
  );
};

export default Contact;
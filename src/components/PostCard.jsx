import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, Button, Box } from '@mui/material';
import professionalTheme from '../theme/professionalTheme';

const PostCard = React.memo(({ post }) => (
  <Paper sx={{ p: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: professionalTheme.shadows[4] } }}>
    <Typography variant="h4" gutterBottom data-testid={`post-title-${post.id}`}>
      {post.title}
    </Typography>
    <Typography variant="body2" color="text.secondary" paragraph>
      {post.body.substring(0, 100)}...
    </Typography>
    <Button
      variant="outlined"
      color="secondary"
      component={RouterLink}
      to={`/insights/${post.id}`}
      sx={{ mt: 2 }}
      aria-label={`Read full insights for ${post.title.substring(0, 50)}`}
    >
      Read Insights
    </Button>
  </Paper>
));

PostCard.displayName = 'PostCard';

export default PostCard;
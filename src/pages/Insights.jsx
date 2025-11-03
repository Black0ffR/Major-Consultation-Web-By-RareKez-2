/* eslint-disable no-unused-vars */

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, Box, CircularProgress, Paper, Divider, Button } from '@mui/material';
import PostCard from '../components/PostCard';
import professionalTheme from '../theme/professionalTheme';

const InsightsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data.slice(0, 10));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: professionalTheme.palette.text.primary }}>Loading the latest insights...</Typography>
      </Box>
    );
  }
  if (error) return <Typography color="error" align="center">Error retrieving documents: {error}</Typography>;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography 
          variant="h1" 
          align="center" 
          sx={{ 
            mb: 4, 
            fontSize: { xs: '2rem', md: '3rem' },
            color: 'background.paper',
          }}
          data-testid="insights-title"
        >
          Latest Strategic Insights
        </Typography>
        <Typography align="center" color="background.paper" sx={{ mb: 6 }}>
          Curated articles and findings from the RareKez team.
        </Typography>
      </Grid>
      {posts.map((post) => (
        <Grid item xs={12} key={post.id}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (e) {
        setError("Could not find the requested document in our archives.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: professionalTheme.palette.text.primary }}>Searching archives...</Typography>
      </Box>
    );
  }
  if (error) return <Typography color="error" align="center">{error}</Typography>;
  if (!post) return null;

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, my: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' } }} data-testid="post-detail-title">
        {post.title}
      </Typography>
      <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
      <Typography variant="body1" sx={{ mt: 3, whiteSpace: 'pre-line' }}>
        {post.body}
      </Typography>
      <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
      <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
        Back to Insights
      </Button>
    </Paper>
  );
};

const Insights = () => (
  <Suspense fallback={<CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />}>
    <Routes>
      <Route index element={<InsightsList />} />
      <Route path=":id" element={<PostDetail />} />
    </Routes>
  </Suspense>
);

export default Insights;
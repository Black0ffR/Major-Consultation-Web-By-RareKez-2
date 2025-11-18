import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Person, Email, Phone, Home, Visibility, Edit } from '@mui/icons-material';
import axios from 'axios';
import professionalTheme from '../theme/professionalTheme';
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://students-learning-api.onrender.com/api/auth');
        setUsers(response.data || []);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  if (loading) {
    return (
      <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <CircularProgress color="primary" sx={{ mb: 2 }} data-testid="users-loading" />
        <Typography variant="body1" color="text.secondary">
          Loading registered users...
        </Typography>
      </Paper>
    );
  }
  if (error) {
    return (
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Alert severity="error" sx={{ mb: 2 }} data-testid="users-error">
          {error}
        </Alert>
      </Paper>
    );
  }
  return (
    <Paper
      sx={{
        p: { xs: 2, md: 4 },
        border: `1px solid ${professionalTheme.palette.divider}`,
        backgroundColor: professionalTheme.palette.background.paper,
      }}
      data-testid="users-list-paper"
    >
      <Typography
        variant="h1"
        gutterBottom
        color="primary"
        data-testid="users-title"
      >
        Registered Users
      </Typography>
      <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
      <Typography variant="body1" paragraph sx={{ mb: 4, color: professionalTheme.palette.text.secondary }}>
        Here is a list of all registered users in the system. Use the buttons to view or update details.
      </Typography>
      {users.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No users found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Be the first to register!
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ overflowX: 'auto' }}> { }
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    User
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    Contact
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    Registration Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover data-testid={`user-row-${user._id}`}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: professionalTheme.palette.secondary.main, width: 40, height: 40 }}>
                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="medium" color="text.primary">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : 'Unknown User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {user._id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {user.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 16, color: professionalTheme.palette.secondary.main }} />
                          <Typography variant="body2" color="text.primary">
                            {user.email.length > 30 ? `${user.email.substring(0, 30)}...` : user.email}
                          </Typography>
                        </Box>
                      )}
                      {user.phoneNumber && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: 16, color: professionalTheme.palette.secondary.main }} />
                          <Typography variant="body2" color="text.primary">
                            {user.phoneNumber}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.address ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Home sx={{ fontSize: 16, color: professionalTheme.palette.secondary.main }} />
                        <Typography variant="body2" color="text.primary">
                          {user.address}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.primary">
                      {formatDate(user.createdAt)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}> { }
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Visibility />}
                        component={RouterLink}
                        to={`/user/${user._id}`}
                        sx={{
                          minWidth: 'auto',
                          color: professionalTheme.palette.text.primary,
                          borderColor: professionalTheme.palette.secondary.main,
                          '&:hover': {
                            backgroundColor: professionalTheme.palette.secondary.main,
                            color: professionalTheme.palette.common.white,
                          },
                        }}
                        aria-label={`View details for ${user.firstName || 'user'}`}
                        data-testid={`view-button-${user._id}`}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Edit />}
                        component={RouterLink}
                        to={`/update-user/${user._id}`}
                        sx={{
                          minWidth: 'auto',
                          backgroundColor: professionalTheme.palette.primary.main,
                          color: professionalTheme.palette.common.white,
                          '&:hover': {
                            backgroundColor: professionalTheme.palette.primary.dark,
                          },
                        }}
                        aria-label={`Update details for ${user.firstName || 'user'}`}
                        data-testid={`update-button-${user._id}`}
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      { }
      {users.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 2,
            backgroundColor: professionalTheme.palette.background.default,
            borderRadius: 2,
            border: `1px solid ${professionalTheme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="text.secondary" textAlign="center">
            <strong>Total Users:</strong> {users.length} |
            <strong> Last Updated:</strong> {new Date().toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
export default UsersList;
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
  Chip
} from '@mui/material';
import { Person, Email, Phone, Home } from '@mui/icons-material';
import professionalTheme from '../theme/professionalTheme';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://students-learning-api.onrender.com/api/auth');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.users || data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };
  if (loading) {
    return (
      <Paper sx={{ p: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading registered users...
        </Typography>
      </Paper>
    );
  }
  if (error) {
    return (
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading users: {error}
        </Alert>
      </Paper>
    );
  }
  return (
    <Paper sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h1" gutterBottom data-testid="users-title">
        Registered Users
      </Typography>
      <Divider sx={{ my: 4, borderColor: professionalTheme.palette.text.secondary }} />
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Here is a list of all registered users in the system.
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
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">User</Typography></TableCell>
                <TableCell><Typography variant="h6">Contact</Typography></TableCell>
                <TableCell><Typography variant="h6">Address</Typography></TableCell>
                <TableCell><Typography variant="h6">Registration Date</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id || index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#6B7280' }}>
                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {user.firstName && user.lastName 
                            ? `${user.firstName} ${user.lastName}` 
                            : user.name || 'Unknown User'}
                        </Typography>
                        {user.email && (
                          <Typography variant="body2" color="text.secondary">
                            ID: {user.id || 'N/A'}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {user.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 16, color: '#6B7280' }} />
                          <Typography variant="body2">{user.email}</Typography>
                        </Box>
                      )}
                      {user.phoneNumber && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: 16, color: '#6B7280' }} />
                          <Typography variant="body2">{user.phoneNumber}</Typography>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {user.address ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Home sx={{ fontSize: 16, color: '#6B7280' }} />
                        <Typography variant="body2">{user.address}</Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Not provided
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(user.createdAt || user.registrationDate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#F3F4F6', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          <strong>Total Users:</strong> {users.length} | 
          <strong> Last Updated:</strong> {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};
export default UsersList;
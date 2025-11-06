import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
const AuthProvider = ({ children, showSnackbar }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setLoading(false);
  }, []);
  const login = async (email, password) => {
    try {
      const response = await fetch('https://students-learning-api.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        if (showSnackbar) {
          showSnackbar('Login successful!', 'success');
        }
        return { success: true, data };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (showSnackbar) {
        showSnackbar(error.message || 'Login failed. Please try again.', 'error');
      }
      return { success: false, error: error.message };
    }
  };
  const register = async (userData) => {
    try {
      const response = await fetch('https://students-learning-api.onrender.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        if (showSnackbar) {
          showSnackbar('Registration successful! Please log in with your new account.', 'success');
        }
        return { success: true, data };
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (showSnackbar) {
        showSnackbar(error.message || 'Registration failed. Please try again.', 'error');
      }
      return { success: false, error: error.message };
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    if (showSnackbar) {
      showSnackbar('Logged out successfully', 'success');
    }
  };
  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
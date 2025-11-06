import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import professionalTheme from './theme/professionalTheme';
import Login from './pages/Login';
import RegistrationScreen from './pages/RegistrationScreen';
import AuthProvider from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Insights = lazy(() => import('./pages/Insights'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Consulting = lazy(() => import('./pages/Consulting'));
const Research = lazy(() => import('./pages/Research'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UserDetails = lazy(() => import('./pages/ViewUser'));
const UpdateUser = lazy(() => import('./pages/UpdateUser'));
const UsersList = lazy(() => import('./pages/UsersList'));

function App() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <ThemeProvider theme={professionalTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <BrowserRouter>
          <AuthProvider showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar}>
            <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
              <Routes>
                {}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<RegistrationScreen />} />

                {}
                <Route path="/user/:id" element={
                  <ProtectedRoute>
                    <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                      <UserDetails />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/update-user/:id" element={
                  <ProtectedRoute>
                    <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                      <UpdateUser />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Home />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <UsersList />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/insights/*"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Insights />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <About />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Contact showSnackbar={showSnackbar} />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consulting"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Consulting />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/research"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Research />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/pricing"
                  element={
                    <ProtectedRoute>
                      <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                        <Pricing />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
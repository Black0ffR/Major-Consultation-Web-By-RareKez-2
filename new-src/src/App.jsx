import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import professionalTheme from './theme/professionalTheme';

const Home = lazy(() => import('./pages/Home'));
const Insights = lazy(() => import('./pages/Insights'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Consulting = lazy(() => import('./pages/Consulting'));
const Research = lazy(() => import('./pages/Research'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}>
                    <Home />
                  </Layout>
                }
              />
              <Route path="/insights/*" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><Insights /></Layout>} />
              <Route path="/about" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><About /></Layout>} />
              <Route path="/contact" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><Contact showSnackbar={showSnackbar} /></Layout>} />
              <Route path="/consulting" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><Consulting /></Layout>} />
              <Route path="/research" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><Research /></Layout>} />
              <Route path="/pricing" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><Pricing /></Layout>} />
              <Route path="*" element={<Layout showSnackbar={showSnackbar} handleCloseSnackbar={handleCloseSnackbar} snackbar={snackbar}><NotFound /></Layout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './app/theme';
import { RootState } from './app/store';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import PerformanceMetrics from './pages/PerformanceMetrics';
import NotFound from './pages/NotFound';
import Funds from './pages/Funds';
import Login from './pages/Login';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/performance-metrics" 
            element={
              <ProtectedRoute>
                <Layout>
                  <PerformanceMetrics />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/mutual-funds" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Funds />
                </Layout>
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
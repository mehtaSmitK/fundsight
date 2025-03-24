import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Check if token exists in localStorage as a backup
    const storedToken = localStorage.getItem('token');
    
    if (!isAuthenticated && !token && !storedToken) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  // If not authenticated, redirect to login
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
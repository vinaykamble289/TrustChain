
// FILE: src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';
function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, userRole, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center p-12"><LoadingSpinner /></div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;

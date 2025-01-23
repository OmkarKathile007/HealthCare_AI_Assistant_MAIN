import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Add authentication check logic here
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!(JSON.parse(localStorage.getItem('Profile'))?.token);

  return isAuthenticated ? children : <Navigate to="/Auth" />;
};

export default ProtectedRoute;

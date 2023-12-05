import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, allowedRoles }) => {
  // Replace this with your actual authentication logic
  const token = localStorage.getItem('token');
  let userRole =  jwtDecode(token) ? jwtDecode(token).usertype : '';
  
  if (!allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page if the user's role is not allowed
    return <Navigate to='/unauthorized' />;
  }

  // Render the protected route
  return element;
};

export default ProtectedRoute;

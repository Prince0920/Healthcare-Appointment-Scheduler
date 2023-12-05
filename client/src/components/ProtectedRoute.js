import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, allowedRoles }) => {
  // Replace this with your actual authentication logic
  const token = localStorage.getItem('token');
  
  try {
    // Try to decode the token
    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      // If decoding returns null, token is invalid
      throw new Error('Invalid token');
    }

    const userRole = decodedToken.usertype;

    if (!allowedRoles.includes(userRole)) {
      // Redirect to unauthorized page if the user's role is not allowed
      return <Navigate to='/unauthorized' />;
    }

    // Render the protected route
    return element;
  } catch (error) {
    // Handle decoding errors (e.g., invalid token format)
    console.error('Error decoding token:', error);
    // Redirect to login or handle the error appropriately
    return <Navigate to='/login' />;
  }
};

export default ProtectedRoute;

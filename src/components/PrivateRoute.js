// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../Slices/authSlice';

function PrivateRoute({ element, ...rest }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/home" />}
    />
  );
}

export default PrivateRoute;

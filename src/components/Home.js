// src/components/Home.js
import React from 'react';
import { Route, Navigate ,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../Slices/authSlice';

function Home() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <h1>Welcome, {user.username}!</h1>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      {/* Your protected content */}
    </div>
  );
}

export default Home;
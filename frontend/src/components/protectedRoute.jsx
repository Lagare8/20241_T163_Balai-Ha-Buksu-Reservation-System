import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />; // Redirect to login if no user is logged in
    }

    if (!allowedRoles.includes(user.userType.toLowerCase())) {
        return <Navigate to="/unauthorized" />; // Redirect to unauthorized page if user role doesn't match
    }

    return children; // Allow access to the child components if the user role matches
};

export default ProtectedRoute;

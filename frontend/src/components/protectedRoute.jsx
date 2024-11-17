import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assume useAuth provides user info and role

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/" />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect if the user does not have the right role
        return <Navigate to="/unauthorized" />;
    }

    // Render the protected component if access is granted
    return children;
};

export default ProtectedRoute;

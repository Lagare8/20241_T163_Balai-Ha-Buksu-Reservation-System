import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthContext);

    console.log("User in ProtectedRoute:", user); // Trace user in ProtectedRoute

    if (!user || !allowedRoles.includes(user.userType.toLowerCase())) {
        console.log("User not authorized, redirecting to '/unauthorized'"); // Trace unauthorized access
        return <Navigate to="/unauthorized" />;
    }

    console.log("User is authorized, rendering children"); // Trace when user is authorized
    return children;
};

export default ProtectedRoute;

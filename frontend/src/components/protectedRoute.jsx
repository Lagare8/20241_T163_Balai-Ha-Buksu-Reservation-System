import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthContext);

    // If the user is not logged in or their role is not allowed, redirect to login or unauthorized page
    if (!user || !allowedRoles.includes(user.userType)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;

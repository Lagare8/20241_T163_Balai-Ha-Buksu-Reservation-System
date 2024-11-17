// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Import jwt-decode

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode the token to get user data
                const decodedToken = jwt_decode(token);
                setUser({ ...decodedToken, token }); // Set user data from decoded token
            } catch (error) {
                console.error("Error decoding token", error);
                localStorage.removeItem('token'); // In case of invalid token, clear localStorage
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null); // Initialize token from localStorage if available
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);  // Decode the token to get user data
                setUser({ ...decodedToken, token });   // Set user state based on decoded token
            } catch (error) {
                console.error("Error decoding token", error);
                localStorage.removeItem('token'); // Remove invalid token from localStorage
                setToken(null); // Clear token state
            }
        }
    }, [token]);

    // Logout function to clear the token and user data
    const logout = () => {
        localStorage.removeItem('token');  // Remove token from localStorage
        setToken(null);  // Clear the token state
        setUser(null);  // Clear the user state
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

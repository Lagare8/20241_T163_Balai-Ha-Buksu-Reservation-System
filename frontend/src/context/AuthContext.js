import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);  // Add state for token

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        console.log("Token retrieved from localStorage:", tokenFromLocalStorage);

        if (tokenFromLocalStorage) {
            try {
                // Decode the token to get user data
                console.log("Decoding token...");
                const decodedToken = jwtDecode(tokenFromLocalStorage);
                console.log("Decoded token:", decodedToken);

                setUser({ ...decodedToken, token: tokenFromLocalStorage });  // Set user data from decoded token
                setToken(tokenFromLocalStorage);  // Set token in context
            } catch (error) {
                console.error("Error decoding token", error);
                localStorage.removeItem('token'); // Clear invalid token from localStorage
            }
        } else {
            console.log("No token found in localStorage");
        }
    }, []);

    console.log("User state after decoding:", user);  // Log the user state after decoding the token

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
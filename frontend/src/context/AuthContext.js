import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure correct import

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage) {
            try {
                const decodedToken = jwtDecode(tokenFromLocalStorage);
                setUser({ ...decodedToken, token: tokenFromLocalStorage });
                setToken(tokenFromLocalStorage);
                setUserId(decodedToken.id || decodedToken.userId); // Adjust based on your token structure
            } catch (error) {
                console.error("Error decoding token", error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};

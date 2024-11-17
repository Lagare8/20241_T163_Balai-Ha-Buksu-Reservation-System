// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Import jwt-decoden

// Create AuthContext
export const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('userToken'));

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
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setToken(null);
  };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
  return (
    <AuthContext.Provider value={{ token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default App;
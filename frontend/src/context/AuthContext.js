import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('userToken')); // Lazy initialization
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  useEffect(() => {
    // Ensure the token is synced between localStorage and the context
    const storedToken = localStorage.getItem('userToken');
    if (storedToken !== token) {
      setToken(storedToken); // Update state if token in localStorage changes
    }
  }, [token]); // Watch token for changes

  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

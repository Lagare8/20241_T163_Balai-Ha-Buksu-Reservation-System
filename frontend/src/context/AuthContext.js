import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Replace with actual authentication logic

    // Mock user data for testing
    const mockUser = { id: 1, role: 'admin', name: 'John Doe' };

    // Simulate login
    React.useEffect(() => {
        setUser(mockUser);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

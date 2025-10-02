import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RENDER_WEBSITE_LINK = import.meta.env.VITE_RENDER_WEBSITE_LINK;

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on app start
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${RENDER_WEBSITE_LINK}/api/auth/profile`, {
                withCredentials: true
            });
            setUser(response.data);
        } catch (e) {
            setUser(null, e);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${RENDER_WEBSITE_LINK}/api/auth/login`,
                { email, password },
                { withCredentials: true }
            );
            setUser(response.data);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(
                `${RENDER_WEBSITE_LINK}/api/auth/register`,
                { name, email, password },
                { withCredentials: true }
            );

            setUser(response.data);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.get(`${VITE_PUBLIC_API_URL}/api/auth/logout`, {
                withCredentials: true
            });
            setUser(null);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Logout failed' };
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuthStatus
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getCurrentUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Run once on mount to check if token exists in localStorage
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Try to fetch user with stored token
                    const userData = await getCurrentUser(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to authenticate with stored token", error);
                    logout(); // clean up if invalid
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await apiLogin(email, password);
            const token = data.token;
            localStorage.setItem('token', token);
            setToken(token);

            let userData = data.user;
            if (!userData) {
                userData = await getCurrentUser(token);
            }
            setUser(userData);
            return data;
        } catch (error) {
            console.error('Login error in AuthContext', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        router.push('/connexion');
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token && !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

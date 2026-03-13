"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getCurrentUser } from '@/services/authService';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

const getRedirectPath = (user) => {
    if (!user) return '/';
    const role = user.type || user.role || (user.roles && user.roles[0]);
    switch (role) {
        case 'administrateur':
        case 'ROLE_ADMIN':
            return '/administrateur';
        case 'formateur':
        case 'ROLE_FORMATEUR':
            return '/formateur';
        case 'apprenant':
        case 'ROLE_USER':
            return '/apprenant';
        default:
            return '/';
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await getCurrentUser(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                } catch (error) {
                    console.error("Failed to authenticate with stored token", error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
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

            const redirectPath = getRedirectPath(userData);
            router.push(redirectPath);

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

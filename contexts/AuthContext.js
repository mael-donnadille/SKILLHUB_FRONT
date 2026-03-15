"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, getCurrentUser } from '@/services/authService';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

const getRedirectPath = (user) => {
    if (!user) return '/';
    // Gestion flexible des rôles (tableau ou string)
    const roles = user.roles || (user.role ? [user.role] : []);
    const type = user.type;

    if (roles.includes('ROLE_ADMIN') || type === 'administrateur') {
        return '/administrateur';
    }
    if (roles.includes('ROLE_FORMATEUR') || type === 'formateur') {
        return '/formateur';
    }
    if (roles.includes('ROLE_USER') || type === 'apprenant') {
        return '/apprenant';
    }
    
    return '/';
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const userData = await getCurrentUser(storedToken);
                    setToken(storedToken);
                    setUser(userData);
                    
                    // Si l'utilisateur est sur la page de connexion alors qu'il est déjà identifié, on le redirige
                    if (pathname === '/connexion') {
                         const redirectPath = getRedirectPath(userData);
                         router.push(redirectPath);
                    }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const data = await apiLogin(email, password);
            const newToken = data.token;
            
            if (!newToken) {

                throw new Error('Token not found in response');
            }

            localStorage.setItem('token', newToken);
            setToken(newToken);

            let userData = data.user;
            // Si l'API de login ne renvoie pas l'utilisateur complet, on le récupère
            if (!userData) {
                userData = await getCurrentUser(newToken);
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

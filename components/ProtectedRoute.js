"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push('/connexion');
            } else if (allowedRoles && allowedRoles.length > 0) {
                // Check if user has at least one of the allowed roles
                const userType = user?.type;
                const userRole = user?.role;
                const userRolesArray = user?.roles || []; // fallback for spring/symfony style roles

                const hasRole = allowedRoles.includes(userType) ||
                    allowedRoles.includes(userRole) ||
                    userRolesArray.some(r => allowedRoles.includes(r));

                if (!hasRole) {
                    // Redirect to home or another page if not authorized
                    router.push('/');
                }
            }
        }
    }, [isAuthenticated, loading, router, user, allowedRoles]);

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // While redirecting or if not authenticated/authorized, don't render children
    if (!isAuthenticated) {
        return null;
    }

    if (allowedRoles) {
        const userType = user?.type;
        const userRole = user?.role;
        const userRolesArray = user?.roles || [];
        const hasRole = allowedRoles.includes(userType) ||
            allowedRoles.includes(userRole) ||
            userRolesArray.some(r => allowedRoles.includes(r));
        if (!hasRole) return null;
    }

    return <>{children}</>;
}

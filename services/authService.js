import config from '@/utils/config';

export const login = async (email, password) => {
    try {
        // La nouvelle route pour créer une session (login)
        const response = await fetch(`${config.API_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        return data; // Expected { token: string, user: object }
    } catch (error) {
        console.error('Login service error:', error);
        throw error;
    }
};

export const getCurrentUser = async (token) => {
    try {
        // La nouvelle route pour récupérer l'utilisateur courant
        const response = await fetch(`${config.API_URL}/sessions/current`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get current user service error:', error);
        throw error;
    }
};

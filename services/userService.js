import config from '@/utils/config';

export const getUsers = async (token) => {
    try {
        const res = await fetch(`${config.API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

import config from '@/utils/config';

export const getAteliers = async (token) => {
    try {
        const res = await fetch(`${config.API_URL}/ateliers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });
        if (!res.ok) {
            throw new Error('Failed to fetch ateliers');
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching ateliers:", error);
        throw error;
    }
};

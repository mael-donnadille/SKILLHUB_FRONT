import config from '@/utils/config';

export const getCategories = async () => {
    try {
        const res = await fetch(`${config.API_URL}/categories`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

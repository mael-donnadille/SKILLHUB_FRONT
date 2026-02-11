import config from '@/utils/config';

export const getFormations = async () => {
    try {
        const res = await fetch(`${config.API_URL}/formations`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch formations');
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching formations:", error);
        throw error;
    }
};

export const getFormation = async (id) => {
    try {
        const res = await fetch(`${config.API_URL}/formations/${id}`, { cache: 'no-store' });
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error('Failed to fetch formation');
        }
        return await res.json();
    } catch (error) {
        console.error(`Error fetching formation ${id}:`, error);
        throw error;
    }
};

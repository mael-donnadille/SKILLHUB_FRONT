import config from '@/utils/config';

export const getFormations = async () => {
    try {
        const res = await fetch(`${config.API_URL}/formations`, { next: { revalidate: 3600 } });
        if (!res.ok) {
            throw new Error('Failed to fetch formations');
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching formations:", error);
        throw error;
    }
};

export const getUpcomingFormations = async () => {
    try {
        const courses = await getFormations();
        const currentYear = new Date().getFullYear();
        return courses.filter(course => {
            if (!course.annee || !course.annee.libelle) return false;
            const parts = course.annee.libelle.split('-');
            if (parts.length < 2) return false;
            const endYear = parseInt(parts[1]);
            return endYear >= currentYear;
        }).slice(0, 3);
    } catch (error) {
        console.error("Error fetching upcoming formations:", error);
        return [];
    }
};

export const getFormation = async (id) => {
    try {
        const res = await fetch(`${config.API_URL}/formations/${id}`, { next: { revalidate: 3600 } });
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

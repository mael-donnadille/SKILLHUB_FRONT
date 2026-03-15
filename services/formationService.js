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

export const getAdminFormations = async (token) => {
    try {
        const res = await fetch(`${config.API_URL}/formations`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        
        if (!res.ok) throw new Error('Failed to fetch admin formations');

        const data = await res.json();
        return Array.isArray(data) ? data : (data['hydra:member'] || data.data || []);
    } catch (error) {
        console.error("Error fetching admin formations:", error);
        throw error;
    }
};

export const getAdminFormation = async (id, token) => {
    try {
        const res = await fetch(`${config.API_URL}/formations/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        
        if (res.ok) {
            return await res.json();
        }
        
        console.log(`Direct fetch failed for formation ${id}, trying admin list fallback...`);
        const allFormations = await getAdminFormations(token);
        // eslint-disable-next-line eqeqeq
        const found = allFormations.find(f => f.id == id);
        
        if (found) return found;

        throw new Error('Failed to fetch formation details');
    } catch (error) {
        console.error(`Error fetching admin formation ${id}:`, error);
        return null;
    }
};

export const validateFormation = async (id, token) => {
    const res = await fetch(`${config.API_URL}/admin/formations/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json'
        },
        body: JSON.stringify({ statut: 'VALIDE' })
    });
    if (!res.ok) throw new Error('Failed to validate formation');
    return await res.json();
};

export const rejectFormation = async (id, token) => {
    const res = await fetch(`${config.API_URL}/admin/formations/${id}/status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/merge-patch+json'
        },
        body: JSON.stringify({ statut: 'REFUSE' })
    });
    if (!res.ok) throw new Error('Failed to reject formation');
    return await res.json();
};

export const createFormation = async (formationData, token) => {
    try {
        // En fonction des routes, l'admin peut utiliser /api/formations ou /api/formateurs/me/formations
        // On suppose que l'admin utilise la route générale si possible, ou celle-ci.
        const res = await fetch(`${config.API_URL}/formations`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formationData)
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create formation: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating formation:', error);
        throw error;
    }
};

export const updateFormation = async (id, formationData, token) => {
    try {
        const res = await fetch(`${config.API_URL}/formations/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/merge-patch+json'
            },
            body: JSON.stringify(formationData)
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update formation: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Error updating formation ${id}:`, error);
        throw error;
    }
};

export const deleteFormation = async (id, token) => {
    try {
        const res = await fetch(`${config.API_URL}/formations/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!res.ok) {
            throw new Error(`Failed to delete formation: ${res.status}`);
        }
        return true;
    } catch (error) {
        console.error(`Error deleting formation ${id}:`, error);
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

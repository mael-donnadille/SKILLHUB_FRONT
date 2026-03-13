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
            throw new Error(`Failed to fetch users: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Gestion des différents formats de réponse d'API
        if (Array.isArray(data)) {
            return data;
        }
        
        // Support pour API Platform (Hydra)
        if (data['hydra:member'] && Array.isArray(data['hydra:member'])) {
            return data['hydra:member'];
        }
        
        // Support pour les APIs paginées classiques (ex: { data: [...] })
        if (data.data && Array.isArray(data.data)) {
            return data.data;
        }

        console.warn("Format de réponse inattendu pour getUsers:", data);
        return [];
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

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

export const updateUser = async (id, userData, token) => {
    try {
        const res = await fetch(`${config.API_URL}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/merge-patch+json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to update user: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
};

export const createUser = async (userData, token) => {
    try {
        const res = await fetch(`${config.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to create user: ${res.status}`);
        }
        
        return await res.json();
    } catch (error) {
        console.error(`Error creating user:`, error);
        throw error;
    }
};

export const deleteUser = async (id, token) => {
    try {
        const res = await fetch(`${config.API_URL}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!res.ok) {
            // API Platform renvoie souvent 204 No Content pour un DELETE réussi, 
            // ce qui ne contient pas de JSON, donc on vérifie juste res.ok
            throw new Error(`Failed to delete user: ${res.status}`);
        }
        
        return true;
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        throw error;
    }
};

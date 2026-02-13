export const MOCK_DATA = {
    users: [
        { id: 1, nom: 'Dubois', prenom: 'Marie', email: 'marie.dubois@skillhub.fr', role: 'administrateur', date_creation: '2024-09-01' },
        { id: 2, nom: 'Martin', prenom: 'Pierre', email: 'pierre.martin@skillhub.fr', role: 'administrateur', date_creation: '2024-09-01' },
        { id: 3, nom: 'Bernard', prenom: 'Sophie', email: 'sophie.bernard@skillhub.fr', role: 'formateur', date_creation: '2024-09-05' },
        { id: 4, nom: 'Petit', prenom: 'Julien', email: 'julien.petit@skillhub.fr', role: 'formateur', date_creation: '2024-09-05' },
        { id: 8, nom: 'Laurent', prenom: 'Emma', email: 'emma.laurent@email.fr', role: 'apprenant', date_creation: '2024-09-10' },
        // ... adding a representative subset
        { id: 9, nom: 'Lefebvre', prenom: 'Hugo', email: 'hugo.lefebvre@email.fr', role: 'apprenant', date_creation: '2024-09-10' }
    ],
    workshops: [
        { id: 1, titre: 'HTML/CSS - Atelier Pratique', date: '2024-11-15', horaire: '14:00 - 17:00', places: 15, inscrit: 12, salle: 'Virtuelle A' },
        { id: 2, titre: 'JavaScript - DOM Manipulation', date: '2024-11-18', horaire: '09:00 - 12:00', places: 15, inscrit: 8, salle: 'Virtuelle B' },
        { id: 3, titre: 'React - Composants Avancés', date: '2024-11-20', horaire: '14:00 - 17:00', places: 20, inscrit: 20, salle: 'Campus Paris - Salle 3' },
        { id: 4, titre: 'UX Design - Wireframing', date: '2024-11-22', horaire: '10:00 - 13:00', places: 10, inscrit: 5, salle: 'Virtuelle A' },
        { id: 5, titre: 'Node.js - API REST', date: '2024-11-25', horaire: '14:00 - 17:00', places: 15, inscrit: 15, salle: 'Virtuelle C' }
    ],
    formations: [
        { id: 1, titre: 'HTML/CSS - Les Fondamentaux', statut: 'VALIDE', category: 'Développement Web', formateur: 'Sophie Bernard' },
        { id: 2, titre: 'JavaScript pour Débutants', statut: 'VALIDE', category: 'Développement Web', formateur: 'Sophie Bernard' },
        { id: 9, titre: 'React JS - Framework Frontend', statut: 'EN_ATTENTE', category: 'Développement Web', formateur: 'Sophie Bernard' },
        { id: 11, titre: 'Cryptomonnaies - Trading', statut: 'REFUSE', category: 'Marketing Digital', formateur: 'Camille Leroy' }
    ],
    stats: {
        totalUsers: 22,
        activeFormations: 13,
        upcomingWorkshops: 5,
        pendingValidations: 2
    },
    recentActivity: [
        { id: 1, type: 'INSCRIPTION', user: 'Emma Laurent', detail: 'HTML/CSS - Atelier 1', date: '2024-10-01' },
        { id: 2, type: 'EVALUATION', user: 'Hugo Lefebvre', detail: 'Note: 16/20 (HTML/CSS)', date: '2024-10-29' }
    ]
};

export const getAdminStats = async () => MOCK_DATA.stats;
export const getUsers = async () => MOCK_DATA.users;
export const getFormationsAdmin = async () => MOCK_DATA.formations;
export const getWorkshops = async () => MOCK_DATA.workshops;
export const getRecentActivity = async () => MOCK_DATA.recentActivity;

export const MOCK_LEARNER_DATA = {
    profile: {
        id: 8,
        nom: 'Laurent',
        prenom: 'Emma',
        email: 'emma.laurent@email.fr',
        role: 'apprenant',
        avatar: 'EL',
        subscription: {
            status: 'ACTIVE',
            plan: 'Annuel',
            startDate: '2024-09-01',
            endDate: '2025-08-31'
        }
    },
    // Formations where the user has at least one workshop registration (past or future)
    myFormations: [
        {
            id: 1,
            titre: 'HTML/CSS - Les Fondamentaux',
            category: 'Développement Web',
            workshopsTaken: 1,
            nextWorkshopDate: '2024-11-15'
        },
        {
            id: 5,
            titre: 'Node.js - API REST',
            category: 'Développement Web',
            workshopsTaken: 0,
            nextWorkshopDate: '2024-11-25'
        }
    ],
    upcomingWorkshops: [
        {
            id: 1,
            titre: 'HTML/CSS - Atelier Pratique',
            date: '2024-11-15',
            horaire: '14:00 - 17:00',
            salle: 'Virtuelle A',
            formateur: 'Sophie Bernard',
            formationId: 1
        },
        {
            id: 5,
            titre: 'Node.js - API REST',
            date: '2024-11-25',
            horaire: '14:00 - 17:00',
            salle: 'Virtuelle C',
            formateur: 'Julien Petit',
            formationId: 5
        }
    ],
    achievements: [
        { id: 1, title: 'Premier Pas', description: 'Première connexion réussie', date: '2024-09-10', icon: 'Rocket' }
    ]
};

export const getLearnerProfile = async () => MOCK_LEARNER_DATA.profile;
export const getMyFormations = async () => MOCK_LEARNER_DATA.myFormations;
export const getLearnerWorkshops = async () => MOCK_LEARNER_DATA.upcomingWorkshops;
export const getAchievements = async () => MOCK_LEARNER_DATA.achievements;

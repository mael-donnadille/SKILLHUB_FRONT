import { getFormations } from "@/services/formationService";
import { slugify } from "@/utils/slugify";

export default async function sitemap() {
    const baseUrl = 'https://skillhub.com'; // Remplacer par l'URL de prod

    // Pages statiques
    const routes = [
        '',
        '/formations',
        '/categories',
        '/connexion',
        '/inscription',
        '/aide',
        '/faq',
        '/confidentialite',
        '/conditions-generales',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Pages dynamiques (Formations)
    let formationRoutes = [];
    try {
        const formations = await getFormations();
        formationRoutes = formations.map((formation) => ({
            url: `${baseUrl}/formations/${formation.id}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        }));
    } catch (error) {
        console.error("Sitemap generation error:", error);
    }

    return [...routes, ...formationRoutes];
}

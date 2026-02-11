import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CourseListSection from "@/components/landing/CourseListSection";
import CtaSection from "@/components/landing/CtaSection";
import { getFormations } from "@/services/formationService";

export default async function Home() {
    const courses = await getFormations();

    // Filtrage pour la section "Prochaines formations" (Logique déplacée ici pour le SSR)
    const currentYear = new Date().getFullYear();
    const upcomingCourses = courses.filter(course => {
        if (!course.annee || !course.annee.libelle) return false;
        const parts = course.annee.libelle.split('-');
        if (parts.length < 2) return false;
        const endYear = parseInt(parts[1]);
        return endYear >= currentYear;
    }).slice(0, 3);

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <main className="grow">
                <HeroSection allCourses={courses} />
                <FeaturesSection />
                <CourseListSection courses={upcomingCourses} />
                <CtaSection />
            </main>
        </div>
    );
}

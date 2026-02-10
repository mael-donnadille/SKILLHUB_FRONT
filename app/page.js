import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CourseListSection from "@/components/landing/CourseListSection";
import MentorsSection from "@/components/landing/MentorsSection";
import CtaSection from "@/components/landing/CtaSection";

async function getCourses() {
    try {
        // Utilisation de no-store pour éviter le cache et avoir des données fraîches
        // En production, on pourrait utiliser revalidate: 3600 par exemple
        const res = await fetch('http://localhost:8000/api/formations', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

export default async function Home() {
    const courses = await getCourses();

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
            <Navbar />

            <main className="grow">
                {/* On passe toutes les formations à la HeroSection pour la recherche */}
                <HeroSection allCourses={courses} />
                <FeaturesSection />
                {/* On passe seulement les formations filtrées à la liste */}
                <CourseListSection courses={upcomingCourses} />
                <MentorsSection />
                <CtaSection />
            </main>

            <Footer />
        </div>
    );
}

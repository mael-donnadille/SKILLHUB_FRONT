import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CourseListSection from "@/components/landing/CourseListSection";
import CtaSection from "@/components/landing/CtaSection";
import { getFormations, getUpcomingFormations } from "@/services/formationService";

export default async function Home() {
    const courses = await getFormations();
    const upcomingCourses = await getUpcomingFormations();

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

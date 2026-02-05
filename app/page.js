import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CourseListSection from "@/components/landing/CourseListSection";
import MentorsSection from "@/components/landing/MentorsSection";
import CtaSection from "@/components/landing/CtaSection";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Navbar />

            <main className="grow">
                <HeroSection />
                <FeaturesSection />
                <CourseListSection />
                <MentorsSection />
                <CtaSection />
            </main>

            <Footer />
        </div>
    );
}

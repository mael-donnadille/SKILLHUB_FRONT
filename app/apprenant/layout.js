import LearnerSidebar from "@/components/learner/Sidebar";

export const metadata = {
    title: "SkillHub - Espace Apprenant",
    description: "Espace personnel apprenant SkillHub",
};

export default function LearnerLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <LearnerSidebar />

            <main className="ml-64 min-h-screen">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

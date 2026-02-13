import AdminSidebar from "@/components/admin/Sidebar";

export const metadata = {
    title: "SkillHub - Administration",
    description: "Panneau d'administration de SkillHub",
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { AdminSidebar } from "@/components/administrateur/Sidebar";
import { AdminTopbar } from "@/components/administrateur/Topbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // Regex pour matcher /administrateur/formations/[id]
    // Utilisation de [^/]+ pour capturer n'importe quel ID (numérique ou UUID)
    // Mais on exclut /administrateur/formations (la liste)
    const isDetailPage = /^\/administrateur\/formations\/[^/]+$/.test(pathname);

    if (isDetailPage) {
        return (
            <ProtectedRoute allowedRoles={['administrateur', 'ROLE_ADMIN']}>
                {/* On rend la page de détail sans le layout du panel */}
                {children}
            </ProtectedRoute>
        );
    }

    // Layout normal pour toutes les autres pages admin
    return (
        <ProtectedRoute allowedRoles={['administrateur', 'ROLE_ADMIN']}>
            <div className="min-h-screen bg-slate-50 flex font-sans">
                <AdminSidebar />
                <div className="flex-1 ml-64 flex flex-col min-w-0">
                    <AdminTopbar />
                    <main className="flex-1 p-8 overflow-y-auto">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}

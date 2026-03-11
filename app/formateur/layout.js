"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { FormateurSidebar } from "@/components/formateur/Sidebar";
import { FormateurTopbar } from "@/components/formateur/Topbar";

export default function FormateurLayout({ children }) {
    return (
        <ProtectedRoute allowedRoles={['formateur', 'ROLE_FORMATEUR']}>
            <div className="min-h-screen bg-slate-50 flex">
                <FormateurSidebar />
                <div className="flex-1 ml-64 flex flex-col min-w-0">
                    <FormateurTopbar />
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

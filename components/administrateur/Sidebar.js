"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Calendar,
    Settings,
    LogOut,
    Shield,
    Layers
} from "lucide-react";
import { motion } from "framer-motion";

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const navItems = [
        { href: "/administrateur", icon: LayoutDashboard, label: "Vue d'ensemble" },
        { href: "/administrateur/utilisateurs", icon: Users, label: "Utilisateurs" },
        { href: "/administrateur/formations", icon: BookOpen, label: "Formations" },
        { href: "/administrateur/categories", icon: Layers, label: "Catégories" },
        { href: "/administrateur/planning", icon: Calendar, label: "Planning" },
        { href: "/administrateur/parametres", icon: Settings, label: "Paramètres" },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300">
            {/* Logo area */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-white">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="font-bold text-xl text-primary tracking-tight">Skillhub.</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                <div className="mb-4 px-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Shield size={12} />
                        Administration
                    </p>
                </div>

                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== "/administrateur");
                    
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href} className="block relative mb-1">
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute inset-0 bg-primary/10 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? "text-primary"
                                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                                }`}>
                                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 mt-auto">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5 text-red-500" />
                    Se déconnecter
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;

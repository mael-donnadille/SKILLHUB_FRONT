"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    BookOpen,
    Calendar,
    Settings,
    LogOut
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Tableau de Bord", href: "/administrateur", icon: LayoutDashboard },
    { label: "Utilisateurs", href: "/administrateur/utilisateurs", icon: Users },
    { label: "Formations", href: "/administrateur/formations", icon: BookOpen },
    { label: "Planning", href: "/administrateur/planning", icon: Calendar },
    { label: "Paramètres", href: "/administrateur/parametres", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            <div className="p-6 border-b border-slate-100 flex justify-center">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        S
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-foreground">Skill<span className="text-primary">Hub</span></span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Menu Principal
                </div>
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                                }`}
                        >
                            <Icon size={20} className={isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"} />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                    <span className="font-medium">Déconnexion</span>
                </button>
            </div>
        </aside>
    );
}

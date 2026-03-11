"use client";

import { Bell, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function FormateurTopbar() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher une formation, un apprenant..."
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4 ml-4">
                <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <div className="h-8 border-l border-slate-200"></div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
                            {user?.prenom} {user?.nom}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">{user?.type || 'Formateur'}</p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default FormateurTopbar;

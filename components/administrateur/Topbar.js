"use client";

import { Bell, Search, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AdminTopbar() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 bg-opacity-90 backdrop-blur-sm shadow-sm">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher (utilisateur, formation...)"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary sm:text-sm transition-all"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4 ml-4">
                <div className="h-8 border-l border-slate-200"></div>

                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors">
                            {user?.prenom} {user?.nom}
                        </p>
                        <p className="text-xs text-slate-500 capitalize flex items-center justify-end gap-1">
                            <Shield size={10} className="text-emerald-500" />
                            Administrateur
                        </p>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-200 transition-all text-emerald-700 font-bold uppercase">
                        {(user?.prenom && user.prenom[0]) || 'A'}{(user?.nom && user.nom[0]) || ''}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminTopbar;

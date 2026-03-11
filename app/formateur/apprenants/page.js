"use client";

import { Users, Search } from "lucide-react";

export default function FormateurApprenantsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Apprenants</h1>
                    <p className="text-muted-foreground mt-1">Suivez la progression de vos étudiants inscrits.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un apprenant..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>
                </div>
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Aucun apprenant</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        La liste de vos apprenants s&apos;affichera ici une fois inscrits à vos sessions.
                    </p>
                </div>
            </div>
        </div>
    );
}

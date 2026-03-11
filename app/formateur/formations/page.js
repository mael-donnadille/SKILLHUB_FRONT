"use client";

import { BookOpen } from "lucide-react";

export default function FormateurFormationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Mes Formations</h1>
                    <p className="text-muted-foreground mt-1">Gérez le contenu de vos programmes d&apos;apprentissage.</p>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    + Créer une formation
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Aucune formation</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Vous n&apos;avez pas encore créé ou été assigné à une formation.
                </p>
            </div>
        </div>
    );
}

"use client";

import { Calendar } from "lucide-react";

export default function FormateurCalendrierPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Calendrier</h1>
                    <p className="text-muted-foreground mt-1">Gérez vos disponibilités et vos sessions de formation.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center h-[500px] flex flex-col justify-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Calendrier vide</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Aucune session n&apos;est planifiée. Ajoutez une nouvelle session pour commencer.
                </p>
                <div className="mt-6">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Ajouter un événement
                    </button>
                </div>
            </div>
        </div>
    );
}

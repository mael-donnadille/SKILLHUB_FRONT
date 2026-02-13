"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { getMyFormations } from "@/services/mockLearnerService";

export default function MyFormationsPage() {
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        getMyFormations().then(setFormations);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Mes Formations</h1>
                <Link href="/formations" className="bg-white border border-slate-200 text-foreground px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium">
                    Parcourir le catalogue
                </Link>
            </div>

            <p className="text-muted-foreground">Voici les formations pour lesquelles vous avez planifié un atelier.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formations.map((formation) => (
                    <div key={formation.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                        <div className="h-32 bg-slate-200 relative">
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                Image Formation
                            </div>
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-foreground shadow-sm">
                                {formation.category}
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                {formation.titre}
                            </h3>

                            <div className="mt-auto space-y-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-muted-foreground mb-1 uppercase font-bold tracking-wider">Prochain Atelier</p>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <Calendar size={14} className="text-primary" />
                                        {new Date(formation.nextWorkshopDate).toLocaleDateString()}
                                    </div>
                                </div>

                                <Link href="/apprenant/mon-planning" className="w-full flex items-center justify-center gap-2 bg-white text-foreground border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all font-medium text-sm">
                                    Voir mon planning
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {formations.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <p className="text-lg text-muted-foreground mb-6">Vous n'avez aucun atelier planifié.</p>
                    <Link href="/formations" className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        S'inscrire à un atelier
                    </Link>
                </div>
            )}
        </div>
    );
}

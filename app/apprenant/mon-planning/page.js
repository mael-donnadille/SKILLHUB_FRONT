"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Info } from "lucide-react";
import { getLearnerWorkshops } from "@/services/mockLearnerService";

export default function MySchedulePage() {
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        getLearnerWorkshops().then(setWorkshops);
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Group workshops by month for better display
    const groupedWorkshops = workshops.reduce((acc, workshop) => {
        const month = new Date(workshop.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        if (!acc[month]) acc[month] = [];
        acc[month].push(workshop);
        return acc;
    }, {});

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-foreground">Mon Planning</h1>

            {Object.keys(groupedWorkshops).length > 0 ? (
                <div className="space-y-8">
                    {Object.entries(groupedWorkshops).map(([month, monthWorkshops]) => (
                        <div key={month}>
                            <h2 className="text-lg font-bold text-muted-foreground capitalize mb-4 sticky top-0 bg-slate-50 py-2 z-10">{month}</h2>
                            <div className="space-y-4">
                                {monthWorkshops.map((workshop) => (
                                    <div key={workshop.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">

                                        {/* Date Box */}
                                        <div className="flex flex-col items-center justify-center w-20 h-20 bg-primary/5 text-primary rounded-2xl border border-primary/10 flex-shrink-0">
                                            <span className="text-2xl font-bold">{new Date(workshop.date).getDate()}</span>
                                            <span className="text-xs uppercase font-semibold">{new Date(workshop.date).toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-foreground mb-2">{workshop.titre}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Clock size={16} className="text-slate-400" />
                                                    {workshop.horaire}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-slate-400" />
                                                    {workshop.salle}
                                                </div>
                                                <div className="flex items-center gap-2 sm:col-span-2">
                                                    <Info size={16} className="text-slate-400" />
                                                    Animé par {workshop.formateur}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <div className="flex items-center justify-end">
                                            <button className="w-full md:w-auto px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                                Détails/Annuler
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                    <Calendar size={48} className="mx-auto mb-4 text-slate-200" />
                    <p className="text-lg text-muted-foreground mb-2">Aucun atelier prévu.</p>
                    <p className="text-sm text-slate-400">Consultez vos formations pour voir les ateliers disponibles.</p>
                </div>
            )}
        </div>
    );
}

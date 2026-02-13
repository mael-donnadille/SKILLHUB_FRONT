"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Clock, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { getWorkshops } from "@/services/mockAdminService";

export default function PlanningPage() {
    const [workshops, setWorkshops] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        getWorkshops().then(setWorkshops);
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Planning des Ateliers</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                    <Plus size={18} />
                    Planifier un atelier
                </button>
            </div>

            {/* Month Navigation (Visual only for now) */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ChevronLeft size={20} className="text-slate-500" />
                </button>
                <h2 className="text-lg font-semibold text-foreground capitalize">
                    {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </h2>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ChevronRight size={20} className="text-slate-500" />
                </button>
            </div>

            {/* Workshops List */}
            <div className="space-y-4">
                {workshops.map((workshop) => (
                    <div key={workshop.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl border border-blue-100">
                                    <span className="text-xl font-bold">{new Date(workshop.date).getDate()}</span>
                                    <span className="text-xs uppercase font-semibold">{new Date(workshop.date).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{workshop.titre}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            {workshop.horaire}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} />
                                            {workshop.salle}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Users size={16} className="text-slate-400" />
                                        <span className={workshop.inscrit >= workshop.places ? "text-red-500" : "text-foreground"}>
                                            {workshop.inscrit} / {workshop.places} inscrits
                                        </span>
                                    </div>
                                    <div className="w-32 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${workshop.inscrit >= workshop.places ? "bg-red-500" : "bg-emerald-500"}`}
                                            style={{ width: `${(workshop.inscrit / workshop.places) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                    Gérer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {workshops.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-slate-100">
                        <Calendar size={48} className="mx-auto mb-4 text-slate-200" />
                        <p>Aucun atelier prévu pour ce mois-ci.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

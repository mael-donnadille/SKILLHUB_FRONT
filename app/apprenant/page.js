"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, Award, Clock, ArrowRight, CreditCard, CheckCircle } from "lucide-react";
import { getLearnerProfile, getMyFormations, getLearnerWorkshops } from "@/services/mockLearnerService";

export default function LearnerDashboardPage() {
    const [profile, setProfile] = useState(null);
    const [formations, setFormations] = useState([]);
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        getLearnerProfile().then(setProfile);
        getMyFormations().then(setFormations);
        getLearnerWorkshops().then(setWorkshops);
    }, []);

    if (!profile) return <div className="flex justify-center items-center h-64">Chargement...</div>;

    const nextWorkshop = workshops[0];

    const getDaysRemaining = (endDate) => {
        const end = new Date(endDate);
        const now = new Date();
        const diff = end - now;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Bonjour, {profile.prenom} 👋</h1>
                    <p className="text-muted-foreground mt-1">Prêt pour votre prochain atelier ?</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">{profile.prenom} {profile.nom}</p>
                        <p className="text-xs text-muted-foreground capitalize">{profile.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        {profile.avatar}
                    </div>
                </div>
            </div>

            {/* Quick Stats / Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Subscription Status */}
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                            <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-emerald-100 text-sm font-medium">Abonnement {profile.subscription.plan}</p>
                            <p className="text-xl font-bold">Actif</p>
                        </div>
                    </div>
                    <div className="text-sm text-emerald-50 mt-2 flex items-center gap-2">
                        <Clock size={14} />
                        Expire dans {getDaysRemaining(profile.subscription.endDate)} jours
                    </div>
                </div>

                {/* Next Workshop */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-orange-50 text-orange-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Prochain Atelier</p>
                            <p className="text-lg font-bold text-foreground truncate max-w-[150px]">
                                {nextWorkshop ? new Date(nextWorkshop.date).toLocaleDateString() : "Aucun"}
                            </p>
                        </div>
                    </div>
                    <Link href="/apprenant/mon-planning" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Voir le planning <ArrowRight size={14} />
                    </Link>
                </div>

                {/* Formations Count */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm font-medium">Formations Suivies</p>
                            <p className="text-2xl font-bold text-foreground">{formations.length}</p>
                        </div>
                    </div>
                    <Link href="/apprenant/mes-formations" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Voir mes formations <ArrowRight size={14} />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Next Workshop Detail */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Votre prochain atelier</h2>
                    {nextWorkshop ? (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                            <div className="w-full sm:w-24 h-24 bg-primary/5 text-primary rounded-xl flex flex-col items-center justify-center flex-shrink-0 border border-primary/10">
                                <span className="text-3xl font-bold">{new Date(nextWorkshop.date).getDate()}</span>
                                <span className="text-sm uppercase font-bold">{new Date(nextWorkshop.date).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '')}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                                        Présentiel
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">{nextWorkshop.titre}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {nextWorkshop.horaire}</span>
                                    <span className="flex items-center gap-1"><ArrowRight size={14} /> Salle {nextWorkshop.salle}</span>
                                </div>
                                <div className="mt-4 flex gap-3">
                                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                        Voir les détails
                                    </button>
                                    <button className="border border-slate-200 text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                                        Contacter le formateur
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl p-8 text-center border border-slate-100">
                            <p className="text-muted-foreground mb-4">Aucun atelier prévu prochainement.</p>
                            <Link href="/formations" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                S'inscrire à un atelier
                            </Link>
                        </div>
                    )}
                </div>

                {/* Subscription Info Card */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-foreground">Mon Abonnement</h2>
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-muted-foreground">Plan actuel</span>
                            <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{profile.subscription.plan}</span>
                        </div>
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Date de début</span>
                                <span className="font-medium text-foreground">{new Date(profile.subscription.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Date de fin</span>
                                <span className="font-medium text-foreground">{new Date(profile.subscription.endDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <button className="w-full border border-slate-200 text-foreground py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                            Gérer mon abonnement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

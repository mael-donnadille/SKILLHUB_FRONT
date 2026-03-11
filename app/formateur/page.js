"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getFormations } from "@/services/formationService";
import {
    Users,
    BookOpen,
    TrendingUp,
    Calendar,
    ArrowRight,
    MessageSquare,
    AlertCircle,
    Star
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-w-0">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 shrink-0`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 ${trend.startsWith('+')
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-muted-foreground bg-slate-50'
                    }`}>
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-muted-foreground text-sm font-medium mb-1 truncate">{title}</h3>
        <p className="text-3xl font-bold text-foreground truncate">{value}</p>
    </div>
);

export default function FormateurDashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState({
        totalApprenants: "128",
        mesFormations: "-",
        tauxReussite: "94%",
        heuresDispensees: "140h"
    });

    useEffect(() => {
        const fetchRealStats = async () => {
            if (!user) return;
            try {
                const formations = await getFormations();
                const myFormationsCount = formations.filter(f => f.formateur?.id === user.id).length;
                setStats(prev => ({ ...prev, mesFormations: myFormationsCount.toString() }));
            } catch (error) {
                console.error("Error fetching formations for formateur:", error);
            }
        };
        fetchRealStats();
    }, [user]);

    const upcomingSessions = [
        {
            id: 1,
            title: "Introduction à React",
            date: new Date(2024, 2, 10, 9, 30),
            students: 24,
            salle: "Virtuelle A",
            type: "Visioconférence"
        },
        {
            id: 2,
            title: "Atelier UI/UX Design",
            date: new Date(2024, 2, 12, 14, 0),
            students: 15,
            salle: "B204",
            type: "Présentiel"
        },
        {
            id: 3,
            title: "Architecture Backend",
            date: new Date(2024, 2, 15, 10, 0),
            students: 30,
            salle: "Virtuelle B",
            type: "Visioconférence"
        }
    ];

    const activities = [
        {
            id: 1,
            type: 'MODULE',
            title: 'Nouveau module publié',
            detail: 'Introduction aux Hooks (React)',
            date: 'Aujourd\'hui',
            time: 'Il y a 2h'
        },
        {
            id: 2,
            type: 'INSCRIPTION',
            title: 'Nouvelles inscriptions',
            detail: '3 apprenants ont rejoint Architecture Backend',
            date: 'Aujourd\'hui',
            time: '09:15'
        },
        {
            id: 3,
            type: 'MESSAGE',
            title: 'Nouveau message',
            detail: 'Question de Sophie M. sur le projet',
            date: 'Hier',
            time: '16:30'
        }
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header matching other dashboards */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Tableau de Bord</h1>
                    <p className="text-muted-foreground mt-1">Bonjour {user?.prenom}, voici votre activité de formateur.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">{user?.prenom} {user?.nom}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user?.type || 'Formateur'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                        {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Apprenants"
                    value={stats.totalApprenants}
                    icon={Users}
                    color="bg-blue-500"
                    trend="+12% ce mois"
                />
                <StatCard
                    title="Mes Formations"
                    value={stats.mesFormations}
                    icon={BookOpen}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Taux de Réussite"
                    value={stats.tauxReussite}
                    icon={TrendingUp}
                    color="bg-emerald-500"
                    trend="+2.4%"
                />
                <StatCard
                    title="Heures Dispensées"
                    value={stats.heuresDispensees}
                    icon={Calendar}
                    color="bg-orange-500"
                    trend="ce mois"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Prochaines sessions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-foreground">Prochaines sessions</h2>
                            <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                                Voir tout l&apos;agenda
                            </button>
                        </div>

                        <div className="space-y-4">
                            {upcomingSessions.map((session) => (
                                <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/20 hover:shadow-sm transition-all group">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="p-3 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-primary/5 group-hover:text-primary transition-colors shrink-0">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold text-foreground truncate">{session.title}</h3>
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${session.type === 'Présentiel'
                                                    ? 'bg-orange-100 text-orange-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                                                    {session.type}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1 font-medium text-slate-700">
                                                    {format(session.date, 'EEEE d MMMM', { locale: fr })} à {format(session.date, 'HH:mm')}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {session.students} apprenants
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0">
                                        <button className="flex-1 sm:flex-none justify-center bg-slate-50 text-slate-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                                            Détails
                                        </button>
                                        <button className="flex-1 sm:flex-none justify-center bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                            Lancer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Area - 1/3 width */}
                <div className="space-y-8">
                    {/* Activity Feed */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-xl font-bold text-foreground mb-6">Activité Récente</h2>
                        <div className="space-y-4">
                            {activities.map((activity) => {
                                let Icon = BookOpen;
                                let color = 'text-blue-500 bg-blue-50';

                                if (activity.type === 'INSCRIPTION') {
                                    Icon = Users;
                                    color = 'text-emerald-500 bg-emerald-50';
                                } else if (activity.type === 'MESSAGE') {
                                    Icon = MessageSquare;
                                    color = 'text-violet-500 bg-violet-50';
                                }

                                return (
                                    <div key={activity.id} className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className={`p-2 rounded-full shrink-0 ${color}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-semibold text-foreground text-sm truncate">{activity.title}</h4>
                                                <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                                                    {activity.time}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                                {activity.detail}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button className="w-full mt-4 text-center px-4 py-2 text-sm font-medium text-primary hover:bg-slate-50 rounded-lg transition-colors">
                            Voir toute l&apos;activité
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                        <h2 className="text-xl font-bold text-foreground mb-6">Actions Rapides</h2>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors flex items-center justify-between group">
                                <span>+ Créer une formation</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg bg-orange-50 text-orange-700 font-medium hover:bg-orange-100 transition-colors flex items-center justify-between group">
                                <span>+ Planifier une session</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                            <button className="w-full text-left px-4 py-3 rounded-lg bg-violet-50 text-violet-700 font-medium hover:bg-violet-100 transition-colors flex items-center justify-between group">
                                <span>💬 Envoyer un message</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Calendar, AlertCircle } from "lucide-react";
import { MOCK_DATA } from "@/services/mockAdminService";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-muted-foreground text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
);

export default function AdminDashboardPage() {
    const [stats, setStats] = useState(MOCK_DATA.stats);
    const [activities, setActivities] = useState(MOCK_DATA.recentActivity);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Tableau de Bord</h1>
                    <p className="text-muted-foreground mt-1">Bienvenue sur votre espace d&apos;administration.</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground bg-white px-4 py-2 rounded-full border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    En ligne
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Utilisateurs Totaux"
                    value={stats.totalUsers}
                    icon={Users}
                    color="bg-blue-500"
                    trend="+12% cette semaine"
                />
                <StatCard
                    title="Formations Actives"
                    value={stats.activeFormations}
                    icon={BookOpen}
                    color="bg-purple-500"
                />
                <StatCard
                    title="Ateliers à venir"
                    value={stats.upcomingWorkshops}
                    icon={Calendar}
                    color="bg-orange-500"
                />
                <StatCard
                    title="Validations en attente"
                    value={stats.pendingValidations}
                    icon={AlertCircle}
                    color="bg-red-500"
                />
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Activité Récente</h2>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="p-2 rounded-full bg-slate-100 text-slate-500">
                                    {activity.type === 'INSCRIPTION' ? <BookOpen size={18} /> : <AlertCircle size={18} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-foreground">{activity.user}</h4>
                                        <span className="text-xs text-muted-foreground">
                                            {activity.date.split('-').reverse().join('/')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {activity.type === 'INSCRIPTION' ? 'C\'est inscrit à ' : 'A reçu une évaluation : '}
                                        <span className="font-medium text-foreground">{activity.detail}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions / Notifications */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Actions Rapides</h2>
                    <div className="space-y-3">
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition-colors">
                            + Ajouter une formation
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 transition-colors">
                            + Inscrire un utilisateur
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-lg bg-purple-50 text-purple-700 font-medium hover:bg-purple-100 transition-colors">
                            + Planifier un atelier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

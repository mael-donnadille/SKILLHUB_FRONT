"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Layers, AlertCircle, Plus, UserPlus, CalendarPlus, TrendingUp, ArrowRight, Shield } from "lucide-react";
import { getFormations } from "@/services/formationService";
import { getUsers } from "@/services/userService";
import { getCategories } from "@/services/categoryService";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const StatCard = ({ title, value, icon: Icon, color, subtext, trend, href }) => {
    const CardContent = (
        <div className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group h-full ${href ? 'cursor-pointer hover:border-primary/30' : ''}`}>
            <div className="flex justify-between items-start">
                <div className="space-y-4 w-full">
                    <div className={`flex justify-between items-start w-full`}>
                        <div className={`p-3 rounded-xl w-fit ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
                        </div>
                        {href && (
                            <ArrowRight size={16} className="text-slate-300 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-800">{value}</span>
                            {trend && (
                                <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    <TrendingUp size={12} className="mr-1" /> {trend}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {subtext && <p className="text-xs text-slate-400 mt-4 border-t border-slate-50 pt-3">{subtext}</p>}
        </div>
    );

    if (href) {
        return <Link href={href} className="block h-full">{CardContent}</Link>;
    }
    
    return CardContent;
};

// Composant Action Rapide Compact
const QuickActionCard = ({ title, icon: Icon, color, href }) => {
    const CardContent = (
        <div className="flex flex-col items-center justify-center p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-primary/30 hover:bg-slate-50 transition-all duration-300 w-full group h-full cursor-pointer">
            <div className={`mb-2 p-2 rounded-lg ${color} bg-opacity-10 text-primary group-hover:scale-110 transition-transform`}>
                <Icon size={20} className={color.replace('bg-', 'text-')} />
            </div>
            <h3 className="text-xs font-semibold text-slate-700 text-center">{title}</h3>
        </div>
    );

    if (href) {
        return <Link href={href} className="block h-full">{CardContent}</Link>;
    }
    
    return CardContent;
};

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const { token } = useAuth();
    
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeFormations: 0,
        totalCategories: 0,
        pendingValidations: 0
    });
    
    const [latestUsers, setLatestUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;

            try {
                const [formationsData, usersData, categoriesData] = await Promise.all([
                    getFormations().catch(() => []),
                    getUsers(token).catch(() => []),
                    getCategories().catch(() => [])
                ]);

                const formations = Array.isArray(formationsData) ? formationsData : (formationsData['hydra:member'] || formationsData.data || []);
                const users = Array.isArray(usersData) ? usersData : (usersData['hydra:member'] || usersData.data || []);
                const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData['hydra:member'] || categoriesData.data || []);

                const activeFormationsCount = formations.length;
                
                setStats({
                    totalUsers: users.length,
                    activeFormations: activeFormationsCount,
                    totalCategories: categories.length,
                    pendingValidations: 0 // Idéalement, faire un appel fetch pour compter les formations EN_ATTENTE
                });

                // Récupérer les 5 derniers utilisateurs pour le tableau
                const recentUsers = users
                    .sort((a, b) => (b.id - a.id))
                    .slice(0, 5);
                
                setLatestUsers(recentUsers);

            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [token]);

    const currentDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                        <div>
                            <p className="text-slate-300 text-sm mb-2 uppercase tracking-wider font-semibold">{currentDate}</p>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Bonjour, {user?.prenom} 👋</h1>
                            <p className="text-slate-400">Voici ce qu&apos;il se passe sur votre plateforme aujourd&apos;hui.</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-sm font-medium">Système En Ligne</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Utilisateurs Totaux"
                    value={stats.totalUsers}
                    icon={Users}
                    color="bg-blue-200"
                    trend="+5%"
                    subtext="Gérer les utilisateurs"
                    href="/administrateur/utilisateurs"
                />
                <StatCard
                    title="Formations Actives"
                    value={stats.activeFormations}
                    icon={BookOpen}
                    color="bg-purple-200"
                    subtext="Catalogue de cours"
                    href="/administrateur/formations"
                />
                <StatCard
                    title="Catégories"
                    value={stats.totalCategories}
                    icon={Layers}
                    color="bg-orange-200"
                    subtext="Gérer les thématiques"
                    href="/administrateur/categories"
                />
                <StatCard
                    title="Actions Requises"
                    value={stats.pendingValidations}
                    icon={AlertCircle}
                    color="bg-yellow-200"
                    subtext="Validations en attente"
                    href="/administrateur/formations"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Recent Users Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Dernières Inscriptions</h2>
                                <p className="text-sm text-slate-500">Les 5 derniers utilisateurs ayant rejoint SkillHub.</p>
                            </div>
                            <Link href="/administrateur/utilisateurs" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                                Voir tout <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                                    <tr>
                                        <th className="px-6 py-4">Utilisateur</th>
                                        <th className="px-6 py-4">Rôle</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {latestUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase border border-slate-200">
                                                        {(user.prenom && user.prenom[0]) || 'U'}{(user.nom && user.nom[0]) || ''}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800">{user.prenom} {user.nom}</p>
                                                        <p className="text-xs text-slate-400">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                                                    {user.role || user.type || 'Utilisateur'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500">
                                                {user.date_creation ? new Date(user.date_creation).toLocaleDateString() : 'Récemment'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    Actif
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {latestUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                                                Aucun utilisateur récent trouvé.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Quick Actions & Status */}
                <div className="space-y-6">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-base font-bold text-slate-800 mb-4">Actions Rapides</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickActionCard 
                                title="Gérer Formations" 
                                icon={Plus} 
                                color="bg-blue-200"
                                href="/administrateur/formations"
                            />
                            <QuickActionCard 
                                title="Inscription"
                                icon={UserPlus} 
                                color="bg-emerald-200"
                                href="/administrateur/utilisateurs"
                            />
                            <QuickActionCard 
                                title="Planning" 
                                icon={CalendarPlus} 
                                color="bg-orange-200"
                                href="/administrateur/planning"
                            />
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <Shield className="text-emerald-400" size={24} />
                                <h3 className="font-semibold">Sécurité</h3>
                            </div>
                            <p className="text-slate-300 text-sm mb-4">
                                Sauvegarde : 04:00 AM.
                            </p>
                            <button className="text-xs font-medium bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg w-full text-center border border-white/10">
                                Voir les logs
                            </button>
                        </div>
                        {/* Decorative */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

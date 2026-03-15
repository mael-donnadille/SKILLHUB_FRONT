"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
    getAdminFormation, 
    validateFormation, 
    rejectFormation 
} from "@/services/formationService";
import { getAteliers } from "@/services/atelierService";
import { 
    Calendar, User, Award, ArrowLeft, BookOpen, 
    Code, Palette, Database, TrendingUp, Languages, Users, Target, 
    CheckCircle, XCircle, Shield, AlertTriangle, Clock
} from "lucide-react";
import Link from "next/link";

const CATEGORY_CONFIG = {
    "Développement Web": {
        icon: Code,
        gradient: "from-blue-600 to-cyan-600",
    },
    "Design Graphique": {
        icon: Palette,
        gradient: "from-purple-600 to-pink-600",
    },
    "Marketing Digital": {
        icon: TrendingUp,
        gradient: "from-orange-600 to-amber-600",
    },
    "Gestion de Projet": {
        icon: Target,
        gradient: "from-indigo-600 to-blue-600",
    },
    "Data Science": {
        icon: Database,
        gradient: "from-emerald-600 to-teal-600",
    },
    "Langues": {
        icon: Languages,
        gradient: "from-rose-600 to-red-600",
    },
    "Soft Skills": {
        icon: Users,
        gradient: "from-violet-600 to-purple-600",
    }
};

export default function AdminFormationDetailsPage() {
    const { id } = useParams();
    const { token } = useAuth();
    const router = useRouter();
    
    const [formation, setFormation] = useState(null);
    const [ateliers, setAteliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) return;

        const loadData = async () => {
            try {
                // On peut charger la formation et tous les ateliers en parallèle
                const [formationData, allAteliersData] = await Promise.all([
                    getAdminFormation(id, token),
                    getAteliers(token).catch(() => [])
                ]);

                if (!formationData) throw new Error("Formation introuvable");
                setFormation(formationData);

                // Récupération des ateliers spécifiques à cette formation
                const normalizedAteliers = Array.isArray(allAteliersData) ? allAteliersData : (allAteliersData['hydra:member'] || allAteliersData.data || []);
                const formationAteliers = normalizedAteliers.filter(a => {
                    if (!a.formation) return false;
                    const aFormId = typeof a.formation === 'object' ? a.formation.id : String(a.formation).split('/').pop();
                    // eslint-disable-next-line eqeqeq
                    return aFormId == id;
                });

                // Tri des ateliers par date croissante
                formationAteliers.sort((a, b) => new Date(a.date_atelier) - new Date(b.date_atelier));
                setAteliers(formationAteliers);

            } catch (err) {
                console.error(err);
                setError("Impossible de charger la formation.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [id, token]);

    const handleValidate = async () => {
        if (confirm("Êtes-vous sûr de vouloir valider cette formation ? Elle sera visible par tous les apprenants.")) {
            try {
                await validateFormation(id, token);
                alert("Formation validée avec succès !");
                router.push("/administrateur/formations");
            } catch (e) {
                console.error(e);
                alert("Erreur lors de la validation.");
            }
        }
    };

    const handleReject = async () => {
        if (confirm("Êtes-vous sûr de vouloir rejeter cette formation ?")) {
            try {
                await rejectFormation(id, token);
                alert("Formation rejetée.");
                router.push("/administrateur/formations");
            } catch (e) {
                console.error(e);
                alert("Erreur lors du rejet.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !formation) {
        return <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">{error || "Formation non trouvée"}</div>;
    }

    const formatDateTime = (dateString, heureDebut, heureFin) => {
        if (!dateString) return "Date à définir";
        const optionsDate = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const datePart = new Date(dateString).toLocaleDateString('fr-FR', optionsDate);
        
        let timePart = "";
        if (heureDebut) {
            // Formater si l'heure est au format "14:00:00" ou date ISO
            const formatTime = (timeStr) => {
                if (!timeStr) return "";
                if (timeStr.includes('T')) {
                    return new Date(timeStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                }
                return timeStr.substring(0, 5); // ex: "14:00"
            };
            
            timePart = ` de ${formatTime(heureDebut)}`;
            if (heureFin) {
                timePart += ` à ${formatTime(heureFin)}`;
            }
        }
        
        return `${datePart.charAt(0).toUpperCase() + datePart.slice(1)}${timePart}`;
    };

    // Récupérer la configuration de la catégorie
    const catName = formation.categorie?.nom || formation.categorie?.libelle || "Autre";
    const config = CATEGORY_CONFIG[catName] || {
        icon: BookOpen,
        gradient: "from-slate-600 to-slate-500"
    };

    const IconComponent = config.icon;

    const getStatusInfo = (status) => {
        switch (status) {
            case 'VALIDE':
            case 'PUBLIEE':
                return { label: "Validée & Publiée", color: "bg-emerald-500", icon: CheckCircle };
            case 'EN_ATTENTE':
                return { label: "En attente de validation", color: "bg-amber-500", icon: AlertTriangle };
            case 'REFUSE':
                return { label: "Refusée", color: "bg-red-500", icon: XCircle };
            default:
                return { label: status, color: "bg-slate-500", icon: Shield };
        }
    };

    const statusInfo = getStatusInfo(formation.statut || 'EN_ATTENTE');
    const StatusIcon = statusInfo.icon;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            {/* Hero Section */}
            <div className={`relative bg-gradient-to-br ${config.gradient} overflow-hidden pb-12 pt-8 px-8`}>
                {/* Éléments décoratifs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Bouton retour */}
                    <Link
                        href="/administrateur/formations"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all duration-300 mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Retour au catalogue admin</span>
                    </Link>

                    {/* Contenu du hero */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Icône de la catégorie */}
                        <div className="p-8 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl">
                            <IconComponent size={80} className="text-white" strokeWidth={1.5} />
                        </div>

                        {/* Informations */}
                        <div className="flex-1 text-center md:text-left">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                                <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                    {catName}
                                </span>
                                <span className={`${statusInfo.color} text-white border border-white/30 px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2`}>
                                    <StatusIcon size={14} />
                                    {statusInfo.label}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                                {formation.titre || formation.libelle}
                            </h1>

                            {/* Métadonnées */}
                            <div className="flex flex-wrap gap-6 text-white/90 text-sm md:text-base mb-6 justify-center md:justify-start">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <Calendar size={20} />
                                    <span className="font-medium">
                                        {ateliers.length > 0 ? `${ateliers.length} session(s) prévue(s)` : "Aucune session planifiée"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <User size={20} />
                                    <span className="font-medium">
                                        {formation.formateur ? `${formation.formateur.prenom || ''} ${formation.formateur.nom || ''}` : 'Expert SkillHub'}
                                    </span>
                                </div>
                                {formation.annee?.libelle && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Award size={20} />
                                        <span className="font-medium">{formation.annee.libelle}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section du contenu */}
            <main className="grow py-12 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contenu principal */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description détaillée */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    Contenu de la formation
                                </h2>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                                    <p className="text-lg whitespace-pre-wrap">
                                        {formation.description || "Aucune description fournie pour cette formation."}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Liste des ateliers (Sessions) */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
                                        <Calendar size={24} className="text-white" />
                                    </div>
                                    Sessions planifiées
                                </h2>
                                
                                {ateliers.length > 0 ? (
                                    <div className="space-y-4">
                                        {ateliers.map((atelier, index) => (
                                            <div key={atelier.id || index} className="flex items-start md:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors flex-col md:flex-row gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm text-slate-500">
                                                        <Clock size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 capitalize">
                                                            {formatDateTime(atelier.date_atelier, atelier.heure_debut, atelier.heure_fin)}
                                                        </p>
                                                        {atelier.salle?.nom && (
                                                            <p className="text-sm text-slate-500 mt-1">{atelier.salle.nom}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* On pourrait afficher le nombre d'inscrits si c'était renvoyé par l'API */}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                        Aucun atelier (session) n&apos;est encore planifié pour cette formation.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar d'actions Admin */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <Shield className="text-emerald-500" />
                                    Administration
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        <p className="text-sm text-slate-500 mb-1">Statut actuel</p>
                                        <p className={`font-bold ${statusInfo.color.replace('bg-', 'text-')}`}>
                                            {statusInfo.label}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                                        <span className="text-slate-600 text-sm">Formateur</span>
                                        <span className="font-medium text-slate-800 text-right">
                                            {formation.formateur ? `${formation.formateur.prenom} ${formation.formateur.nom}` : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-slate-600 text-sm flex items-center gap-1.5"><Calendar size={14} /> Ateliers</span>
                                        <span className="font-medium text-slate-800">
                                            {ateliers.length}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-100">
                                    {(!formation.statut || formation.statut === 'EN_ATTENTE') ? (
                                        <>
                                            <button 
                                                onClick={handleValidate}
                                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle size={20} />
                                                Valider la formation
                                            </button>
                                            <button 
                                                onClick={handleReject}
                                                className="w-full bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                                            >
                                                <XCircle size={20} />
                                                Rejeter
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center text-sm text-slate-500 italic py-2">
                                            Cette formation a déjà été traitée.
                                        </div>
                                    )}
                                    
                                    {formation.statut === 'VALIDE' && (
                                        <button 
                                            onClick={handleReject}
                                            className="w-full text-red-500 hover:bg-red-50 font-medium py-2 rounded-lg transition-colors text-sm"
                                        >
                                            Révoquer la validation
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

import { getFormation } from "@/services/formationService";
import BackButton from "@/components/ui/BackButton";
import { notFound } from "next/navigation";
import { Calendar, User, Award, ArrowLeft, BookOpen, Code, Palette, Database, TrendingUp, Languages, Users, Target, Clock } from "lucide-react";
import Link from "next/link";

// Configuration précise pour chaque catégorie (cohérent avec CategoryCard et page catégorie)
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

export default async function FormationDetailsPage({ params }) {
    const { id } = await params;
    const formation = await getFormation(id);

    if (!formation) {
        notFound();
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Récupérer la configuration de la catégorie
    const config = CATEGORY_CONFIG[formation.categorie?.nom] || {
        icon: BookOpen,
        gradient: "from-slate-600 to-slate-500"
    };

    const IconComponent = config.icon;

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            {/* Hero Section avec gradient de la catégorie */}
            <div className={`relative bg-gradient-to-br ${config.gradient} overflow-hidden`}>
                {/* Éléments décoratifs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Bouton retour premium */}
                    <Link
                        href="/formations"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all duration-300 mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Retour aux formations</span>
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
                                    {formation.categorie?.nom}
                                </span>
                                {formation.statut === "VALIDE" && (
                                    <span className="bg-green-500/30 backdrop-blur-md text-white border border-green-300/50 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Ouvert aux inscriptions
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
                                {formation.titre}
                            </h1>

                            {/* Métadonnées */}
                            <div className="flex flex-wrap gap-6 text-white/90 text-sm md:text-base mb-6 justify-center md:justify-start">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <Calendar size={20} />
                                    <span className="font-medium">{formatDate(formation.dateProposition)}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                    <User size={20} />
                                    <span className="font-medium">
                                        {formation.formateur ? `${formation.formateur.prenom} ${formation.formateur.nom}` : 'Expert SkillHub'}
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
            <main className="grow py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Contenu principal */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description détaillée */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${config.gradient}`}>
                                        <BookOpen size={24} className="text-white" />
                                    </div>
                                    Description Détaillée
                                </h2>
                                <div className="prose prose-slate max-w-none text-secondary leading-relaxed">
                                    <p className="text-lg">
                                        {formation.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 sticky top-24">
                                <h3 className="text-2xl font-bold text-primary mb-6">Détails pratiques</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                        <span className="text-slate-600 flex items-center gap-2 font-medium">
                                            <Calendar size={18} className="text-primary" />
                                            Date
                                        </span>
                                        <span className="font-bold text-primary">{formatDate(formation.dateProposition)}</span>
                                    </div>
                                    {formation.annee?.libelle && (
                                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                            <span className="text-slate-600 flex items-center gap-2 font-medium">
                                                <Award size={18} className="text-primary" />
                                                Année
                                            </span>
                                            <span className="font-bold text-primary">{formation.annee.libelle}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-slate-600 flex items-center gap-2 font-medium">
                                            <User size={18} className="text-primary" />
                                            Formateur
                                        </span>
                                        <span className="font-bold text-primary text-right">
                                            {formation.formateur ? `${formation.formateur.prenom} ${formation.formateur.nom}` : 'Expert'}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-[#1a365d] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center gap-2">
                                        <BookOpen size={20} />
                                        S'inscrire maintenant
                                    </button>
                                    <p className="text-center text-xs text-slate-500 font-medium">
                                        Places limitées - Inscription sécurisée
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

import Link from "next/link";
import { Calendar, User, Code, Palette, Database, TrendingUp, Languages, Users, Target, ArrowRight } from "lucide-react";

// Configuration précise pour chaque catégorie
const CATEGORY_CONFIG = {
    "Développement Web": {
        icon: Code,
        accentColor: "border-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        iconBg: "bg-blue-100",
    },
    "Design Graphique": {
        icon: Palette,
        accentColor: "border-purple-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        iconBg: "bg-purple-100",
    },
    "Marketing Digital": {
        icon: TrendingUp,
        accentColor: "border-orange-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        iconBg: "bg-orange-100",
    },
    "Gestion de Projet": {
        icon: Target,
        accentColor: "border-indigo-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-700",
        iconBg: "bg-indigo-100",
    },
    "Data Science": {
        icon: Database,
        accentColor: "border-emerald-500",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-700",
        iconBg: "bg-emerald-100",
    },
    "Langues": {
        icon: Languages,
        accentColor: "border-rose-500",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        iconBg: "bg-rose-100",
    },
    "Soft Skills": {
        icon: Users,
        accentColor: "border-violet-500",
        bgColor: "bg-violet-50",
        textColor: "text-violet-700",
        iconBg: "bg-violet-100",
    }
};

export default function CourseCard({ course }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Récupérer la configuration de la catégorie
    const config = CATEGORY_CONFIG[course.categorie?.nom] || {
        icon: Code,
        accentColor: "border-slate-500",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700",
        iconBg: "bg-slate-100",
    };

    const IconComponent = config.icon;

    return (
        <Link href={`/formations/${course.id}`}>
            <div className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col overflow-hidden border-l-4 ${config.accentColor}`}>

                {/* Header avec icône et badge */}
                <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                        {/* Icône de catégorie */}
                        <div className={`p-3 rounded-xl ${config.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent size={24} className={config.textColor} strokeWidth={2} />
                        </div>

                        {/* Badge statut */}
                        {course.statut === "VALIDE" && (
                            <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
                                Ouvert
                            </span>
                        )}
                    </div>

                    {/* Catégorie */}
                    <div className="mb-3">
                        <span className={`text-xs font-bold ${config.textColor} uppercase tracking-wide`}>
                            {course.categorie?.nom}
                        </span>
                    </div>

                    {/* Titre */}
                    <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {course.titre}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {course.description}
                    </p>
                </div>

                {/* Footer avec métadonnées */}
                <div className="mt-auto p-6 pt-4 bg-slate-50/50 border-t border-slate-100">
                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-slate-600 text-xs">
                            <Calendar size={14} className="mr-2 text-slate-400" />
                            <span>{formatDate(course.dateProposition)}</span>
                        </div>
                        <div className="flex items-center text-slate-600 text-xs">
                            <User size={14} className="mr-2 text-slate-400" />
                            <span>{course.formateur ? `${course.formateur.prenom} ${course.formateur.nom}` : 'Formateur expert'}</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                        {course.annee?.libelle && (
                            <span className="text-xs text-slate-500 font-medium">
                                {course.annee.libelle}
                            </span>
                        )}
                        <div className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-[#1a365d] transition-all hover:scale-105 hover:shadow-lg">
                            <span>Voir plus</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

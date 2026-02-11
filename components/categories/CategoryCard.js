import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Palette, Database, TrendingUp, Languages, Users, Target, Briefcase } from 'lucide-react';
import { slugify } from '@/utils/slugify';

// Configuration précise pour chaque catégorie
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

export default function CategoryCard({ category }) {
    // Récupérer la configuration de la catégorie
    const config = CATEGORY_CONFIG[category.nom] || {
        icon: BookOpen,
        gradient: "from-slate-600 to-slate-500"
    };

    const IconComponent = config.icon;

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300">

            <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${config.gradient}`} />

            <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${config.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent size={32} />
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">
                    {category.nom}
                </h3>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {category.description || "Découvrez nos formations dans cette catégorie."}
                </p>

                {/* Compteur de formations */}
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                    <BookOpen size={16} className="text-primary" />
                    <span className="font-medium">
                        {category.courseCount || 0} formation{(category.courseCount || 0) > 1 ? 's' : ''}
                    </span>
                </div>

                <div className="mt-auto">
                    <Link
                        href={`/categories/${slugify(category.nom)}`}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-slate-100 text-secondary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 group/link shadow-md hover:shadow-lg hover:scale-105"
                    >
                        Explorer
                        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Decorative background element */}
            <div className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br ${config.gradient} pointer-events-none group-hover:scale-150 group-hover:opacity-15 transition-all duration-500`} />
        </div>
    );
}

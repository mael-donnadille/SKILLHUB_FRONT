import BackButton from "@/components/ui/BackButton";
import { Search, ArrowLeft, BookOpen, Code, Palette, Database, TrendingUp, Languages, Users, Target } from "lucide-react";
import { slugify } from "@/utils/slugify";
import CourseCard from "@/components/courses/CourseCard";
import Link from "next/link";

// Configuration précise pour chaque catégorie (cohérent avec CategoryCard)
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

async function getCourses() {
    try {
        const res = await fetch('http://localhost:8000/api/formations', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

export default async function CategoryPage({ params }) {
    const courses = await getCourses();
    const { category } = await params;

    const matchedCourse = courses.find(course =>
        course.categorie && slugify(course.categorie.nom) === category
    );

    const categoryName = matchedCourse ? matchedCourse.categorie.nom : decodeURIComponent(category);

    const filteredCourses = courses.filter(course => {
        if (!course.categorie || !course.categorie.nom) return false;
        return slugify(course.categorie.nom) === category;
    });

    // Récupérer la configuration de la catégorie
    const config = CATEGORY_CONFIG[categoryName] || {
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
                        href="/categories"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl transition-all duration-300 mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Retour aux catégories</span>
                    </Link>

                    {/* Contenu du hero */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Icône de la catégorie */}
                        <div className="p-8 bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl">
                            <IconComponent size={80} className="text-white" strokeWidth={1.5} />
                        </div>

                        {/* Informations */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                                {categoryName}
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl mb-6 max-w-2xl">
                                Découvrez nos programmes de formation spécialisés en {categoryName} et développez vos compétences avec nos experts.
                            </p>

                            {/* Badge de statistiques */}
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold shadow-lg">
                                <BookOpen size={20} />
                                <span>{filteredCourses.length} formation{filteredCourses.length > 1 ? 's' : ''} disponible{filteredCourses.length > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section des formations */}
            <main className="grow py-16 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-primary mb-8">Nos Formations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        ) : (
                            <div className="col-span-full">
                                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-100">
                                    <div className={`inline-flex items-center justify-center p-6 rounded-full bg-gradient-to-br ${config.gradient} mb-6`}>
                                        <Search className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-primary mb-2">Aucune formation disponible</h3>
                                    <p className="text-secondary text-lg mb-6">
                                        Nous n'avons pas encore de formations dans cette catégorie.
                                    </p>
                                    <Link
                                        href="/categories"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <ArrowLeft size={20} />
                                        Voir toutes les catégories
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

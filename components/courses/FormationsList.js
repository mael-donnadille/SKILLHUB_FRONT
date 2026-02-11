"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseCard from "@/components/courses/CourseCard";
import { Search, ChevronDown, ArrowUpDown, Filter, X, SlidersHorizontal } from "lucide-react";

function FormationsListContent({ initialCourses }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialisation des états à partir de l'URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "date-desc");
    const [filters, setFilters] = useState({
        category: searchParams.get("category") || "",
        instructor: searchParams.get("instructor") || "",
        year: searchParams.get("year") || ""
    });

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Extraction des options uniques pour les filtres
    const filterOptions = useMemo(() => {
        if (!initialCourses) return { categories: [], instructors: [], years: [] };

        const categories = [...new Set(initialCourses.map(c => c.categorie?.nom).filter(Boolean))].sort();

        const instructors = [...new Set(initialCourses.map(c =>
            c.formateur ? `${c.formateur.prenom} ${c.formateur.nom}` : ""
        ).filter(Boolean))].sort();

        const years = [...new Set(initialCourses.map(c => c.annee?.libelle).filter(Boolean))].sort().reverse();

        return { categories, instructors, years };
    }, [initialCourses]);

    // Synchronisation avec l'URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (sortBy !== "date-desc") params.set("sort", sortBy);
        if (filters.category) params.set("category", filters.category);
        if (filters.instructor) params.set("instructor", filters.instructor);
        if (filters.year) params.set("year", filters.year);

        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchTerm, sortBy, filters, router]);

    // Filtrage et Tri
    const processedCourses = useMemo(() => {
        if (!initialCourses) return [];

        let result = [...initialCourses];

        // 1. Recherche Textuelle
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.titre.toLowerCase().includes(lowerTerm) ||
                c.description.toLowerCase().includes(lowerTerm)
            );
        }

        // 2. Filtres
        if (filters.category) {
            result = result.filter(c => c.categorie?.nom === filters.category);
        }
        if (filters.instructor) {
            result = result.filter(c =>
                c.formateur && `${c.formateur.prenom} ${c.formateur.nom}` === filters.instructor
            );
        }
        if (filters.year) {
            result = result.filter(c => c.annee?.libelle === filters.year);
        }

        // 3. Tri
        return result.sort((a, b) => {
            if (sortBy === "date-desc") {
                return new Date(b.dateProposition) - new Date(a.dateProposition);
            }
            if (sortBy === "date-asc") {
                return new Date(a.dateProposition) - new Date(b.dateProposition);
            }
            if (sortBy === "alpha-asc") {
                return a.titre.localeCompare(b.titre);
            }
            if (sortBy === "alpha-desc") {
                return b.titre.localeCompare(a.titre);
            }
            return 0;
        });
    }, [initialCourses, searchTerm, sortBy, filters]);

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;
    const hasSearch = !!searchTerm;

    const resetFilters = () => {
        setFilters({ category: "", instructor: "", year: "" });
        setSearchTerm("");
        setSortBy("date-desc");
    };

    return (
        <div>
            {/* Barre de contrôle */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 space-y-6">

                {/* Barre de Recherche */}
                <div className="flex gap-4">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm"
                            placeholder="Rechercher une formation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                onClick={() => setSearchTerm("")}
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Bouton Filtres Mobile */}
                    <button
                        className={`lg:hidden flex items-center justify-center px-4 py-3 border rounded-xl font-medium transition-colors ${isMobileFiltersOpen || activeFiltersCount > 0
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-secondary border-slate-200 hover:bg-slate-50"
                            }`}
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    >
                        <SlidersHorizontal size={20} />
                        {(activeFiltersCount > 0) && (
                            <span className="ml-2 bg-white text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Zone Filtres & Tri (Collapsible sur Mobile) */}
                <div className={`flex flex-col lg:flex-row justify-between gap-6 pt-6 border-t border-slate-50 ${isMobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>

                    {/* Filtres */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-grow flex-wrap">
                        <div className="relative min-w-[180px] flex-1 sm:flex-none">
                            <select
                                value={filters.category}
                                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                className="appearance-none bg-white border border-slate-200 text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 cursor-pointer hover:border-slate-300 transition-colors"
                            >
                                <option value="">Toutes les catégories</option>
                                {filterOptions.categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>

                        <div className="relative min-w-[180px] flex-1 sm:flex-none">
                            <select
                                value={filters.instructor}
                                onChange={(e) => setFilters(prev => ({ ...prev, instructor: e.target.value }))}
                                className="appearance-none bg-white border border-slate-200 text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 cursor-pointer hover:border-slate-300 transition-colors"
                            >
                                <option value="">Tous les formateurs</option>
                                {filterOptions.instructors.map(inst => (
                                    <option key={inst} value={inst}>{inst}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>

                        <div className="relative min-w-[150px] flex-1 sm:flex-none">
                            <select
                                value={filters.year}
                                onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
                                className="appearance-none bg-white border border-slate-200 text-primary text-sm rounded-xl focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 cursor-pointer hover:border-slate-300 transition-colors"
                            >
                                <option value="">Toutes les années</option>
                                {filterOptions.years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>

                        {(activeFiltersCount > 0 || hasSearch) && (
                            <button
                                onClick={resetFilters}
                                className="flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors min-w-[140px]"
                            >
                                <X size={16} className="mr-2" />
                                Réinitialiser
                            </button>
                        )}
                    </div>

                    {/* Tri */}
                    <div className="flex items-center gap-3 min-w-[220px]">
                        <label htmlFor="sort-select" className="text-sm font-medium text-secondary whitespace-nowrap hidden xl:block">
                            Trier par :
                        </label>
                        <div className="relative w-full">
                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none bg-white border border-slate-200 text-primary text-sm font-medium rounded-xl focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 cursor-pointer shadow-sm hover:border-primary transition-colors"
                            >
                                <option value="date-desc">Plus récents</option>
                                <option value="date-asc">Plus anciens</option>
                                <option value="alpha-asc">Nom (A-Z)</option>
                                <option value="alpha-desc">Nom (Z-A)</option>
                            </select>
                            <ArrowUpDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Résultat */}
            <div className="mb-6 text-sm text-secondary flex justify-between items-center">
                <div>
                    Affichage de <span className="font-bold text-primary">{processedCourses.length}</span> formation{processedCourses.length > 1 ? 's' : ''}
                    {initialCourses && initialCourses.length !== processedCourses.length && (
                        <span> (sur {initialCourses.length} au total)</span>
                    )}
                </div>
            </div>

            {/* Grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processedCourses.length > 0 ? (
                    processedCourses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
                            <Search className="h-8 w-8 text-primary/60" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Aucun résultat trouvé</h3>
                        <p className="text-secondary max-w-md mx-auto mb-6">
                            Aucune formation ne correspond à votre recherche avec les filtres actuels.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors"
                        >
                            Tout réinitialiser
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function FormationsList({ initialCourses }) {
    return (
        <Suspense fallback={<div className="text-center py-12">Chargement des filtres...</div>}>
            <FormationsListContent initialCourses={initialCourses} />
        </Suspense>
    );
}

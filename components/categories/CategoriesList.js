"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryCard from "@/components/categories/CategoryCard";
import { Search, ChevronDown, ArrowUpDown, X, SlidersHorizontal } from "lucide-react";

function CategoriesListContent({ initialCategories }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialisation des états à partir de l'URL
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "alpha-asc");

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Synchronisation avec l'URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("q", searchTerm);
        if (sortBy !== "alpha-asc") params.set("sort", sortBy);

        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchTerm, sortBy, router]);

    // Filtrage et Tri
    const processedCategories = useMemo(() => {
        if (!initialCategories) return [];

        let result = [...initialCategories];

        // 1. Recherche Textuelle
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(c =>
                c.nom.toLowerCase().includes(lowerTerm) ||
                (c.description && c.description.toLowerCase().includes(lowerTerm))
            );
        }

        // 2. Tri
        return result.sort((a, b) => {
            if (sortBy === "alpha-asc") {
                return a.nom.localeCompare(b.nom);
            }
            if (sortBy === "alpha-desc") {
                return b.nom.localeCompare(a.nom);
            }
            return 0;
        });
    }, [initialCategories, searchTerm, sortBy]);

    const hasSearch = !!searchTerm;

    const resetFilters = () => {
        setSearchTerm("");
        setSortBy("alpha-asc");
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
                            placeholder="Rechercher une catégorie..."
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
                        className={`lg:hidden flex items-center justify-center px-4 py-3 border rounded-xl font-medium transition-colors ${isMobileFiltersOpen
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-secondary border-slate-200 hover:bg-slate-50"
                            }`}
                        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                    >
                        <SlidersHorizontal size={20} />
                    </button>
                </div>

                {/* Zone Tri (Collapsible sur Mobile) */}
                <div className={`flex flex-col lg:flex-row justify-between gap-6 pt-6 border-t border-slate-50 ${isMobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>

                    {/* Bouton Reset */}
                    <div className="flex items-center gap-4">
                        {hasSearch && (
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
                    Affichage de <span className="font-bold text-primary">{processedCategories.length}</span> catégorie{processedCategories.length > 1 ? 's' : ''}
                    {initialCategories && initialCategories.length !== processedCategories.length && (
                        <span> (sur {initialCategories.length} au total)</span>
                    )}
                </div>
            </div>

            {/* Grille */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processedCategories.length > 0 ? (
                    processedCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
                            <Search className="h-8 w-8 text-primary/60" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-2">Aucun résultat trouvé</h3>
                        <p className="text-secondary max-w-md mx-auto mb-6">
                            Aucune catégorie ne correspond à votre recherche.
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

export default function CategoriesList({ initialCategories }) {
    return (
        <Suspense fallback={<div className="text-center py-12">Chargement des filtres...</div>}>
            <CategoriesListContent initialCategories={initialCategories} />
        </Suspense>
    );
}

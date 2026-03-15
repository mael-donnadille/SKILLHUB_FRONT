"use client";

import { useState, useEffect } from "react";
import { Search, Edit, Trash2, Plus, Eye } from "lucide-react";
import { getCategories } from "@/services/categoryService";
import { getFormations } from "@/services/formationService";
import Link from "next/link";

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([
            getCategories(),
            getFormations().catch(err => {
                console.error("Error fetching formations", err);
                return [];
            })
        ]).then(([catsData, formationsData]) => {
                const normalizedCats = Array.isArray(catsData) ? catsData : (catsData['hydra:member'] || catsData.data || []);
                const normalizedFormations = Array.isArray(formationsData) ? formationsData : (formationsData['hydra:member'] || formationsData.data || []);
                
                setCategories(normalizedCats);
                setFormations(normalizedFormations);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Impossible de charger les données.");
                setIsLoading(false);
            });
    }, []);

    const filteredCategories = categories.filter(category =>
        (category.nom || category.libelle || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getFormationCount = (categoryId) => {
        return formations.filter(f => {
            // Vérifie si la formation a une catégorie et si l'ID correspond
            // API Platform renvoie parfois un objet, parfois un URI string
            if (!f.categorie) return false;
            if (typeof f.categorie === 'object') return f.categorie.id === categoryId;
            // Si c'est une string URI "/api/categories/1", on pourrait parser, mais supposons objet ou id
            return f.categorie === categoryId;
        }).length;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) return <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Gestion des Catégories</h1>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                    <Plus size={18} />
                    Nouvelle Catégorie
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <span className="text-sm text-slate-500">{filteredCategories.length} résultat(s)</span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Nom de la catégorie</th>
                                <th className="px-6 py-4 text-center">Nombre de formations</th>
                                <th className="px-6 py-4 text-center">Voir les cours</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCategories.map((category, index) => (
                                <tr key={category.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 text-slate-500 font-medium">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{category.nom || category.libelle}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {getFormationCount(category.id)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Link 
                                            href={`/administrateur/formations?category=${category.id}`}
                                            className="inline-flex p-2 text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                                            title="Voir les formations"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-orange-50 text-orange-600 rounded-lg transition-colors" title="Modifier">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" title="Supprimer">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredCategories.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        Aucune catégorie trouvée pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

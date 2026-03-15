"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Layers, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { getAdminFormations, validateFormation, rejectFormation } from "@/services/formationService";
import { getCategories } from "@/services/categoryService";
import { getAteliers } from "@/services/atelierService";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function FormationsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <FormationsContent />
        </Suspense>
    );
}

function FormationsContent() {
    const searchParams = useSearchParams();
    const initialCategoryId = searchParams.get("category");
    const { token } = useAuth();

    const [formations, setFormations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ateliers, setAteliers] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState(initialCategoryId || "all");
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const [isLoading, setIsLoading] = useState(true);

    const loadData = async () => {
        if (!token) return;
        
        try {
            const [formationsData, categoriesData, ateliersData] = await Promise.all([
                getAdminFormations(token).catch(() => []),
                getCategories().catch(() => []),
                getAteliers(token).catch(() => [])
            ]);

            const normalizedFormations = Array.isArray(formationsData) ? formationsData : (formationsData['hydra:member'] || formationsData.data || []);
            const normalizedCategories = Array.isArray(categoriesData) ? categoriesData : (categoriesData['hydra:member'] || categoriesData.data || []);
            const normalizedAteliers = Array.isArray(ateliersData) ? ateliersData : (ateliersData['hydra:member'] || ateliersData.data || []);
            
            setFormations(normalizedFormations);
            setCategories(normalizedCategories);
            setAteliers(normalizedAteliers);
        } catch (error) {
            console.error("Error loading formations page:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [token]);

    useEffect(() => {
        if (initialCategoryId) {
            setCategoryFilter(initialCategoryId);
        }
    }, [initialCategoryId]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, categoryFilter]);

    const handleValidate = async (id) => {
        if (confirm("Valider cette formation ?")) {
            try {
                await validateFormation(id, token);
                loadData();
            } catch (error) {
                console.error("Erreur validation", error);
                alert("Erreur lors de la validation");
            }
        }
    };

    const handleReject = async (id) => {
        if (confirm("Rejeter cette formation ?")) {
            try {
                await rejectFormation(id, token);
                loadData();
            } catch (error) {
                console.error("Erreur rejet", error);
                alert("Erreur lors du rejet");
            }
        }
    };

    const getCategoryName = (formation) => {
        if (!formation.categorie) return "Non catégorisé";
        if (typeof formation.categorie === 'object' && (formation.categorie.nom || formation.categorie.libelle)) {
            return formation.categorie.nom || formation.categorie.libelle;
        }
        if (categories.length > 0) {
            const catId = typeof formation.categorie === 'string' 
                ? formation.categorie.split('/').pop() 
                : formation.categorie;
            
            // eslint-disable-next-line eqeqeq
            const found = categories.find(c => c.id == catId);
            if (found) return found.nom || found.libelle;
        }
        return "Inconnu";
    };

    const getFormateurName = (formation) => {
        if (!formation.formateur) return "Inconnu";
        if (typeof formation.formateur === 'object') {
            return `${formation.formateur.prenom || ''} ${formation.formateur.nom || ''}`.trim() || formation.formateur.email || "Formateur";
        }
        return "Formateur";
    };

    const getAteliersCount = (formationId) => {
        return ateliers.filter(a => {
            if (!a.formation) return false;
            const aFormId = typeof a.formation === 'object' ? a.formation.id : String(a.formation).split('/').pop();
            // eslint-disable-next-line eqeqeq
            return aFormId == formationId;
        }).length;
    };

    const filteredFormations = formations.filter(formation => {
        const title = formation.libelle || formation.titre || '';
        const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
        
        const status = formation.statut || 'EN_ATTENTE'; 
        const matchesStatus = statusFilter === "all" || status === statusFilter;

        let matchesCategory = true;
        if (categoryFilter !== "all") {
            const catId = formation.categorie && (typeof formation.categorie === 'object' ? formation.categorie.id : formation.categorie);
            const catIdString = String(catId).split('/').pop();
            matchesCategory = String(catIdString) === String(categoryFilter);
        }

        return matchesSearch && matchesStatus && matchesCategory;
    });

    const getStatusBadge = (formation) => {
        const status = formation.statut || 'EN_ATTENTE';
        switch (status) {
            case 'VALIDE': 
            case 'PUBLIEE':
                return (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    <CheckCircle size={12} />
                    Validé
                </span>
            );
            case 'EN_ATTENTE': return (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                    <Clock size={12} />
                    En attente
                </span>
            );
            case 'REFUSE': return (
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                    <XCircle size={12} />
                    Refusé
                </span>
            );
            default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{status}</span>;
        }
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFormations = filteredFormations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredFormations.length / itemsPerPage);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Gestion des Formations</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher une formation..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    {/* Filtre Catégorie */}
                    <div className="flex items-center gap-2">
                        <Layers className="text-slate-400 w-4 h-4" />
                        <select
                            className="border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 max-w-[150px]"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Toutes catégories</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nom || cat.libelle}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Filtre Statut */}
                    <div className="flex items-center gap-2">
                        <Filter className="text-slate-400 w-4 h-4" />
                        <select
                            className="border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="VALIDE">Validées</option>
                            <option value="EN_ATTENTE">En attente</option>
                            <option value="REFUSE">Refusées</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Titre de la formation</th>
                                <th className="px-6 py-4">Catégorie</th>
                                <th className="px-6 py-4">Formateur</th>
                                <th className="px-6 py-4 text-center">Ateliers</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentFormations.map((formation) => (
                                <tr key={formation.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        {formation.libelle || formation.titre}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        <span className="inline-flex px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                                            {getCategoryName(formation)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{getFormateurName(formation)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                            <Calendar size={12} />
                                            {getAteliersCount(formation.id)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{getStatusBadge(formation)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Boutons de validation si EN_ATTENTE */}
                                            {(!formation.statut || formation.statut === 'EN_ATTENTE') && (
                                                <>
                                                    <button 
                                                        onClick={() => handleValidate(formation.id)}
                                                        className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors" 
                                                        title="Valider"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleReject(formation.id)}
                                                        className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                                                        title="Rejeter"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </>
                                            )}
                                            
                                            <Link 
                                                href={`/administrateur/formations/${formation.id}`}
                                                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors inline-flex"
                                                title="Voir le détail"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredFormations.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredFormations.length)} sur {filteredFormations.length} formations
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="flex items-center px-4 text-sm font-medium">
                                Page {currentPage} sur {totalPages}
                            </span>
                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}

                {filteredFormations.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        Aucune formation trouvée pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

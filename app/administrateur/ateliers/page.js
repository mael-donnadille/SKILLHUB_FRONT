"use client";

import { useState, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react";
import { getAteliers } from "@/services/atelierService";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function AteliersPage() {
    const [ateliers, setAteliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getAteliers(token)
                .then(data => {
                    const normalizedData = Array.isArray(data) ? data : (data['hydra:member'] || data.data || []);
                    // Tri par date décroissante
                    normalizedData.sort((a, b) => new Date(b.date_atelier) - new Date(a.date_atelier));
                    setAteliers(normalizedData);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError("Impossible de charger les ateliers.");
                    setIsLoading(false);
                });
        }
    }, [token]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const filteredAteliers = ateliers.filter(atelier => {
        const formationTitle = (atelier.formation?.titre || atelier.formation?.libelle || '').toLowerCase();
        const salleName = (atelier.salle?.nom || '').toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        return formationTitle.includes(searchLower) || salleName.includes(searchLower);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAteliers = filteredAteliers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAteliers.length / itemsPerPage);

    const formatDateTime = (dateString, heureDebut, heureFin) => {
        if (!dateString) return "Date à définir";
        const optionsDate = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
        const datePart = new Date(dateString).toLocaleDateString('fr-FR', optionsDate);
        
        let timePart = "";
        if (heureDebut) {
            const formatTime = (timeStr) => {
                if (!timeStr) return "";
                if (timeStr.includes('T')) {
                    return new Date(timeStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                }
                return timeStr.substring(0, 5); // ex: "14:00"
            };
            
            timePart = `${formatTime(heureDebut)}`;
            if (heureFin) {
                timePart += ` - ${formatTime(heureFin)}`;
            }
        }
        
        return (
            <div>
                <span className="font-medium text-slate-800 capitalize">{datePart}</span>
                {timePart && <span className="text-slate-500 text-sm ml-2">{timePart}</span>}
            </div>
        );
    };

    if (isLoading) return <div className="p-8 text-center">Chargement des ateliers...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Gestion des Ateliers (Sessions)</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher par formation ou salle..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Formation</th>
                                <th className="px-6 py-4">Date & Heure</th>
                                <th className="px-6 py-4">Salle</th>
                                <th className="px-6 py-4 text-center">Capacité</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentAteliers.map((atelier, index) => (
                                <tr 
                                    key={atelier.id || `temp-${index}`}
                                    className={`transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                >
                                    <td className="px-6 py-4 font-medium text-slate-800 max-w-xs truncate">
                                        <Link href={`/administrateur/formations/${atelier.formation?.id}`} className="hover:text-primary hover:underline">
                                            {atelier.formation?.titre || atelier.formation?.libelle || `Formation #${atelier.formation}`}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDateTime(atelier.date_atelier, atelier.heure_debut, atelier.heure_fin)}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-slate-400" />
                                            {atelier.salle?.nom || 'Non assignée'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                            <Users size={12} />
                                            {atelier.capacite || '?'} places
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                {filteredAteliers.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredAteliers.length)} sur {filteredAteliers.length} ateliers
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

                {filteredAteliers.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        Aucun atelier trouvé pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

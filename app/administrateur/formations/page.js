"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Trash2, Edit, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { getFormationsAdmin } from "@/services/mockAdminService";

export default function FormationsPage() {
    const [formations, setFormations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        getFormationsAdmin().then(setFormations);
    }, []);

    const filteredFormations = formations.filter(formation => {
        const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || formation.statut === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'VALIDE': return (
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Gestion des Formations</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    + Nouvelle Formation
                </button>
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
                <div className="flex items-center gap-2 w-full sm:w-auto">
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

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Titre de la formation</th>
                                <th className="px-6 py-4">Catégorie</th>
                                <th className="px-6 py-4">Formateur</th>
                                <th className="px-6 py-4">Statut</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredFormations.map((formation) => (
                                <tr key={formation.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        {formation.titre}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <span className="inline-flex px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                                            {formation.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{formation.formateur}</td>
                                    <td className="px-6 py-4">{getStatusBadge(formation.statut)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Voir">
                                                <Eye size={16} />
                                            </button>
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
                {filteredFormations.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        Aucune formation trouvée pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

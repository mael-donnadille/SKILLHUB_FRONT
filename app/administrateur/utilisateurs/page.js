"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { getUsers } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (token) {
            getUsers(token)
                .then(data => {
                    setUsers(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError("Impossible de charger les utilisateurs.");
                    setIsLoading(false);
                });
        }
    }, [token]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, roleFilter]);

    const normalizeRole = (user) => {
        if (user.role) return user.role;
        if (user.type) return user.type;
        if (user.roles && user.roles.length > 0) {
            if (user.roles.includes('ROLE_ADMIN')) return 'administrateur';
            if (user.roles.includes('ROLE_FORMATEUR')) return 'formateur';
            return 'apprenant';
        }
        return 'inconnu';
    };

    const filteredUsers = users.filter(user => {
        const fullName = `${user.nom || ''} ${user.prenom || ''} ${user.email || ''}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase());
        
        const userRole = normalizeRole(user);
        const matchesRole = roleFilter === "all" || userRole === roleFilter;
        
        return matchesSearch && matchesRole;
    }).sort((a, b) => {
        const nameA = `${a.nom || ''} ${a.prenom || ''}`.toLowerCase();
        const nameB = `${b.nom || ''} ${b.prenom || ''}`.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const getRoleBadge = (user) => {
        const role = normalizeRole(user);
        switch (role) {
            case 'administrateur': 
            case 'ROLE_ADMIN':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>;
            case 'formateur': 
            case 'ROLE_FORMATEUR':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Formateur</span>;
            case 'apprenant': 
            case 'ROLE_USER':
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Apprenant</span>;
            default: 
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{role}</span>;
        }
    };

    if (isLoading) return <div className="p-8 text-center">Chargement des utilisateurs...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Gestion des Utilisateurs</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                    + Nouvel Utilisateur
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="text-slate-400 w-4 h-4" />
                    <select
                        className="border border-slate-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">Tous les rôles</option>
                        <option value="administrateur">Administrateurs</option>
                        <option value="formateur">Formateurs</option>
                        <option value="apprenant">Apprenants</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Utilisateur</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Rôle</th>
                                <th className="px-6 py-4">Date Inscription</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {currentUsers.map((user, index) => (
                                <tr 
                                    key={user.id} 
                                    className={`transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                >
                                    <td className="px-6 py-4 text-slate-500 font-medium">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold uppercase">
                                                {(user.prenom && user.prenom[0]) || ''}{(user.nom && user.nom[0]) || ''}
                                            </div>
                                            {user.prenom} {user.nom}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4">{getRoleBadge(user)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {user.date_creation ? new Date(user.date_creation).toLocaleDateString() : '-'}
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
                
                {/* Pagination */}
                {filteredUsers.length > 0 && (
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-sm text-slate-500">
                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
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

                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        Aucun utilisateur trouvé pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

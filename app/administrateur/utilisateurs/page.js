"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreVertical, Trash2, Edit, Mail } from "lucide-react";
import { getUsers } from "@/services/mockAdminService";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.nom + " " + user.prenom + " " + user.email).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const getRoleBadge = (role) => {
        switch (role) {
            case 'administrateur': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>;
            case 'formateur': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Formateur</span>;
            case 'apprenant': return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Apprenant</span>;
            default: return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{role}</span>;
        }
    };

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
                                <th className="px-6 py-4">Utilisateur</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Rôle</th>
                                <th className="px-6 py-4">Date Inscription</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                                                {user.prenom[0]}{user.nom[0]}
                                            </div>
                                            {user.prenom} {user.nom}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{new Date(user.date_creation).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors" title="Envoyer un email">
                                                <Mail size={16} />
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
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        Aucun utilisateur trouvé pour ces critères.
                    </div>
                )}
            </div>
        </div>
    );
}

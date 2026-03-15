"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Trash2, Edit, ChevronLeft, ChevronRight, X, Plus } from "lucide-react";
import { getUsers, updateUser, createUser, deleteUser } from "@/services/userService";
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

    // États pour la modale d'édition/création
    const [editingUser, setEditingUser] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // État pour le nouvel utilisateur
    const [newUser, setNewUser] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        roleForForm: 'apprenant'
    });

    const fetchAllUsers = async () => {
        try {
            const data = await getUsers(token);
            setUsers(data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError("Impossible de charger les utilisateurs.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllUsers();
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
        return 'apprenant';
    };

    const handleEditClick = (user) => {
        setEditingUser({
            ...user,
            roleForForm: normalizeRole(user)
        });
    };

    const handleCreateClick = () => {
        setNewUser({
            prenom: '',
            nom: '',
            email: '',
            password: '',
            roleForForm: 'apprenant'
        });
        setIsCreatingUser(true);
    };

    const handleDeleteClick = async (userId, prenom, nom) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${prenom} ${nom} ? Cette action est irréversible.`)) {
            try {
                await deleteUser(userId, token);
                // Mettre à jour la liste locale en filtrant l'utilisateur supprimé
                setUsers(users.filter(u => u.id !== userId));
            } catch (error) {
                alert("Erreur lors de la suppression : " + error.message);
            }
        }
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let roles = [];
            switch(editingUser.roleForForm) {
                case 'administrateur': roles = ['ROLE_ADMIN']; break;
                case 'formateur': roles = ['ROLE_FORMATEUR']; break;
                default: roles = ['ROLE_USER']; break;
            }

            const dataToUpdate = {
                prenom: editingUser.prenom,
                nom: editingUser.nom,
                email: editingUser.email,
                roles: roles
            };

            await updateUser(editingUser.id, dataToUpdate, token);
            
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...dataToUpdate } : u));
            setEditingUser(null);
        } catch (error) {
            alert("Erreur lors de la modification : " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveCreate = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            let roles = [];
            switch(newUser.roleForForm) {
                case 'administrateur': roles = ['ROLE_ADMIN']; break;
                case 'formateur': roles = ['ROLE_FORMATEUR']; break;
                default: roles = ['ROLE_USER']; break;
            }

            const dataToCreate = {
                prenom: newUser.prenom,
                nom: newUser.nom,
                email: newUser.email,
                mot_de_passe: newUser.password, 
                roles: roles,
                type: newUser.roleForForm
            };

            await createUser(dataToCreate, token);
            
            // On recharge la liste complète pour s'assurer d'avoir les vrais IDs et la bonne pagination
            await fetchAllUsers();
            
            setIsCreatingUser(false);
        } catch (error) {
            alert("Erreur lors de la création : " + error.message);
        } finally {
            setIsSaving(false);
        }
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const getRoleBadge = (user) => {
        const role = normalizeRole(user);
        switch (role) {
            case 'administrateur': 
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">Admin</span>;
            case 'formateur': 
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Formateur</span>;
            case 'apprenant': 
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">Apprenant</span>;
            default: 
                return <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{role}</span>;
        }
    };

    if (isLoading) return <div className="p-8 text-center">Chargement des utilisateurs...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="space-y-6 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">Gestion des Utilisateurs</h1>
                <button 
                    onClick={handleCreateClick}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2"
                >
                    <Plus size={18} />
                    Nouvel Utilisateur
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
                                    key={user.id || `temp-${index}`}
                                    className={`transition-colors group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                >
                                    <td className="px-6 py-4 text-slate-500 font-medium">
                                        {indexOfFirstItem + index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold uppercase">
                                                {(user.prenom && user.prenom[0]) || ''}{(user.nom && user.nom[0]) || ''}
                                            </div>
                                            {user.prenom} {user.nom}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                                    <td className="px-6 py-4">{getRoleBadge(user)}</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {user.date_creation ? new Date(user.date_creation).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleEditClick(user)}
                                                className="p-2 hover:bg-orange-50 text-orange-600 rounded-lg transition-colors" 
                                                title="Modifier"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(user.id, user.prenom, user.nom)}
                                                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors" 
                                                title="Supprimer"
                                            >
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
                    <div className="p-8 text-center text-slate-400">
                        Aucun utilisateur trouvé pour ces critères.
                    </div>
                )}
            </div>

            {/* Modal d'édition */}
            {editingUser && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">Modifier l&apos;utilisateur</h2>
                            <button onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prénom</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editingUser.prenom || ''} 
                                        onChange={e => setEditingUser({...editingUser, prenom: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editingUser.nom || ''} 
                                        onChange={e => setEditingUser({...editingUser, nom: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={editingUser.email || ''} 
                                    onChange={e => setEditingUser({...editingUser, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rôle</label>
                                <select 
                                    value={editingUser.roleForForm}
                                    onChange={e => setEditingUser({...editingUser, roleForForm: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                                >
                                    <option value="apprenant">Apprenant</option>
                                    <option value="formateur">Formateur</option>
                                    <option value="administrateur">Administrateur</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingUser(null)}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                                >
                                    {isSaving ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : "Enregistrer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Création */}
            {isCreatingUser && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">Nouvel utilisateur</h2>
                            <button onClick={() => setIsCreatingUser(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveCreate} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Prénom</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newUser.prenom} 
                                        onChange={e => setNewUser({...newUser, prenom: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newUser.nom} 
                                        onChange={e => setNewUser({...newUser, nom: e.target.value})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={newUser.email} 
                                    onChange={e => setNewUser({...newUser, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mot de passe</label>
                                <input 
                                    type="password" 
                                    required
                                    value={newUser.password} 
                                    onChange={e => setNewUser({...newUser, password: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Rôle</label>
                                <select 
                                    value={newUser.roleForForm}
                                    onChange={e => setNewUser({...newUser, roleForForm: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                                >
                                    <option value="apprenant">Apprenant</option>
                                    <option value="formateur">Formateur</option>
                                    <option value="administrateur">Administrateur</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 mt-2 border-t border-slate-100 flex justify-end gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsCreatingUser(false)}
                                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSaving}
                                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                                >
                                    {isSaving ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : "Créer"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

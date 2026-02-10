"use client";
import { useState } from 'react';
import { Plus, Trash2, Edit2, Tag } from 'lucide-react';

export default function CategoryManagement() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Développement Web', count: 12 },
        { id: 2, name: 'Data Science', count: 5 },
        { id: 3, name: 'Design', count: 8 },
        { id: 4, name: 'Marketing Digital', count: 3 },
    ]);
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;
        setCategories([...categories, { id: Date.now(), name: newCategory, count: 0 }]);
        setNewCategory('');
    };

    const handleDelete = (id) => {
        setCategories(categories.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-primary">Gestion des Catégories</h1>
                <p className="text-secondary mt-2">Organisez les thématiques des formations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulaire d'ajout */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                        <h3 className="text-lg font-bold text-primary mb-4">Nouvelle Catégorie</h3>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-primary mb-1">Nom de la catégorie</label>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Ex: Cybersécurité"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors shadow-md"
                            >
                                <Plus size={20} />
                                <span>Ajouter</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* Liste des catégories */}
                <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-primary/30 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-primary rounded-lg">
                                    <Tag size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary">{category.name}</h4>
                                    <p className="text-xs text-secondary">{category.count} formations</p>
                                </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-secondary hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import CategoryCard from './CategoryCard';

export default function CategoryList({ categories = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter(category =>
        category.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-12">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm shadow-sm transition-all"
                    placeholder="Rechercher une catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Categories Grid */}
            {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-lg text-slate-500">Aucune catégorie trouvée pour &quot;{searchTerm}&quot;</p>
                </div>
            )}
        </div>
    );
}

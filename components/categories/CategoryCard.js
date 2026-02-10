"use client";
import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Palette, Database, TrendingUp, Music, Camera, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CategoryCard({ category, index }) {
    // Helper to get icon based on category name
    const getIcon = (name) => {
        const lowerName = name?.toLowerCase() || "";
        if (lowerName.includes("dev") || lowerName.includes("code") || lowerName.includes("web")) return <Code size={32} />;
        if (lowerName.includes("design") || lowerName.includes("art") || lowerName.includes("graph")) return <Palette size={32} />;
        if (lowerName.includes("data") || lowerName.includes("donnée")) return <Database size={32} />;
        if (lowerName.includes("market") || lowerName.includes("business")) return <TrendingUp size={32} />;
        if (lowerName.includes("photo") || lowerName.includes("video")) return <Camera size={32} />;
        if (lowerName.includes("music") || lowerName.includes("audio")) return <Music size={32} />;
        if (lowerName.includes("ui") || lowerName.includes("ux")) return <Layers size={32} />;
        return <BookOpen size={32} />;
    };

    // Helper for gradient colors
    const getGradient = (name) => {
        const lowerName = name?.toLowerCase() || "";
        if (lowerName.includes("dev") || lowerName.includes("code")) return "from-blue-500 to-cyan-400";
        if (lowerName.includes("design")) return "from-purple-500 to-pink-400";
        if (lowerName.includes("data")) return "from-emerald-500 to-teal-400";
        if (lowerName.includes("market")) return "from-orange-500 to-amber-400";
        return "from-slate-500 to-slate-400";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
        >
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getGradient(category.nom)}`} />
            
            <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-slate-50 text-slate-700 mb-4 group-hover:scale-110 transition-transform duration-300 ${getGradient(category.nom).replace('from-', 'text-').split(' ')[0]}`}>
                    {getIcon(category.nom)}
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-blue-600 transition-colors">
                    {category.nom}
                </h3>

                <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                    {category.description || "Découvrez nos formations dans cette catégorie."}
                </p>

                <div className="mt-auto">
                    <Link 
                        href={`/courses?category=${category.nom}`}
                        className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-600 transition-colors group/link"
                    >
                        Explorer
                        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
            
            {/* Decorative background element */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 bg-gradient-to-br ${getGradient(category.nom)} pointer-events-none group-hover:scale-150 transition-transform duration-500`} />
        </motion.div>
    );
}

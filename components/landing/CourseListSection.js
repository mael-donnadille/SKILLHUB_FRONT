"use client";
import Link from "next/link";
import { ArrowRight, Calendar, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CourseListSection({ courses }) {

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    // Fonction pour déterminer la couleur de fond en fonction de la catégorie (pour l'amélioration visuelle)
    const getCategoryColor = (categoryName) => {
        const name = categoryName?.toLowerCase() || "";
        if (name.includes("web") || name.includes("code")) return "bg-blue-50 text-blue-700 border-blue-100";
        if (name.includes("design") || name.includes("graphique")) return "bg-purple-50 text-purple-700 border-purple-100";
        if (name.includes("data")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
        if (name.includes("marketing")) return "bg-orange-50 text-orange-700 border-orange-100";
        return "bg-slate-50 text-slate-700 border-slate-100";
    };

    // Fonction pour le dégradé de l'en-tête de carte
    const getHeaderGradient = (categoryName) => {
        const name = categoryName?.toLowerCase() || "";
        if (name.includes("web") || name.includes("code")) return "from-blue-500/10 to-blue-500/5";
        if (name.includes("design") || name.includes("graphique")) return "from-purple-500/10 to-purple-500/5";
        if (name.includes("data")) return "from-emerald-500/10 to-emerald-500/5";
        if (name.includes("marketing")) return "from-orange-500/10 to-orange-500/5";
        return "from-slate-500/10 to-slate-500/5";
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-bold text-primary mb-2"
                        >
                            Prochaines formations
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-secondary"
                        >
                            Rejoignez un de nos ateliers pour développer de nouvelles compétences.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/formations" className="group text-primary font-bold hover:text-[#1a365d] flex items-center bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                            Voir le catalogue complet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                        <AlertCircle className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                        <h3 className="text-lg font-medium text-primary">Aucune formation disponible pour le moment</h3>
                        <p className="text-secondary mt-2">Revenez plus tard ou contactez-nous pour plus d&apos;informations.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                {/* En-tête décoratif avec dégradé */}
                                <div className={`h-2 w-full bg-gradient-to-r ${getHeaderGradient(course.categorie?.nom)}`}></div>

                                <div className="p-6 flex flex-col h-full relative">
                                    {/* Fond subtil en haut de la carte */}
                                    <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${getHeaderGradient(course.categorie?.nom)} opacity-50 pointer-events-none`}></div>

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryColor(course.categorie?.nom)}`}>
                                            {course.categorie?.nom}
                                        </span>
                                        {course.statut === "VALIDE" && (
                                            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                                                Ouvert
                                            </span>
                                        )}
                                    </div>

                                    <Link href={`/formations/${course.id}`}>
                                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors relative z-10 cursor-pointer">
                                            {course.titre}
                                        </h3>
                                    </Link>

                                    <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow relative z-10">
                                        {course.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-slate-100 relative z-10">
                                        <div className="flex items-center text-secondary text-sm">
                                            <Calendar size={16} className="mr-2 text-primary/70" />
                                            {formatDate(course.dateProposition)}
                                        </div>
                                        <div className="flex items-center text-secondary text-sm">
                                            <User size={16} className="mr-2 text-primary/70" />
                                            {course.formateur ? `${course.formateur.prenom} ${course.formateur.nom}` : 'Formateur expert'}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 flex items-center justify-between relative z-10">
                                        <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">
                                            {course.annee?.libelle}
                                        </span>
                                        <Link href={`/formations/${course.id}`} className="text-primary font-bold text-sm hover:underline flex items-center group/btn">
                                            Voir le détail <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

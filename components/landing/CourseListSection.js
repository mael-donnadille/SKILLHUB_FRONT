"use client";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import CourseCard from "@/components/courses/CourseCard";

export default function CourseListSection({ courses }) {
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
                            >
                                <CourseCard course={course} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

"use client";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { COURSES } from "@/data/mocks";
import { motion } from "framer-motion";

export default function CourseListSection() {
    return (
        <section className="py-20 bg-white">
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
                            Prochaines rentrées
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-secondary"
                        >
                            Rejoignez une de nos sessions annuelles et changez de métier.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/courses" className="group text-primary font-bold hover:text-[#1a365d] flex items-center bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                            Voir le catalogue complet <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {COURSES.map((course, index) => (
                        <motion.div 
                            key={course.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                        >
                            <div className="h-48 bg-slate-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500">
                                    <div className="w-full h-full bg-linear-to-t from-primary/50 to-transparent absolute z-10"></div>
                                </div>
                                
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm z-20">
                                    {course.category}
                                </div>
                                <div className="absolute bottom-4 left-4 text-white font-medium flex items-center gap-1 z-20">
                                    <MapPin size={16} /> {course.city}
                                </div>
                            </div>
                            <div className="p-6 grow flex flex-col">
                                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                                    {course.title}
                                </h3>
                                
                                <div className="space-y-3 mb-6 grow">
                                    <div className="flex items-center text-secondary text-sm">
                                        <Calendar size={16} className="mr-2 text-secondary" />
                                        {course.date}
                                    </div>
                                    <div className="flex items-center text-secondary text-sm">
                                        <Users size={16} className="mr-2 text-secondary" />
                                        Promo de 15 étudiants max
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-sm font-medium text-accent bg-orange-50 px-2 py-1 rounded-md">
                                        Plus que {course.spots} places
                                    </span>
                                    <button className="text-primary font-bold text-sm hover:underline flex items-center group/btn">
                                        Candidater <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

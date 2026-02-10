"use client";
import { STEPS } from "@/data/mocks";
import { motion } from "framer-motion";

export default function FeaturesSection() {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold text-primary mb-4"
                    >
                        Votre parcours vers la réussite
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-secondary max-w-2xl mx-auto"
                    >
                        Une pédagogie inversée axée sur la pratique et l&apos;échange, loin des cours magistraux classiques.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 -z-10"></div>

                    {STEPS.map((step, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center relative z-10 hover:shadow-md transition-shadow"
                        >
                            <div className="w-16 h-16 mx-auto bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6 text-xl font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                            <p className="text-secondary leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

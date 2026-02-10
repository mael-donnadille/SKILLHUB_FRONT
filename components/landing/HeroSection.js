"use client";

import {Search, MapPin, Calendar, Users} from "lucide-react";
import {motion} from "framer-motion";

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: "easeOut"}
    }
};

export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-28 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"/>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none"/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants}>
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-6 border border-blue-100">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Inscriptions ouvertes pour l&apos;année 2026
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-tight"
                    >
                        Des formations et des ateliers <br className="hidden md:block"/>
                        <span className="text-accent relative inline-block">
                            en présentiel
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    initial={{pathLength: 0}}
                                    animate={{pathLength: 1}}
                                    transition={{duration: 0.8, delay: 0.5}}
                                />
                            </svg>
                        </span> pour votre avenir
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Rejoignez nos ateliers immersifs, rencontrez des formateurs
                        experts et progressez au sein d&apos;une promo soudée et en effectif reduit.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2 mb-12 relative z-10"
                    >
                        <div className="grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-secondary"/>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 sm:bg-transparent transition-all"
                                placeholder="Quel domaine vous intéresse ? (ex: Design, Code...)"
                            />
                        </div>
                        <motion.button
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors flex items-center justify-center"
                        >
                            Trouver un atelier
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-8 text-secondary text-sm font-medium"
                    >
                        {[
                            {icon: Users, text: "Apprentissage en groupe"},
                            {icon: MapPin, text: "Campus dans 5 villes"},
                            {icon: Calendar, text: "Participez à des ateliers"}
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 cursor-default hover:text-primary transition-colors"
                            >
                                <item.icon className="text-accent h-5 w-5"/>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

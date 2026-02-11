"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background elements - CSS Animation instead of JS for performance */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '5s' }} />

            <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-primary mb-6"
                >
                    Venez vous inscrire en ligne ou sur place dans nos locaux dans toute la France.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-secondary mb-10"
                >
                    Ne manquez pas l&apos;opportunité de rejoindre une communauté passionnée. Les places sont limitées pour garantir la qualité du suivi.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link href="/register" className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-[#1a365d] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        Déposer ma candidature
                    </Link>
                    <Link href="/faq" className="inline-block px-10 py-4 bg-white text-primary border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 hover:-translate-y-0.5 transition-all">
                        Questions fréquentes
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

const FAQ_DATA = [
    {
        category: "Général",
        items: [
            { question: "Qu'est-ce que SkillHub ?", answer: "SkillHub est une plateforme de mise en relation pour des formations en présentiel. Nous connectons des apprenants avec des formateurs experts pour des ateliers pratiques et intensifs." },
            { question: "Où se déroulent les formations ?", answer: "Nos formations ont lieu dans nos campus partenaires situés dans les grandes villes de France (Paris, Lyon, Bordeaux, Lille, Nantes). L'adresse exacte est communiquée lors de l'inscription." },
            { question: "Qui sont les formateurs ?", answer: "Nos formateurs sont des professionnels en activité, sélectionnés pour leur expertise technique et leur pédagogie. Ils sont évalués par les apprenants à chaque session." }
        ]
    },
    {
        category: "Formations",
        items: [
            { question: "Quels sont les prérequis ?", answer: "Les prérequis varient selon le niveau de la formation (Débutant, Intermédiaire, Avancé). Ils sont détaillés sur chaque fiche de cours. Pour les débutants, aucune connaissance préalable n'est requise." },
            { question: "Faut-il apporter son matériel ?", answer: "Oui, il est généralement demandé de venir avec son propre ordinateur portable. Pour certaines formations spécifiques (ex: hardware), du matériel peut être fourni sur place." },
            { question: "Quelle est la durée des ateliers ?", answer: "La durée varie de 1 jour (atelier intensif) à 5 jours (bootcamp). Les horaires sont généralement de 9h30 à 17h30." }
        ]
    },
    {
        category: "Financement",
        items: [
            { question: "Puis-je utiliser mon CPF ?", answer: "Oui, une grande partie de nos formations certifiantes sont éligibles au CPF. Vous pouvez vérifier cette mention sur la page de la formation." },
            { question: "Proposez-vous des facilités de paiement ?", answer: "Tout à fait. Nous proposons le paiement en 3x ou 4x sans frais par carte bancaire pour toute inscription supérieure à 500€." },
            { question: "Y a-t-il des tarifs réduits ?", answer: "Nous offrons -15% pour les étudiants et les demandeurs d'emploi sur présentation d'un justificatif valide." }
        ]
    },
    {
        category: "Certification",
        items: [
            { question: "Obtient-on un diplôme à la fin ?", answer: "Vous recevez une attestation de réussite SkillHub. Pour les cursus certifiants, vous passez un examen final qui peut mener à une certification reconnue par l'État (RNCP/RS)." },
            { question: "Comment valoriser cette formation ?", answer: "Vous recevez un badge numérique certifié que vous pouvez ajouter directement sur votre profil LinkedIn. Nos attestations sont reconnues par de nombreuses entreprises partenaires." }
        ]
    }
];

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState(null); // Format: "categoryIndex-itemIndex"
    const [activeCategory, setActiveCategory] = useState("Général");

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredData = FAQ_DATA.find(cat => cat.category === activeCategory);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <main className="grow">
                {/* Hero */}
                <section className="bg-primary text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-6"
                        >
                            Questions Fréquentes
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-blue-100 text-lg max-w-2xl mx-auto"
                        >
                            Tout ce que vous devez savoir sur le fonctionnement de SkillHub, nos formations et nos modalités.
                        </motion.p>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-16 max-w-5xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Categories */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                                <h3 className="font-bold text-primary mb-4 px-2">Catégories</h3>
                                <div className="space-y-1">
                                    {FAQ_DATA.map((cat) => (
                                        <button
                                            key={cat.category}
                                            onClick={() => {
                                                setActiveCategory(cat.category);
                                                setOpenIndex(null);
                                            }}
                                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium text-sm ${activeCategory === cat.category ? 'bg-blue-50 text-accent' : 'text-secondary hover:bg-slate-50 hover:text-primary'}`}
                                        >
                                            {cat.category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="grow">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-primary mb-6">{activeCategory}</h2>
                                <div className="space-y-4">
                                    {filteredData?.items.map((item, idx) => {
                                        const uniqueId = `${activeCategory}-${idx}`;
                                        const isOpen = openIndex === uniqueId;

                                        return (
                                            <div
                                                key={idx}
                                                className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-accent shadow-md bg-white' : 'border-slate-200 bg-white hover:border-blue-200'}`}
                                            >
                                                <button
                                                    onClick={() => toggleAccordion(uniqueId)}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                                >
                                                    <span className={`font-semibold text-lg ${isOpen ? 'text-accent' : 'text-primary'}`}>
                                                        {item.question}
                                                    </span>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-5 w-5 text-accent flex-shrink-0" />
                                                    ) : (
                                                        <ChevronDown className="h-5 w-5 text-secondary flex-shrink-0" />
                                                    )}
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <div className="px-6 pb-6 pt-0 text-secondary leading-relaxed border-t border-transparent">
                                                                {item.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="h-8 w-8 text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary mb-4">Vous ne trouvez pas votre réponse ?</h2>
                        <p className="text-secondary mb-8">
                            Notre centre d&apos;aide contient des guides détaillés pour résoudre vos problèmes spécifiques.
                        </p>
                        <Link href="/help" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Aller au Centre d&apos;aide
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

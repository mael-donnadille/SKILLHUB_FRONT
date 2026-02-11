"use client";

import { Search, Calendar, Users, Award } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Search,
        title: "Explorez nos formations",
        description: "Parcourez notre catalogue de formations et trouvez celle qui correspond à vos objectifs professionnels.",
    },
    {
        number: "02",
        icon: Calendar,
        title: "Choisissez votre session",
        description: "Sélectionnez la date qui vous convient parmi les sessions disponibles et inscrivez-vous en quelques clics.",
    },
    {
        number: "03",
        icon: Users,
        title: "Participez en présentiel",
        description: "Rejoignez nos formateurs experts et apprenez aux côtés d'autres professionnels motivés dans nos campus.",
    },
    {
        number: "04",
        icon: Award,
        title: "Obtenez votre certificat",
        description: "Validez vos nouvelles compétences et recevez un certificat reconnu pour booster votre carrière.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                        Comment ça marche ?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Rejoignez SkillHub en 4 étapes simples et commencez votre parcours de formation dès aujourd'hui
                    </p>
                </div>

                {/* Timeline Desktop */}
                <div className="hidden lg:block relative">
                    {/* Ligne de connexion */}
                    <div className="absolute top-16 left-0 right-0 h-0.5 bg-slate-200"></div>

                    <div className="grid grid-cols-4 gap-8">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            return (
                                <div key={index} className="relative group">
                                    {/* Numéro avec cercle */}
                                    <div className="flex justify-center mb-8 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <span className="text-lg font-bold text-white">{step.number}</span>
                                        </div>
                                    </div>

                                    {/* Carte */}
                                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-72 flex flex-col">
                                        {/* Icône */}
                                        <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-100 transition-colors">
                                            <IconComponent size={28} className="text-primary" strokeWidth={2} />
                                        </div>

                                        {/* Contenu */}
                                        <h3 className="text-xl font-bold text-primary mb-3 text-center">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm text-center leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Timeline Mobile/Tablet */}
                <div className="lg:hidden space-y-6">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        return (
                            <div key={index} className="relative flex gap-4">
                                {/* Ligne verticale */}
                                {index < steps.length - 1 && (
                                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-slate-200"></div>
                                )}

                                {/* Numéro */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                                        <span className="text-lg font-bold text-white">{step.number}</span>
                                    </div>
                                </div>

                                {/* Carte */}
                                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                                    {/* Icône */}
                                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                        <IconComponent size={24} className="text-primary" strokeWidth={2} />
                                    </div>

                                    {/* Contenu */}
                                    <h3 className="text-lg font-bold text-primary mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <a
                        href="/formations"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <span>Découvrir nos formations</span>
                        <span className="text-xl">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

import { getFormation } from "@/services/formationService";
import BackButton from "@/components/ui/BackButton";
import { notFound } from "next/navigation";
import { Calendar, User, Award } from "lucide-react";

export default async function FormationDetailsPage({ params }) {
    const { id } = await params;
    const formation = await getFormation(id);

    if (!formation) {
        notFound();
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <main className="grow">
                {/* Hero Section */}
                <section className="bg-primary text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-8">
                            <BackButton className="text-white hover:!text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-white/10 text-white border border-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                        {formation.categorie?.nom}
                                    </span>
                                    {formation.statut === "VALIDE" && (
                                        <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-sm font-medium">
                                            Ouvert aux inscriptions
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                                    {formation.titre}
                                </h1>

                                <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
                                    {formation.description}
                                </p>

                                <div className="flex flex-wrap gap-6 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="text-accent" size={20} />
                                        <span>Prochaine session : {formatDate(formation.dateProposition)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="text-accent" size={20} />
                                        <span>
                                            Formateur : {formation.formateur ? `${formation.formateur.prenom} ${formation.formateur.nom}` : 'Expert SkillHub'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 z-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Interaction Area */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description Detail */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-bold text-primary mb-6">Description Détaillée</h2>
                                <div className="prose prose-slate max-w-none text-secondary">
                                    <p>
                                        {formation.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 sticky top-24">
                                <h3 className="text-xl font-bold text-primary mb-6">Détails pratiques</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                        <span className="text-slate-500 flex items-center gap-2">
                                            <Calendar size={16} /> Date
                                        </span>
                                        <span className="font-bold text-primary">{formatDate(formation.dateProposition)}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-slate-50">
                                        <span className="text-slate-500 flex items-center gap-2">
                                            <Award size={16} /> Année
                                        </span>
                                        <span className="font-bold text-primary">{formation.annee?.libelle}</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-[#1a365d] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
                                        S'inscrire maintenant
                                    </button>
                                    <p className="text-center text-xs text-slate-400">
                                        Places limitées - Inscription sécurisée
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

"use client";
import { Shield, Lock, Eye, FileText, Scale } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <main className="grow">
                {/* Header */}
                <section className="bg-primary text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                    </div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Politique de Confidentialité</h1>
                        <p className="text-blue-100 text-lg">
                            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 max-w-4xl mx-auto px-4">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200 prose prose-slate max-w-none">

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Shield size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">1. Introduction</h2>
                                <p className="text-secondary leading-relaxed">
                                    Chez SkillHub, nous accordons une importance majeure à la confidentialité de vos données.
                                    Cette politique vise à vous informer en toute transparence sur les données que nous collectons,
                                    l'utilisation que nous en faisons et vos droits concernant ces informations.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Eye size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">2. Données collectées</h2>
                                <p className="text-secondary mb-4">
                                    Nous collectons les informations suivantes lorsque vous utilisez notre plateforme :
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-secondary">
                                    <li><strong>Identité :</strong> Nom, prénom.</li>
                                    <li><strong>Contact :</strong> Adresse email, numéro de téléphone.</li>
                                    <li><strong>Professionnel :</strong> CV, poste actuel, compétences (pour les formateurs et candidatures).</li>
                                    <li><strong>Technique :</strong> Adresse IP, type de navigateur, données de navigation (via cookies).</li>
                                </ul>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <FileText size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">3. Utilisation des données</h2>
                                <p className="text-secondary mb-4">Vos données sont utilisées pour :</p>
                                <ul className="list-disc pl-5 space-y-2 text-secondary">
                                    <li>Gérer votre inscription et votre compte utilisateur.</li>
                                    <li>Vous mettre en relation avec des formateurs ou des sessions de formation.</li>
                                    <li>Vous envoyer des informations administratives (confirmations, factures, mises à jour).</li>
                                    <li>Améliorer notre site et nos services grâce à l'analyse de l'audience.</li>
                                </ul>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Lock size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">4. Sécurité et Partage</h2>
                                <p className="text-secondary mb-4">
                                    Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données.
                                    Nous ne vendons jamais vos données personnelles. Elles peuvent être partagées uniquement avec :
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-secondary">
                                    <li>Nos prestataires de services (hébergement, paiement, email) sous contrat de confidentialité.</li>
                                    <li>Les autorités légales si la loi l'exige.</li>
                                </ul>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Scale size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">5. Vos droits (RGPD)</h2>
                                <p className="text-secondary mb-4">
                                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-secondary mb-6">
                                    <li><strong>Accès :</strong> Obtenir une copie de vos données.</li>
                                    <li><strong>Rectification :</strong> Corriger des données inexactes.</li>
                                    <li><strong>Suppression :</strong> Demander l'effacement de vos données ("droit à l'oubli").</li>
                                    <li><strong>Opposition :</strong> Refuser le traitement de vos données à des fins marketing.</li>
                                </ul>
                                <p className="text-secondary">
                                    Pour exercer ces droits, contactez notre Délégué à la Protection des Données à : <a href="mailto:privacy@skillhub.com" className="text-primary font-bold hover:underline">privacy@skillhub.com</a>
                                </p>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}

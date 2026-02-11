"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, FileText, UserCheck, ShieldAlert, Copyright, Globe } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Navbar />

            <main className="grow">
                {/* Header */}
                <section className="bg-primary text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                    </div>
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Conditions d&apos;Utilisation</h1>
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
                                <FileText size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">1. Objet</h2>
                                <p className="text-secondary leading-relaxed">
                                    Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site SkillHub et les conditions d&apos;utilisation du service par l&apos;Utilisateur.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Globe size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">2. Accès au site</h2>
                                <p className="text-secondary mb-4">
                                    Le site est accessible gratuitement à tout Utilisateur disposant d&apos;un accès à internet. Tous les coûts afférents à l&apos;accès au service, que ce soient les frais matériels, logiciels ou d&apos;accès à internet sont exclusivement à la charge de l&apos;Utilisateur.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <UserCheck size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">3. Compte Utilisateur</h2>
                                <p className="text-secondary mb-4">
                                    L&apos;accès à certains services nécessite la création d&apos;un compte. L&apos;Utilisateur s&apos;engage à fournir des informations sincères et exactes.
                                    Il est responsable du maintien de la confidentialité de ses identifiants et mot de passe.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Copyright size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">4. Propriété intellectuelle</h2>
                                <p className="text-secondary mb-4">
                                    Les marques, logos, signes ainsi que tout le contenu du site (textes, images, son...) font l&apos;objet d&apos;une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d&apos;auteur.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <ShieldAlert size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">5. Responsabilités</h2>
                                <p className="text-secondary mb-4">
                                    SkillHub ne saurait être tenu pour responsable d&apos;éventuels virus qui pourraient infecter l&apos;ordinateur ou tout matériel informatique de l&apos;Internaute, suite à une utilisation, à l&apos;accès, ou au téléchargement provenant de ce site.
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-100 my-8" />

                        <div className="flex items-start gap-4 mb-8">
                            <div className="p-3 bg-blue-50 rounded-xl text-primary">
                                <Scale size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-primary mb-2 mt-0">6. Droit applicable</h2>
                                <p className="text-secondary mb-4">
                                    La législation française s&apos;applique au présent contrat. En cas d&apos;absence de résolution amiable d&apos;un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

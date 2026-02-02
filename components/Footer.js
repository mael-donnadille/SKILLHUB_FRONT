import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Colonne 1 : Logo et description */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-2 -ml-2">
                            Skill Hub
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            La plateforme idéale pour développer vos compétences et connecter avec des experts du monde entier.
                        </p>
                    </div>

                    {/* Colonne 2 : Navigation */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-6">Plateforme</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Parcourir les cours
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Trouver un mentor
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Pour les entreprises
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 : Légal */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-6">Support & Légal</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Centre d&apos;aide
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-1 -ml-1">
                                    Conditions d&apos;utilisation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 : Réseaux sociaux */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 tracking-wider uppercase mb-6">Restons connectés</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="mailto:contact@skillhub.com" className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm font-medium">
                        &copy; {currentYear} Skill Hub Inc. Tous droits réservés.
                    </p>
                    <div className="flex space-x-6">
                        <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs font-medium text-slate-500">Systèmes opérationnels</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

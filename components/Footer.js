import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-auto">
            <div className="w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 -ml-2">
                            SkillHub
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            La plateforme idéale pour développer de nouvelles compétences.
                        </p>
                    </div>

                    <div className={"md:mx-auto"}>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Navigation</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 -ml-1">
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 -ml-1">
                                    Formations
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 -ml-1">
                                    Formateurs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={"md:mx-auto"}>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Légal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 -ml-1">
                                    Confidentialité
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 -ml-1">
                                    Conditions d&apos;utilisation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className={"md:ml-auto md:text-right"}>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Suivez-nous</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1" aria-label="Twitter">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1" aria-label="GitHub">
                                <Github size={20} />
                            </a>
                            <a href="mailto:contact@skillhub.com" className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1" aria-label="Email">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-center text-gray-400 text-sm">
                        &copy; {currentYear} Skill Hub. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    )
}

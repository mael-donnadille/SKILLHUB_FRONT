import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-background border-t border-slate-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-extrabold text-primary hover:text-[#1a365d] transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-2 -ml-2">SkillHub</Link>
                        <p className="text-secondary text-sm leading-relaxed max-w-xs">La plateforme idéale pour développer vos compétences et connecter avec des experts du monde entier.</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-6">Plateforme</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Parcourir les formations</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Trouver un formateur</Link>
                            </li>
                            <li>
                                <Link href="/administrateur" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Panel administrateur</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-6">Support & Légal</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Centre d&apos;aide</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Confidentialité</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-secondary hover:text-primary text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-1 -ml-1">Conditions d&apos;utilisation</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-6">Restons connectés</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-secondary hover:text-primary hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-secondary hover:text-primary hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" className="bg-slate-50 p-2 rounded-xl text-secondary hover:text-primary hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary" aria-label="GitHub"><Github size={20}/></a>
                            <a href="mailto:contact@skillhub.com" className="bg-slate-50 p-2 rounded-xl text-secondary hover:text-accent hover:bg-orange-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Email"><Mail size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-secondary text-sm font-medium">&copy; {currentYear} Skill Hub Inc. Tous droits réservés.</p>
                    <div className="flex space-x-6">
                        <span className="flex items-center space-x-2">
                            <span className="w-2 h-2 rounded-full bg-success"></span>
                            <span className="text-xs font-medium text-secondary">Systèmes opérationnels</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

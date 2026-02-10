"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const isConnected = false;

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="w-full bg-background/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center" aria-label="Navigation principale">
                <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold text-primary hover:text-[#1a365d] transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-2">
                    <Image src="/logo.png" alt="SkillHub logo" width={65} height={65} className={"mr-2 rounded-full"}></Image>
                    <span>SkillHub</span>
                </Link>

                <ul className="hidden md:flex space-x-4">
                    <li>
                        <Link href="#" className="text-secondary hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2">Formations</Link>
                    </li>
                    <li>
                        <Link href="#" className="text-secondary hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2">Catégories</Link>
                    </li>
                    <li>
                        <Link href="#" className="text-secondary hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-xl px-3 py-2">Formateurs</Link>
                    </li>
                </ul>

                <div className="hidden md:flex items-center space-x-4">
                    {isConnected ? (
                        <>
                            <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-[#1a365d] hover:bg-blue-50 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary">
                                <User size={20} aria-hidden="true" />
                                <span className="font-medium">Compte</span>
                            </Link>
                            <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 bg-red-50 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Se déconnecter">
                                <LogOut size={18} aria-hidden="true" />
                                <span className="font-medium">Déconnexion</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="px-5 py-2.5 text-primary font-bold hover:bg-blue-50 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary">Connexion</Link>
                            <Link href="/register" className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">Inscription</Link>
                        </>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-xl text-primary hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden bg-background border-t border-slate-100 absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-primary hover:text-[#1a365d] hover:bg-blue-50">Formations</Link>
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-primary hover:text-[#1a365d] hover:bg-blue-50">Catégories</Link>
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-primary hover:text-[#1a365d] hover:bg-blue-50">Formateurs</Link>
                        <div className="border-t border-slate-100 my-2 pt-2">
                            {isConnected ? (
                                <>
                                    <Link href="/profile" className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-medium text-primary hover:bg-blue-50">
                                        <User size={20} />
                                        <span>Mon Compte</span>
                                    </Link>
                                    <button className="w-full flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 text-left">
                                        <LogOut size={20} />
                                        <span>Déconnexion</span>
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 mt-4 px-2">
                                    <Link href="/login" className="flex justify-center items-center px-4 py-3 border border-slate-200 rounded-xl text-base font-bold text-primary hover:bg-blue-50">Connexion</Link>
                                    <Link href="/register" className="flex justify-center items-center px-4 py-3 bg-primary rounded-xl text-base font-bold text-white hover:bg-[#1a365d]">Inscription</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User, LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Vous pouvez gérer l'état de connexion ici
    const isConnected = false;

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center" aria-label="Navigation principale">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-2">
                    Skill Hub
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8">
                    <li>
                        <Link href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2">
                            Cours
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2">
                            Mentors
                        </Link>
                    </li>
                    <li>
                        <Link href="#" className="text-slate-600 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl px-3 py-2">
                            Entreprises
                        </Link>
                    </li>
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    {isConnected ? (
                        <>
                            <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                            <Link href="/login" className="px-5 py-2.5 text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Connexion
                            </Link>
                            <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Inscription
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div id="mobile-menu" className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl animate-in slide-in-from-top-5 duration-200">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                            Cours
                        </Link>
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                            Mentors
                        </Link>
                        <Link href="#" className="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50">
                            Entreprises
                        </Link>
                        <div className="border-t border-slate-100 my-2 pt-2">
                            {isConnected ? (
                                <>
                                    <Link href="/profile" className="flex items-center space-x-2 px-3 py-3 rounded-xl text-base font-medium text-slate-700 hover:bg-slate-50">
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
                                    <Link href="/login" className="flex justify-center items-center px-4 py-3 border border-slate-200 rounded-xl text-base font-bold text-slate-700 hover:bg-slate-50">
                                        Connexion
                                    </Link>
                                    <Link href="/register" className="flex justify-center items-center px-4 py-3 bg-blue-600 rounded-xl text-base font-bold text-white hover:bg-blue-700">
                                        Inscription
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

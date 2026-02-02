import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export default function Navbar() {
    const isConnected = true;

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <nav className="w-screen mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center" aria-label="Navigation principale">
                <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2">
                    SkillHub
                </Link>

                <ul className="hidden md:flex space-x-8">
                    <li>
                        <Link href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1">
                            Formations
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center space-x-4">
                    {isConnected ? (
                        <>
                            <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <User size={20} aria-hidden="true" />
                                <span className="font-medium">Compte</span>
                            </Link>
                            <button className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 bg-red-50 rounded-md hover:bg-red-100 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Se déconnecter">
                                <LogOut size={18} aria-hidden="true" />
                                <span className="font-medium">Déconnexion</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Connexion
                            </Link>
                            <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Inscription
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
            <div className="bg-blue-50 p-6 rounded-full mb-8 animate-bounce">
                <AlertCircle size={64} className="text-primary" />
            </div>
            
            <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-primary mb-6">Page introuvable</h2>
            
            <p className="text-secondary max-w-md mb-10 text-lg">
                Oups ! La page que vous recherchez semble avoir disparu ou n&apos;a jamais existé.
            </p>
            
            <Link 
                href="/" 
                className="flex items-center px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-[#1a365d] transition-all shadow-lg hover:shadow-xl"
            >
                <Home className="mr-2 h-5 w-5" />
                Retour à l&apos;accueil
            </Link>
        </div>
    );
}

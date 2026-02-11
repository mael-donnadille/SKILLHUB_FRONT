'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-primary mb-2">Oups ! Une erreur est survenue</h2>
                <p className="text-secondary mb-8">
                    Nous n'avons pas pu charger cette page. Cela peut venir de votre connexion ou de nos serveurs.
                </p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-white border border-slate-200 text-primary font-bold rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        Actualiser
                    </button>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors shadow-lg hover:shadow-xl"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        </div>
    );
}

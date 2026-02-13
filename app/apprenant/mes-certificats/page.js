"use client";

import { Award } from "lucide-react";

export default function MyCertificatesPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Mes Certificats</h1>

            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award size={40} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Aucun certificat disponible</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Vos certificats de réussite apparaîtront ici une fois que vous aurez validé vos formations lors des ateliers.
                </p>
            </div>
        </div>
    );
}

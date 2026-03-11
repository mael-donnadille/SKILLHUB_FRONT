"use client";

import { FileText } from "lucide-react";

export default function FormateurEvaluationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Évaluations</h1>
                    <p className="text-muted-foreground mt-1">Consultez et corrigez les évaluations de vos apprenants.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Aucune évaluation</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Vous n&apos;avez pas encore créé ou reçu de copies à corriger.
                </p>
            </div>
        </div>
    );
}

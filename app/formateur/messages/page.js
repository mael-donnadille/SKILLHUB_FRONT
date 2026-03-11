"use client";

import { MessageSquare } from "lucide-react";

export default function FormateurMessagesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Messages</h1>
                    <p className="text-muted-foreground mt-1">Communiquez avec vos apprenants et l&apos;administration.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Boîte de réception vide</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                    Vous n&apos;avez aucun message en cours.
                </p>
            </div>
        </div>
    );
}

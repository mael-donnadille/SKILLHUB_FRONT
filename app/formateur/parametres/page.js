"use client";

import { Settings, User, Bell, Lock } from "lucide-react";

export default function FormateurParametresPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Paramètres</h1>
                    <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et vos préférences.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Menu latéral des paramètres */}
                <div className="col-span-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl font-medium transition-colors">
                        <User className="w-5 h-5" />
                        Profil public
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <Lock className="w-5 h-5" />
                        Sécurité
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors">
                        <Bell className="w-5 h-5" />
                        Notifications
                    </button>
                </div>

                {/* Contenu actif */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        <h2 className="text-xl font-bold text-foreground mb-6">Informations du profil</h2>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
                                    <User className="w-8 h-8 text-slate-400" />
                                </div>
                                <div>
                                    <button className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors">
                                        Changer l&apos;avatar
                                    </button>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Prénom</label>
                                        <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Votre prénom" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700">Nom</label>
                                        <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Votre nom" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Adresse électronique</label>
                                    <input type="email" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="votre@email.fr" />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-slate-700">Biographie courte</label>
                                    <textarea rows="4" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="Dites-en plus sur vous..."></textarea>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <button type="button" className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                        Enregistrer
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

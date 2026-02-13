"use client";

import { useState } from "react";
import { Save, Bell, Shield, Globe, Mail } from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    const tabs = [
        { id: "general", label: "Général", icon: Globe },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Sécurité", icon: Shield },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-foreground">Paramètres de la Plateforme</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                            ? "bg-white text-primary shadow-sm border border-slate-200"
                                            : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                        {activeTab === "general" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold border-b border-slate-100 pb-4 mb-6">Informations Générales</h2>

                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Nom de la Plateforme</label>
                                        <input type="text" defaultValue="SkillHub" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Email de Contact</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                            <input type="email" defaultValue="contact@skillhub.fr" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Mode Maintenance</label>
                                        <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl bg-slate-50">
                                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300" />
                                                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
                                            </div>
                                            <span className="text-sm text-muted-foreground">Activer le mode maintenance pour empêcher l&apos;accès aux utilisateurs.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold border-b border-slate-100 pb-4 mb-6">Préférences de Notifications</h2>
                                <p className="text-muted-foreground text-sm">Configurez les alertes email automatiques.</p>
                                {/* Mock toggles */}
                                {['Nouvelle inscription', 'Validation de formation requise', 'Rappel atelier (J-1)'].map((label, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0">
                                        <span className="text-sm text-foreground font-medium">{label}</span>
                                        <div className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <h2 className="text-lg font-bold border-b border-slate-100 pb-4 mb-6">Sécurité</h2>
                                <button className="text-primary font-medium hover:underline text-sm">Changer le mot de passe administrateur</button>
                            </div>
                        )}

                        <div className="pt-8 mt-8 border-t border-slate-100 flex justify-end">
                            <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                <Save size={18} />
                                Enregistrer les modifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, UserPlus, Star, Shield, Zap } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register attempt:", formData);
        // Backend integration to come later
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
            {/* Left Side - Form (50%) */}
            <div className="w-full max-h-screen lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative z-10 bg-white">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="inline-flex items-center text-slate-500 hover:text-primary font-medium transition-colors">
                        <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                        Retour à l'accueil
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg space-y-8 mt-10"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="flex justify-left items-center gap-3 text-4xl font-extrabold text-primary tracking-tight">
                            <div className="mx-auto lg:mx-0 h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <UserPlus className="h-6 w-6 text-primary" />
                            </div>
                            Créer un compte
                        </h2>
                        <p className="mt-3 text-lg text-secondary">
                            Remplissez le formulaire ci-dessous pour commencer.
                        </p>
                    </div>

                    <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold text-primary mb-2">
                                    Prénom
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white sm:text-sm transition-all duration-200"
                                        placeholder="Jean"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold text-primary mb-2">
                                    Nom
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white sm:text-sm transition-all duration-200"
                                        placeholder="Dupont"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                                Adresse Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white sm:text-sm transition-all duration-200"
                                    placeholder="vous@exemple.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-primary mb-2">
                                Mot de passe
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white sm:text-sm transition-all duration-200"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-slate-500">
                                Au moins 8 caractères avec des lettres et des chiffres.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-[#1a365d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 mt-2"
                        >
                            Créer mon compte
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </form>

                    <div className="text-center pt-4">
                        <p className="text-secondary">
                            Déjà inscrit ?{' '}
                            <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right Side - Image/Content (50%) */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-transparent"></div>

                <div className="relative z-10 max-w-lg text-white">
                    <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-sm">
                        <Star className="w-4 h-4 mr-2" fill="currentColor" />
                        Rejoignez l'élite
                    </div>
                    <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                        Lancez votre carrière avec SkillHub
                    </h1>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                        Créez votre compte aujourd'hui et accédez à une bibliothèque de ressources premium pour transformer vos compétences.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <Shield className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Sécurisé & Privé</h3>
                            <p className="text-sm text-slate-400">Vos données sont protégées avec les meilleurs standards.</p>
                        </div>
                        <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                            <h3 className="font-bold text-lg mb-2">Accès Immédiat</h3>
                            <p className="text-sm text-slate-400">Commencez à apprendre dès la validation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

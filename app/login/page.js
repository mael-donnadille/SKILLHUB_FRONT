"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Star, Shield, Zap } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempt:", formData);
        // Backend integration to come later
    };

    return (
        <div className="min-h-screen max-h-screen min-w-screen max-w-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
            <div className="flex h-full w-full">
                {/* Left Side - Form (50%) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative z-10 bg-white">
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
                        className="w-full max-w-md space-y-8"
                    >
                        <div className="text-center lg:text-left">
                            <div className="mx-auto lg:mx-0 h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                                <User className="h-7 w-7 text-primary" />
                            </div>
                            <h2 className="text-4xl font-extrabold text-primary tracking-tight">Bon retour !</h2>
                            <p className="mt-3 text-lg text-secondary">
                                Connectez-vous pour continuer votre apprentissage.
                            </p>
                        </div>

                        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-5">
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
                                            placeholder="exemple@skillhub.fr"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label htmlFor="password" className="block text-sm font-semibold text-primary">
                                            Mot de passe
                                        </label>
                                        <a href="#" className="text-sm font-medium text-primary hover:text-accent transition-colors">
                                            Oublié ?
                                        </a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
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
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer select-none">
                                    Se souvenir de moi
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-[#1a365d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5"
                            >
                                Se connecter
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </form>

                        <div className="text-center pt-4">
                            <p className="text-secondary">
                                Pas encore de compte ?{' '}
                                <Link href="/register" className="font-bold text-primary hover:text-accent transition-colors">
                                    Créer un compte gratuitement
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Image/Content (50%) */}
                <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-transparent"></div>

                    <div className="relative z-10 max-w-lg text-white">
                        <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-sm">
                            <Star className="w-4 h-4 mr-2" fill="currentColor" />
                            Accédez à l'excellence
                        </div>
                        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
                            Continuez votre progression
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                            Retrouvez vos formations, vos certificats et rejoignez votre communauté d'apprentissage.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Shield className="h-8 w-8 text-blue-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Espace Personnel</h3>
                                <p className="text-sm text-slate-400">Retrouvez tout votre historique en un clic.</p>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                                <h3 className="font-bold text-lg mb-2">Reprise Rapide</h3>
                                <p className="text-sm text-slate-400">Reprenez exactement là où vous vous êtes arrêté.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle, Code, PenTool, BarChart, Globe, Star, PlayCircle, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section - Simplifié et plus aéré */}
                <section className="relative pt-24 pb-32 overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium text-sm mb-8 border border-blue-100">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                                Nouveau : Formation IA disponible
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                                Maîtrisez votre <br className="hidden md:block" />
                                <span className="text-blue-600">avenir professionnel</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Accédez à une éducation de classe mondiale. Des mentors experts, des projets concrets et une communauté passionnée.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1">
                                    Commencer maintenant
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link href="/courses" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50">
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    Découvrir
                                </Link>
                            </div>
                            
                            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap justify-center gap-8 text-slate-500 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-500 h-5 w-5" />
                                    <span>Pas de carte requise</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-500 h-5 w-5" />
                                    <span>Annulation à tout moment</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="text-green-500 h-5 w-5" />
                                    <span>Certificats reconnus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Section - Minimaliste */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900">Explorez par catégorie</h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: 'Développement', icon: Code, color: 'text-blue-600 bg-blue-50' },
                                { name: 'Design & UX', icon: PenTool, color: 'text-purple-600 bg-purple-50' },
                                { name: 'Business', icon: BarChart, color: 'text-indigo-600 bg-indigo-50' },
                                { name: 'Langues', icon: Globe, color: 'text-pink-600 bg-pink-50' },
                            ].map((category) => (
                                <Link href="#" key={category.name} className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 hover:border-blue-200 group">
                                    <div className={`p-4 rounded-xl ${category.color} mb-4 group-hover:scale-110 transition-transform`}>
                                        <category.icon size={32} />
                                    </div>
                                    <span className="font-bold text-slate-900">{category.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Popular Courses Section - Épuré */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-end mb-12">
                            <h2 className="text-3xl font-bold text-slate-900">Cours populaires</h2>
                            <Link href="/courses" className="text-blue-600 font-bold hover:text-blue-700 flex items-center">
                                Tout voir <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="group bg-white rounded-2xl border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                                    <div className="h-48 bg-slate-100 relative">
                                        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                            Développement
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-1 mb-2">
                                            <Star size={16} className="text-yellow-400 fill-current" />
                                            <span className="text-sm font-bold text-slate-700">4.8</span>
                                            <span className="text-sm text-slate-400">(120 avis)</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            Fullstack React & Next.js Masterclass
                                        </h3>
                                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                                                <span className="text-sm font-medium text-slate-600">Alex Dev</span>
                                            </div>
                                            <span className="font-bold text-blue-600">49€</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section - Simple bande */}
                <section className="py-16 bg-blue-600 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-500/50">
                            <div className="px-4">
                                <div className="text-4xl font-extrabold mb-1">15k+</div>
                                <div className="text-blue-100 font-medium">Étudiants formés</div>
                            </div>
                            <div className="px-4">
                                <div className="text-4xl font-extrabold mb-1">4.9/5</div>
                                <div className="text-blue-100 font-medium">Note moyenne</div>
                            </div>
                            <div className="px-4">
                                <div className="text-4xl font-extrabold mb-1">92%</div>
                                <div className="text-blue-100 font-medium">Taux d&apos;embauche</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section - Centré et direct */}
                <section className="py-24 bg-slate-50">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Prêt à transformer votre carrière ?
                        </h2>
                        <p className="text-lg text-slate-600 mb-10">
                            Rejoignez notre communauté d&apos;apprenants dès aujourd&apos;hui. C&apos;est gratuit pour commencer.
                        </p>
                        <Link href="/register" className="inline-block px-10 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 hover:shadow-lg transition-all">
                            Créer un compte gratuit
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

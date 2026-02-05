import { Search, MapPin, Calendar, Users } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative pt-20 pb-28 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-6 border border-blue-100">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                        Inscriptions ouvertes pour la rentrée 2026
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-tight">
                        Des formations pratiques <br className="hidden md:block" />
                        <span className="text-accent">en présentiel</span> pour votre avenir
                    </h1>
                    <p className="text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                        Ne restez pas seul devant un écran. Rejoignez nos ateliers immersifs, connectez avec des mentors experts et progressez au sein d&apos;une promo soudée.
                    </p>

                    <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2 mb-12">
                        <div className="grow relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-secondary" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 sm:bg-transparent"
                                placeholder="Quel domaine vous intéresse ? (ex: Design, Code...)"
                            />
                        </div>
                        <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors flex items-center justify-center">
                            Trouver un atelier
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-secondary text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Users className="text-accent h-5 w-5" />
                            <span>Apprentissage en groupe</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="text-accent h-5 w-5" />
                            <span>Campus dans 5 villes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="text-accent h-5 w-5" />
                            <span>Suivi toute le long de la formation</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

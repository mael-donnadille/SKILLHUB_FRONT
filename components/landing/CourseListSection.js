import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { COURSES } from "@/data/mocks";

export default function CourseListSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-primary mb-2">Prochaines rentrées</h2>
                        <p className="text-secondary">Rejoignez une de nos sessions annuelles et changez de métier.</p>
                    </div>
                    <Link href="/courses" className="text-primary font-bold hover:text-[#1a365d] flex items-center bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                        Voir le catalogue complet <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {COURSES.map((course) => (
                        <div key={course.id} className="group bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                            <div className="h-48 bg-slate-100 relative">
                                <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent"></div>
                                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                    {course.category}
                                </div>
                                <div className="absolute bottom-4 left-4 text-white font-medium flex items-center gap-1">
                                    <MapPin size={16} /> {course.city}
                                </div>
                            </div>
                            <div className="p-6 grow flex flex-col">
                                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                                    {course.title}
                                </h3>
                                
                                <div className="space-y-3 mb-6 grow">
                                    <div className="flex items-center text-secondary text-sm">
                                        <Calendar size={16} className="mr-2 text-secondary" />
                                        {course.date}
                                    </div>
                                    <div className="flex items-center text-secondary text-sm">
                                        <Users size={16} className="mr-2 text-secondary" />
                                        Promo de 15 étudiants max
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-sm font-medium text-accent bg-orange-50 px-2 py-1 rounded-md">
                                        Plus que {course.spots} places
                                    </span>
                                    <button className="text-primary font-bold text-sm hover:underline">
                                        Candidater &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

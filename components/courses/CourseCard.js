import Link from "next/link";
import { Calendar, User } from "lucide-react";

export default function CourseCard({ course }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const getCategoryColor = (categoryName) => {
        const name = categoryName?.toLowerCase() || "";
        if (name.includes("web") || name.includes("code")) return "bg-blue-50 text-blue-700 border-blue-100";
        if (name.includes("design") || name.includes("graphique")) return "bg-purple-50 text-purple-700 border-purple-100";
        if (name.includes("data")) return "bg-emerald-50 text-emerald-700 border-emerald-100";
        if (name.includes("marketing")) return "bg-orange-50 text-orange-700 border-orange-100";
        return "bg-slate-50 text-slate-700 border-slate-100";
    };

    const getHeaderGradient = (categoryName) => {
        const name = categoryName?.toLowerCase() || "";
        if (name.includes("web") || name.includes("code")) return "from-blue-500/10 to-blue-500/5";
        if (name.includes("design") || name.includes("graphique")) return "from-purple-500/10 to-purple-500/5";
        if (name.includes("data")) return "from-emerald-500/10 to-emerald-500/5";
        if (name.includes("marketing")) return "from-orange-500/10 to-orange-500/5";
        return "from-slate-500/10 to-slate-500/5";
    };

    return (
        <div className="group bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
            <div className={`h-2 w-full bg-gradient-to-r ${getHeaderGradient(course.categorie?.nom)}`}></div>

            <div className="p-6 flex flex-col h-full relative">
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${getHeaderGradient(course.categorie?.nom)} opacity-50 pointer-events-none`}></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getCategoryColor(course.categorie?.nom)}`}>
                        {course.categorie?.nom}
                    </span>
                    {course.statut === "VALIDE" && (
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                            Ouvert
                        </span>
                    )}
                </div>

                <Link href={`/formations/${course.id}`} className="group-hover:text-accent transition-colors">
                    <h3 className="text-xl font-bold text-primary mb-3 relative z-10">
                        {course.titre}
                    </h3>
                </Link>

                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow relative z-10">
                    {course.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100 relative z-10">
                    <div className="flex items-center text-secondary text-sm">
                        <Calendar size={16} className="mr-2 text-primary/70" />
                        {formatDate(course.dateProposition)}
                    </div>
                    <div className="flex items-center text-secondary text-sm">
                        <User size={16} className="mr-2 text-primary/70" />
                        {course.formateur ? `${course.formateur.prenom} ${course.formateur.nom}` : 'Formateur expert'}
                    </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between relative z-10">
                    <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded">
                        {course.annee?.libelle}
                    </span>
                    <Link href={`/formations/${course.id}`} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-[#1a365d] transition-colors flex items-center group/btn shadow-md hover:shadow-lg">
                        Voir le détail <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

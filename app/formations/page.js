import { getFormations } from "@/services/formationService";
import CourseCard from "@/components/courses/CourseCard";
import { Search } from "lucide-react";

export default async function FormationsPage() {
    const courses = await getFormations();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <main className="grow pt-10 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-primary mb-4">Toutes nos Formations</h1>
                        <p className="text-secondary max-w-2xl mx-auto">
                            Explorez l'ensemble de notre catalogue de formations et trouvez celle qui correspond à vos ambitions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                                <Search className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                <h3 className="text-lg font-medium text-primary">Aucune formation trouvée</h3>
                                <p className="text-secondary mt-2">Le catalogue est actuellement vide ou inaccessible.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

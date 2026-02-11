import { getFormations } from "@/services/formationService";
import FormationsList from "@/components/courses/FormationsList";

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

                    <FormationsList initialCourses={courses} />
                </div>
            </main>
        </div>
    );
}

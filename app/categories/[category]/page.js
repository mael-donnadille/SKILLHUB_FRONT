import BackButton from "@/components/ui/BackButton";
import { Search } from "lucide-react";
import { slugify } from "@/utils/slugify";
import CourseCard from "@/components/courses/CourseCard";

async function getCourses() {
    try {
        const res = await fetch('http://localhost:8000/api/formations', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

export default async function CategoryPage({ params }) {
    const courses = await getCourses();
    const { category } = await params;

    const matchedCourse = courses.find(course =>
        course.categorie && slugify(course.categorie.nom) === category
    );

    const categoryName = matchedCourse ? matchedCourse.categorie.nom : decodeURIComponent(category);

    const filteredCourses = courses.filter(course => {
        if (!course.categorie || !course.categorie.nom) return false;
        return slugify(course.categorie.nom) === category;
    });

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <main className="grow pt-10 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BackButton />

                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-primary mb-4">Formations - {categoryName}</h1>
                        <p className="text-secondary max-w-2xl mx-auto">
                            Découvrez nos programmes dans la catégorie {categoryName}.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                                <Search className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                                <h3 className="text-lg font-medium text-primary">Aucune formation trouvée</h3>
                                <p className="text-secondary mt-2">Aucune formation disponible pour cette catégorie actuellement.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

import Link from "next/link";

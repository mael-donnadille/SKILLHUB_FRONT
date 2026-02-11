import CategoriesList from "@/components/categories/CategoriesList";

async function getCategories() {
    try {
        const res = await fetch('http://localhost:8000/api/categories', { cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <main className="grow pt-10 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-extrabold text-primary mb-4">Toutes nos Catégories</h1>
                        <p className="text-secondary max-w-2xl mx-auto">
                            Explorez l'ensemble de nos catégories de formations et trouvez celle qui correspond à vos ambitions.
                        </p>
                    </div>

                    <CategoriesList initialCategories={categories} />
                </div>
            </main>
        </div>
    );
}

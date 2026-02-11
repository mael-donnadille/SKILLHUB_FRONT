import CategoryList from "@/components/categories/CategoryList";

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
            <main className="grow py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">
                            Explorez nos Catégories
                        </h1>
                        <p className="text-xl text-secondary max-w-2xl mx-auto">
                            Trouvez la formation idéale parmi nos domaines d&apos;expertise variés.
                            Chaque catégorie regroupe des cours conçus pour booster votre carrière.
                        </p>
                    </div>

                    <CategoryList categories={categories} />
                </div>
            </main>
        </div>
    );
}

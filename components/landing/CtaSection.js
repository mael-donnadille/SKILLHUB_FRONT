import Link from "next/link";

export default function CtaSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                    Venez vous inscrire en ligne ou sur place dans nos locaux dans toute la France.
                </h2>
                <p className="text-lg text-secondary mb-10">
                    Ne manquez pas l&apos;opportunité de rejoindre une communauté passionnée. Les places sont limitées pour garantir la qualité du suivi.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/register" className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-[#1a365d] shadow-lg hover:shadow-xl transition-all">
                        Déposer ma candidature
                    </Link>
                    <Link href="/faq" className="inline-block px-10 py-4 bg-white text-primary border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                        Questions fréquentes
                    </Link>
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";
import { PARTNERS } from "@/data/mocks";

export default function MentorsSection() {
    return (
        <section className="py-20 bg-primary text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Apprenez avec ceux qui font l&apos;industrie</h2>
                        <p className="text-secondary text-lg mb-8 leading-relaxed">
                            Nos mentors ne sont pas juste des profs. Ce sont des Lead Devs, des Directeurs Artistiques et des CTOs qui prennent sur leur temps libre pour transmettre leur savoir en présentiel.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-8">
                            {PARTNERS.map((company) => (
                                <span key={company} className="px-4 py-2 bg-[#1a365d] rounded-lg text-secondary font-medium text-sm border border-[#1a365d]">
                                    {company}
                                </span>
                            ))}
                        </div>
                        <Link href="/mentors" className="inline-flex items-center text-accent font-bold hover:text-white transition-colors">
                            Rencontrer nos mentors <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="bg-[#1a365d] p-8 rounded-2xl border border-primary relative shadow-xl">
                            <MessageCircle className="absolute -top-4 -right-4 text-accent w-12 h-12 bg-primary rounded-full p-2 border border-[#1a365d]" />
                            <div className="flex gap-1 text-accent mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-white italic mb-6 text-lg">
                                &quot;Ce n&apos;est pas juste une formation, c&apos;est une expérience humaine. J&apos;ai trouvé mon associé dans ma promo et nos mentors nous ont aidés à lancer notre startup.&quot;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-full border-2 border-accent"></div>
                                <div>
                                    <div className="font-bold text-white">Sarah M.</div>
                                    <div className="text-sm text-secondary">Alumni Promo 2023 - Aujourd&apos;hui Product Designer</div>
                                </div>
                            </div>
                        </div>
                        {/* Effet décoratif */}
                        <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-accent/10 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

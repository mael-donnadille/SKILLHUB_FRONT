"use client";

import {Search, MapPin, Calendar, Users, BookOpen, Tag} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: "easeOut"}
    }
};

export default function HeroSection({ allCourses = [] }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = [];
        const seenCategories = new Set();

        // Search in categories first
        allCourses.forEach(course => {
            if (course.categorie && course.categorie.nom && !seenCategories.has(course.categorie.nom)) {
                if (course.categorie.nom.toLowerCase().includes(lowerQuery)) {
                    filtered.push({
                        type: 'category',
                        label: course.categorie.nom,
                        id: course.categorie.id
                    });
                    seenCategories.add(course.categorie.nom);
                }
            }
        });

        // Search in courses
        allCourses.forEach(course => {
            if (course.titre.toLowerCase().includes(lowerQuery)) {
                filtered.push({
                    type: 'course',
                    label: course.titre,
                    id: course.id,
                    category: course.categorie?.nom
                });
            }
        });

        setSuggestions(filtered.slice(0, 2));
    }, [query, allCourses]);

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/courses?search=${encodeURIComponent(query)}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.type === 'course') {
            router.push(`/courses?search=${encodeURIComponent(suggestion.label)}`);
        } else {
            router.push(`/courses?category=${encodeURIComponent(suggestion.label)}`);
        }
    };

    return (
        <section className="relative pt-20 pb-28 overflow-hidden bg-white">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"/>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none"/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants}>
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary font-medium text-sm mb-6 border border-blue-100">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                            Inscriptions ouvertes pour l&apos;année 2026
                        </div>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-tight"
                    >
                        Des formations et des ateliers <br className="hidden md:block"/>
                        <span className="text-accent relative inline-block">
                            en présentiel
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <motion.path
                                    d="M0 5 Q 50 10 100 5"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    fill="none"
                                    initial={{pathLength: 0}}
                                    animate={{pathLength: 1}}
                                    transition={{duration: 0.8, delay: 0.5}}
                                />
                            </svg>
                        </span> pour votre avenir
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        Rejoignez nos ateliers immersifs, rencontrez des formateurs
                        experts et progressez au sein d&apos;une promo soudée et en effectif reduit.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="max-w-2xl mx-auto relative z-20"
                        ref={wrapperRef}
                    >
                        <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2 relative">
                            <div className="grow relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-secondary"/>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border-none rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-primary bg-slate-50 sm:bg-transparent transition-all"
                                    placeholder="Quel domaine vous intéresse ? (ex: Design, Code...)"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                onClick={handleSearch}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-[#1a365d] transition-colors flex items-center justify-center"
                            >
                                Trouver un atelier
                            </motion.button>
                        </div>

                        <AnimatePresence>
                            {isFocused && suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden text-left"
                                >
                                    <ul>
                                        {suggestions.map((item, idx) => (
                                            <li 
                                                key={`${item.type}-${item.id}-${idx}`}
                                                onClick={() => handleSuggestionClick(item)}
                                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 border-b border-slate-50 last:border-0 transition-colors"
                                            >
                                                {item.type === 'category' ? (
                                                    <div className="bg-blue-100 p-2 rounded-lg text-primary">
                                                        <Tag size={16} />
                                                    </div>
                                                ) : (
                                                    <div className="bg-orange-100 p-2 rounded-lg text-accent">
                                                        <BookOpen size={16} />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-medium text-primary">{item.label}</p>
                                                    {item.type === 'course' && (
                                                        <p className="text-xs text-secondary">Formation • {item.category}</p>
                                                    )}
                                                    {item.type === 'category' && (
                                                        <p className="text-xs text-secondary">Catégorie</p>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-8 text-secondary text-sm font-medium mt-12"
                    >
                        {[
                            {icon: Users, text: "Apprentissage en groupe"},
                            {icon: MapPin, text: "Campus dans 5 villes"},
                            {icon: Calendar, text: "Participez à des ateliers"}
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 cursor-default hover:text-primary transition-colors"
                            >
                                <item.icon className="text-accent h-5 w-5"/>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

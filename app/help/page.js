"use client";
import Link from 'next/link';
import { Search, HelpCircle, FileText, User, BookOpen, MessageCircle, ChevronDown, ChevronUp, Mail, Phone, Wrench, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GUIDES = [
    {
        id: "connexion",
        title: "Je n'arrive pas à me connecter",
        steps: [
            "Vérifiez que vous utilisez bien l'adresse email associée à votre compte.",
            "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion.",
            "Entrez votre email et suivez les instructions reçues (pensez à vérifier vos spams).",
            "Si le problème persiste, contactez le support via le chat ou par email."
        ]
    },
    {
        id: "facture",
        title: "Où trouver ma facture ?",
        steps: [
            "Connectez-vous à votre espace personnel.",
            "Cliquez sur votre photo de profil en haut à droite, puis sélectionnez 'Mon Compte'.",
            "Allez dans l'onglet 'Facturation' ou 'Historique des paiements'.",
            "Cliquez sur l'icône de téléchargement à côté de la transaction concernée pour obtenir le PDF."
        ]
    },
    {
        id: "annulation",
        title: "Comment annuler une inscription ?",
        steps: [
            "Rendez-vous dans la section 'Mes Formations' de votre tableau de bord.",
            "Sélectionnez le cours concerné par l'annulation.",
            "Si vous êtes dans le délai des 48h avant le début, un bouton 'Annuler mon inscription' sera visible.",
            "Confirmez votre choix. Le remboursement sera déclenché automatiquement sous 5 à 10 jours ouvrés."
        ]
    },
    {
        id: "paiement",
        title: "Mon paiement a échoué",
        steps: [
            "Vérifiez que votre carte bancaire est valide et n'a pas expiré.",
            "Assurez-vous d'avoir les fonds nécessaires et que votre plafond de paiement n'est pas atteint.",
            "Essayez un autre moyen de paiement si disponible (ex: PayPal).",
            "Si l'erreur persiste, contactez votre banque pour vérifier s'ils bloquent la transaction."
        ]
    },
    {
        id: "attestation",
        title: "Obtenir mon attestation de formation",
        steps: [
            "Une fois la formation terminée, l'attestation est générée automatiquement.",
            "Allez dans votre espace 'Mes Certifications'.",
            "Vous pourrez voir et télécharger votre certificat au format PDF.",
            "Vous pouvez également l'ajouter directement à votre profil LinkedIn en un clic."
        ]
    }
];

const CATEGORIES = [
    { icon: User, title: "Mon Compte", desc: "Profil, Login, Préférences" },
    { icon: BookOpen, title: "Formations", desc: "Inscription, Suivi, Annulation" },
    { icon: FileText, title: "Documents", desc: "Factures, Attestations, Certificats" },
    { icon: Wrench, title: "Technique", desc: "Bugs, Affichage, Connexion" },
];

export default function HelpPage() {
    const [openGuideId, setOpenGuideId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchWrapperRef = useRef(null);

    const toggleGuide = (id) => {
        setOpenGuideId(openGuideId === id ? null : id);
    };

    const handleSearchSelect = (id) => {
        setOpenGuideId(id);
        setSearchQuery(""); // Clear search to show the full list context
        setIsFocused(false);

        // Scroll to the guide with a small delay to ensure DOM is ready
        setTimeout(() => {
            const element = document.getElementById(`guide-${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    // Click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter for Dropdown
    const searchResults = searchQuery.length > 0
        ? GUIDES.filter(guide =>
            guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.steps.some(step => step.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : [];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <main className="grow">
                {/* Hero Section */}
                <section className="bg-primary text-white py-20 relative">
                    {/* Background Elements Wrapper */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 text-center relative z-30">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold mb-6"
                        >
                            Support & Tutoriels
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-blue-100 text-lg mb-10"
                        >
                            Des guides pas à pas pour résoudre vos problèmes rapidement.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative max-w-2xl mx-auto"
                            ref={searchWrapperRef}
                        >
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-4 rounded-xl text-primary border-0 shadow-lg focus:ring-2 focus:ring-accent bg-white placeholder:text-slate-400 outline-none"
                                    placeholder="Rechercher un tutoriel (ex: facture, connexion...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                />
                            </div>

                            {/* Search Dropdown */}
                            <AnimatePresence>
                                {isFocused && searchQuery.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden text-left z-50"
                                    >
                                        {searchResults.length > 0 ? (
                                            <ul className="py-2">
                                                {searchResults.map((guide) => (
                                                    <li
                                                        key={guide.id}
                                                        onClick={() => handleSearchSelect(guide.id)}
                                                        className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-slate-50 last:border-0"
                                                    >
                                                        <div className="bg-blue-50 p-2 rounded-lg text-primary">
                                                            <BookOpen size={16} />
                                                        </div>
                                                        <span className="text-primary font-medium">{guide.title}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="p-4 text-center text-secondary">
                                                Aucun résultat trouvé pour "{searchQuery}"
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CATEGORIES.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group"
                            >
                                <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <cat.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-primary mb-2">{cat.title}</h3>
                                <p className="text-secondary text-sm">{cat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Guides Section */}
                <section className="py-16 bg-white border-t border-slate-100">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-primary text-center mb-4">Guides de dépannage</h2>
                        <p className="text-secondary text-center mb-12">Sélectionnez un sujet pour voir les étapes de résolution.</p>

                        <div className="space-y-4">
                            {/* We now map over ALL guides, as filtering happens in the dropdown */}
                            {GUIDES.map((guide, idx) => (
                                <motion.div
                                    key={guide.id}
                                    id={`guide-${guide.id}`} // ID for scrolling
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className={`border rounded-xl overflow-hidden transition-all duration-300 ${openGuideId === guide.id ? 'border-accent shadow-md ring-1 ring-accent/20' : 'border-slate-200 shadow-sm hover:shadow-md'}`}
                                >
                                    <button
                                        onClick={() => toggleGuide(guide.id)}
                                        className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors ${openGuideId === guide.id ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg transition-colors ${openGuideId === guide.id ? 'bg-accent text-white' : 'bg-blue-50 text-primary'}`}>
                                                <Wrench size={20} />
                                            </div>
                                            <span className={`font-bold text-lg ${openGuideId === guide.id ? 'text-accent' : 'text-primary'}`}>{guide.title}</span>
                                        </div>
                                        {openGuideId === guide.id ? (
                                            <ChevronUp className="h-5 w-5 text-accent" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-secondary" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {openGuideId === guide.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-8 pt-2 bg-slate-50 border-t border-slate-100">
                                                    <div className="space-y-4 ml-2 mt-4">
                                                        {guide.steps.map((step, stepIdx) => (
                                                            <div key={stepIdx} className="flex gap-4">
                                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm">
                                                                    {stepIdx + 1}
                                                                </div>
                                                                <p className="text-secondary leading-relaxed pt-1 font-medium">{step}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2 text-sm text-green-700 font-medium bg-green-50 p-4 rounded-xl border border-green-100 inline-flex">
                                                        <CheckCircle size={18} className="text-green-600" />
                                                        <span>Problème résolu ? Si non, contactez le support ci-dessous.</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-primary mb-6">Encore bloqué ?</h2>
                        <p className="text-secondary mb-12 max-w-2xl mx-auto">
                            Si les guides ci-dessus n&apos;ont pas suffi, notre équipe technique peut prendre le relais.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MessageCircle className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="font-bold text-xl text-primary mb-2">Chat Support</h3>
                                <p className="text-secondary text-sm mb-6">Réponse immédiate</p>
                                <button className="text-primary font-bold hover:text-accent transition-colors flex items-center justify-center gap-2 mx-auto">
                                    Lancer le chat <span className="text-accent">&rarr;</span>
                                </button>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Mail className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="font-bold text-xl text-primary mb-2">Email</h3>
                                <p className="text-secondary text-sm mb-6">Réponse sous 24h</p>
                                <a href="mailto:support@skillhub.com" className="text-primary font-bold hover:text-accent transition-colors">support@skillhub.com</a>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Phone className="h-8 w-8 text-accent" />
                                </div>
                                <h3 className="font-bold text-xl text-primary mb-2">Téléphone</h3>
                                <p className="text-secondary text-sm mb-6">Lun-Ven, 9h-18h</p>
                                <a href="tel:+33123456789" className="text-primary font-bold hover:text-accent transition-colors">01 23 45 67 89</a>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

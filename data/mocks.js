import { Briefcase, Users, Award, Code, PenTool, BarChart, Globe } from "lucide-react";

export const STEPS = [
    {
        title: "Candidature & Sélection",
        desc: "Nous évaluons votre motivation et votre projet pour vous intégrer dans la cohorte idéale.",
        icon: Briefcase
    },
    {
        title: "Ateliers Hebdomadaires",
        desc: "Retrouvez votre groupe et vos mentors chaque semaine pour des sessions pratiques intensives.",
        icon: Users
    },
    {
        title: "Projet & Certification",
        desc: "Validez vos acquis par un grand projet final présenté devant un jury de professionnels.",
        icon: Award
    }
];

export const CATEGORIES = [
    { name: 'Développement', icon: Code, color: 'text-[#2c4b79] bg-blue-50' },
    { name: 'Design & UX', icon: PenTool, color: 'text-purple-600 bg-purple-50' },
    { name: 'Business', icon: BarChart, color: 'text-indigo-600 bg-indigo-50' },
    { name: 'Langues', icon: Globe, color: 'text-pink-600 bg-pink-50' },
];

export const COURSES = [
    {
        id: 1,
        category: "Développement",
        title: "Bootcamp Fullstack JS",
        city: "Paris & Lyon",
        date: "Octobre 2024 - Juin 2025",
        spots: 4
    },
    {
        id: 2,
        category: "Design",
        title: "Masterclass UX/UI Design",
        city: "Bordeaux",
        date: "Septembre 2024 - Mai 2025",
        spots: 2
    },
    {
        id: 3,
        category: "Data",
        title: "Data Analyst Track",
        city: "Lille & Distanciel",
        date: "Novembre 2024 - Juillet 2025",
        spots: 8
    }
];

export const PARTNERS = ['Google', 'Airbnb', 'Blablacar', 'Doctolib'];

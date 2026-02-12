import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata = {
    title: "SkillHub - Formations en présentiel",
    description: "Développez vos compétences avec nos ateliers pratiques et mentors experts.",
    metadataBase: new URL('https://skillhub.com'), // Remplacer par l'URL réelle en prod
    openGraph: {
        title: 'SkillHub - Formations en présentiel',
        description: 'Développez vos compétences avec nos ateliers pratiques et mentors experts.',
        url: 'https://skillhub.com',
        siteName: 'SkillHub',
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SkillHub - Formations en présentiel',
        description: 'Développez vos compétences avec nos ateliers pratiques et mentors experts.',
    },
    keywords: ['formation', 'présentiel', 'développement', 'design', 'ateliers', 'mentoring'],
};

import ClientLayout from "@/components/ClientLayout";

export default function RootLayout({ children }) {
    return (
        <html lang="fr">
            <body className={`${poppins.variable} font-sans antialiased bg-background text-primary`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}

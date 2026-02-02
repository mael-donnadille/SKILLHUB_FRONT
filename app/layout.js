import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata = {
    title: "Skill Hub - Formations en présentiel",
    description: "Développez vos compétences avec nos ateliers pratiques et mentors experts.",
};

export default function RootLayout({children}) {
    return (
        <html lang="fr">
            <body className={`${poppins.variable} font-sans antialiased bg-background text-primary`}>
                {children}
            </body>
        </html>
    );
}

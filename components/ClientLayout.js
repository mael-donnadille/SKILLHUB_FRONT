"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/connexion" || pathname === "/inscription";
    const isAdminPage = pathname?.startsWith("/administrateur");

    return (
        <>
            {!isAuthPage && !isAdminPage && <Navbar />}
            {children}
            {!isAuthPage && !isAdminPage && <Footer />}
        </>
    );
}

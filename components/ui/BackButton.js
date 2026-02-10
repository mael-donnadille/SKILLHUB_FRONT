"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className = "" }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className={`inline-flex items-center text-secondary hover:text-primary font-medium transition-colors mb-6 ${className}`}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
        </button>
    );
}

"use client";

import { useTranslations } from 'next-intl';
import { FaPlay, FaTrophy, FaRobot, FaLaptopCode, FaVrCardboard, FaGamepad } from "react-icons/fa";

export default function Home() {
    const t = useTranslations("");

    return (
        <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 relative overflow-hidden flex flex-col items-center justify-start font-sans">
            
            {/* TŁO: Subtelna siatka z gradientem */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

            {/* GŁÓWNY TYTUŁ */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mt-10 mb-16 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground)]/60">
                {/* Załóżmy, że Main.name to np. "O Kole Naukowym" */}
                {t("Main.name")}
            </h1>

            {/* SEKCJA: KIM JESTEŚMY */}
            <div className="w-full max-w-5xl mb-12 text-center flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {t("About.title")}
                </h2>
                <p className="text-xl md:text-2xl text-[var(--foreground)]/60 max-w-2xl leading-relaxed">
                    {t("About.titledesc")}
                </p>
            </div>

            <div className="w-full max-w-5xl aspect-video rounded-2xl border border-[var(--border)] bg-[var(--accent)]/30 relative flex items-center justify-center group overflow-hidden mb-20 shadow-2xl shadow-[var(--brand)]/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand)]/10 to-transparent opacity-50" />
                
                <button className="relative z-10 w-20 h-20 bg-[var(--foreground)] text-[var(--background)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <FaPlay className="text-2xl ml-2" />
                </button>
                <span className="absolute bottom-4 right-6 text-sm font-mono text-[var(--foreground)]/40">
                    Obejrzyj wideo o naszym kole
                </span>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)]/30 transition-colors">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <span className="w-2 h-6 bg-[var(--brand)] rounded-full"></span>
                        {t("About.about")}
                    </h3>
                    <p className="text-[var(--foreground)]/70 leading-relaxed text-lg">
                        {t("About.aboutdesc")}
                    </p>
                </div>


                <div className="flex flex-col gap-6">
                    
                    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] flex-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]/50 mb-4">Nasze obszary</h4>
                        <div className="flex flex-wrap gap-2">
                            <TechBadge icon={<FaLaptopCode />} label="C++ / C# / Java" />
                            <TechBadge icon={<FaGamepad />} label="Gamedev" />
                            <TechBadge icon={<FaVrCardboard />} label="VR / AR" />
                            <TechBadge icon={<FaRobot />} label="Robotyka" />
                            <TechBadge label=".NET" />
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)] to-[var(--accent)]/50 flex-1">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--foreground)]/50 mb-4">Sukcesy</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-[var(--foreground)]/80">
                                <FaTrophy className="text-yellow-500 text-lg" />
                                <span className="text-sm font-medium">Imagine Cup</span>
                            </li>
                            <li className="flex items-center gap-3 text-[var(--foreground)]/80">
                                <FaTrophy className="text-blue-500 text-lg" />
                                <span className="text-sm font-medium">Liczne Hackathony</span>
                            </li>
                            <li className="flex items-center gap-3 text-[var(--foreground)]/80">
                                <FaTrophy className="text-purple-500 text-lg" />
                                <span className="text-sm font-medium">Konkursy ministerialne</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    );
}

function TechBadge({ icon, label }: { icon?: React.ReactNode; label: string }) {
    return (
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--foreground)]/80 hover:border-[var(--brand)]/50 hover:text-[var(--brand)] transition-colors cursor-default">
            {icon && <span className="text-[var(--foreground)]/60">{icon}</span>}
            {label}
        </span>
    );
}
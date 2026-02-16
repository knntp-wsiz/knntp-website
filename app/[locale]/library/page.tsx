"use client";

import { useTranslations } from 'next-intl';
import { 
    FaGlobe, FaMobileAlt, FaDatabase, FaCloud, 
    FaBrain, FaChartBar, FaGamepad, FaMicrochip, FaDesktop 
} from "react-icons/fa";

// --- DANE (Zbudowane na podstawie Twojej listy) ---
const techStack = [
  {
    id: "web",
    title: "Web Development",
    icon: <FaGlobe className="text-blue-500" />,
    descKey: "Tech.web_desc", // "Tworzenie aplikacji internetowych..."
    colSpan: "md:col-span-2 lg:col-span-2", // Ta karta jest duża, więc zajmie 2 kolumny
    subsections: [
      {
        name: "Frontend",
        techs: ["HTML5/CSS3", "JavaScript (ES6+)", "TypeScript", "WebAssembly", "React", "Vue.js", "Angular", "Svelte", "Next.js", "Tailwind CSS"]
      },
      {
        name: "Backend",
        techs: ["Node.js", "NestJS", "Python FastAPI", "Java Spring", "C# .NET", "Go", "Rust", "PHP Laravel"]
      }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: <FaMobileAlt className="text-emerald-500" />,
    descKey: "Tech.mobile_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Natywne", techs: ["Swift (iOS)", "Kotlin (Android)"] },
      { name: "Cross-platform", techs: ["Flutter", "React Native", ".NET MAUI"] }
    ]
  },
  {
    id: "db",
    title: "Bazy Danych",
    icon: <FaDatabase className="text-orange-500" />,
    descKey: "Tech.db_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Relacyjne (SQL)", techs: ["PostgreSQL", "MySQL", "SQL Server"] },
      { name: "NoSQL & Wektorowe", techs: ["MongoDB", "Redis", "Pinecone", "Milvus"] }
    ]
  },
  {
    id: "cloud",
    title: "DevOps & Cloud",
    icon: <FaCloud className="text-cyan-500" />,
    descKey: "Tech.cloud_desc",
    colSpan: "md:col-span-2 lg:col-span-1",
    subsections: [
      { name: "Infrastruktura", techs: ["Docker", "Kubernetes", "AWS", "Azure", "GCP"] },
      { name: "Automatyzacja", techs: ["Terraform", "GitHub Actions", "GitLab CI"] }
    ]
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: <FaBrain className="text-purple-500" />,
    descKey: "Tech.ai_desc",
    colSpan: "md:col-span-2 lg:col-span-2", // Większa karta dla AI
    subsections: [
      { name: "Języki & Frameworki", techs: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "Pandas"] },
      { name: "Ekosystem LLM", techs: ["LangChain", "LlamaIndex", "Hugging Face"] }
    ]
  },
  {
    id: "bigdata",
    title: "Big Data",
    icon: <FaChartBar className="text-yellow-500" />,
    descKey: "Tech.bigdata_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Przetwarzanie", techs: ["Apache Spark", "Hadoop", "Kafka", "Snowflake"] }
    ]
  },
  {
    id: "gamedev",
    title: "Game Development",
    icon: <FaGamepad className="text-red-500" />,
    descKey: "Tech.gamedev_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Silniki", techs: ["Unreal Engine (C++)", "Unity (C#)", "Godot (GDScript)"] }
    ]
  },
  {
    id: "embedded",
    title: "Embedded & IoT",
    icon: <FaMicrochip className="text-teal-500" />,
    descKey: "Tech.embedded_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Technologie", techs: ["C / C++", "Rust", "MicroPython"] }
    ]
  },
  {
    id: "desktop",
    title: "Desktop Apps",
    icon: <FaDesktop className="text-indigo-500" />,
    descKey: "Tech.desktop_desc",
    colSpan: "col-span-1",
    subsections: [
      { name: "Technologie", techs: ["Electron", "Tauri (Rust)", "C++ (Qt)", "C# (WPF)"] }
    ]
  }
];

export default function TechnologiesPage() {
    const t = useTranslations("");

    return (
        <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 relative overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        {t("Tech.title")}
                    </h1>
                    <p className="text-lg text-[var(--foreground)]/60 leading-relaxed">
                        {t("Tech.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techStack.map((item) => (
                        <div key={item.id} className={`group relative p-6 md:p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--brand)]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--brand)]/5 flex flex-col ${item.colSpan}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[var(--accent)]/50 rounded-xl border border-[var(--border)] text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h2 className="text-2xl font-bold">{item.title}</h2>
                            </div>

                            <p className="text-[var(--foreground)]/60 text-sm mb-8 flex-grow">
                                {t(item.descKey)}
                            </p>

                            <div className="space-y-6">
                                {item.subsections.map((sub, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]/40 mb-3 border-b border-[var(--border)] pb-2">
                                            {sub.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {sub.techs.map((tech, i) => (
                                                <span 
                                                    key={i} 
                                                    className="px-2.5 py-1 text-xs font-medium bg-[var(--accent)]/40 border border-[var(--border)] rounded-md text-[var(--foreground)]/80 hover:bg-[var(--brand)]/10 hover:text-[var(--brand)] hover:border-[var(--brand)]/30 transition-colors cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
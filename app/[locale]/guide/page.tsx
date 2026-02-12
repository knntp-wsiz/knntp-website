"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaAws, FaGoogle, FaGithub, FaMicrosoft, FaSearch, FaExternalLinkAlt, FaBook, FaServer} from "react-icons/fa";
import { SiCisco, SiCoursera, SiEdx, SiFreecodecamp, SiCodeium } from "react-icons/si";

const certProviders = [
  {
    id: "aws",
    name: "Amazon Web Services",
    icon: <FaAws className="text-[#FF9900]" />,
    url: "https://aws.amazon.com/training/",
    descKey: "certs.aws_desc", 
    courses: [
      "Cloud Foundations",
      "Intro to Cloud Computing",
      "Getting started with AWS",
      "Cloud Concepts",
      "Storage & Networking Basics"
    ]
  },
  {
    id: "ibm",
    name: "IBM SkillsBuild",
    icon: <FaServer className="text-[#0530ad] dark:text-[#ffffff]" />, 
    url: "https://skillsbuild.org/",
    descKey: "certs.ibm_desc",
    courses: [
      "Artificial Intelligence Fundamentals",
      "Data Science Intro",
      "Cybersecurity Intro",
      "Cloud Computing",
      "Agile Explorer",
      "Design Thinking Practitioner"
    ]
  },
  {
    id: "google",
    name: "Google Career Certificates",
    icon: <FaGoogle className="text-[#4285F4]" />,
    url: "https://grow.google/intl/en_europe/certificates/",
    descKey: "certs.google_desc",
    courses: [
      "Digital Garage",
      "Google Skillshop",
      "Analytics Academy"
    ]
  },
  {
    id: "cisco",
    name: "Cisco Networking Academy",
    icon: <SiCisco className="text-[#049fd9]" />,
    url: "https://www.netacad.com/",
    descKey: "certs.cisco_desc",
    courses: [
      "NetAcad",
      "Cybersecurity Essentials",
      "Networking Basics",
      "Python Essentials 1 & 2",
      "Linux Essentials",
      "CCNA: Intro to Networks"
    ]
  }
];

const tools = [
  {
    id: "github-pack",
    title: "GitHub Student Pack",
    category: "MustHave",
    icon: <FaGithub />,
    url: "https://education.github.com/pack",
    descKey: "tools.github_pack"
  },
  {
    id: "azure-students",
    title: "Azure for Students",
    category: "Cloud",
    icon: <FaMicrosoft className="text-[#0078D4]" />,
    url: "https://azure.microsoft.com/en-us/free/students/",
    descKey: "tools.azure"
  },
  {
    id: "copilot",
    title: "GitHub Copilot",
    category: "AI Tool",
    icon: <FaGithub className="text-white" />,
    url: "https://github.com/features/copilot",
    descKey: "tools.copilot"
  },
  {
    id: "codeium",
    title: "Codeium",
    category: "AI Tool",
    icon: <SiCodeium className="text-green-500" />,
    url: "https://codeium.com/",
    descKey: "tools.codeium"
  },
  {
    id: "welib",
    title: "WeLib",
    category: "Library",
    icon: <FaBook className="text-orange-400" />,
    url: "https://welib.com/", // Sprawdź czy to dobry link
    descKey: "tools.welib"
  },
  {
    id: "fcc",
    title: "freeCodeCamp",
    category: "Platform",
    icon: <SiFreecodecamp />,
    url: "https://www.freecodecamp.org/",
    descKey: "tools.fcc"
  },
  {
    id: "coursera",
    title: "Coursera",
    category: "Platform",
    icon: <SiCoursera className="text-[#0056D2]" />,
    url: "https://www.coursera.org/",
    descKey: "tools.coursera"
  },
  {
    id: "edx",
    title: "edX",
    category: "Platform",
    icon: <SiEdx className="text-[#B91C1C]" />,
    url: "https://www.edx.org/",
    descKey: "tools.edx"
  }
];

export default function ResourcesPage() {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");

  const filterText = searchTerm.toLowerCase();
  
  const filteredCerts = certProviders.filter(p => 
    p.name.toLowerCase().includes(filterText) || 
    p.courses.some(c => c.toLowerCase().includes(filterText))
  );
  
  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(filterText)
  );

  return (
    <div className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] p-6 md:p-12 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-16 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--foreground)] to-[var(--foreground)]/60">
            {t("resources.title")}
          </span>
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-[var(--border)] pb-8">
          <p className="text-[var(--foreground)]/60 max-w-xl text-lg">
            {t("resources.subtitle")}
          </p>
          
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--foreground)]/40">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder={t("resources.search_placeholder")}
              className="w-full bg-[var(--accent)]/30 border border-[var(--border)] text-[var(--foreground)] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[var(--brand)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* CERTS */}
        {filteredCerts.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-[var(--brand)] rounded-full mr-2"></span>
              {t("resources.section_certs")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCerts.map((provider) => (
                <Link 
                  key={provider.id} 
                  href={provider.url}
                  target="_blank"
                  className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--brand)]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--brand)]/5"
                >
                   {/* Card Header */}
                   <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl p-3 bg-[var(--accent)]/50 rounded-xl border border-[var(--border)] group-hover:scale-110 transition-transform">
                          {provider.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{provider.name}</h3>
                          <p className="text-sm text-[var(--foreground)]/50">{t(provider.descKey)}</p>
                        </div>
                      </div>
                      <FaExternalLinkAlt className="text-[var(--foreground)]/20 group-hover:text-[var(--brand)] transition-colors" />
                   </div>

                   {/* Courses */}
                   <div className="space-y-3">
                      <p className="text-xs font-mono uppercase tracking-widest text-[var(--foreground)]/40">Dostępne ścieżki:</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.courses.map((course, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs md:text-sm bg-[var(--accent)]/40 border border-[var(--border)] rounded-full text-[var(--foreground)]/80 group-hover:border-[var(--brand)]/20 transition-colors">
                            {course}
                          </span>
                        ))}
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* TOOLS */}
        {filteredTools.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full mr-2"></span>
              {t("resources.section_tools")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  className="group flex flex-col p-5 bg-[var(--card)] border border-[var(--border)] rounded-xl hover:bg-[var(--accent)]/50 transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-2xl text-[var(--foreground)] group-hover:text-[var(--brand)] transition-colors">
                      {tool.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border 
                      ${tool.category === 'MustHave' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-[var(--foreground)]/5 text-[var(--foreground)]/50 border-[var(--foreground)]/10'}
                    `}>
                      {tool.category}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold mb-1">{tool.title}</h4>
                  <p className="text-xs text-[var(--foreground)]/60 line-clamp-2">
                    {t(tool.descKey)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
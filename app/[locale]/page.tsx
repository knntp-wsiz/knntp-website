import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaFacebook, FaGithub } from "react-icons/fa";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <main className="min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] relative flex flex-col items-center p-6 overflow-hidden">
				{/* BANNER */}
				<div className="text-center space-y-4 mt-20 md:mt-50">
					<h1 className="text-4xl md:text-8xl font-bold tracking-tight">
						<span className="bg-clip-text text-transparent bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground)]/50">
							{t("Main.banner")}
						</span>
					</h1>
					<p className="text-lg text-[var(--foreground)]/60">
						{t("Main.name")}
					</p>
				</div>
				
				{/* LOGOS */}
				<div className="flex flex-col items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
					
					<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 opacity-90 hover:opacity-100 transition-opacity">
						{/* UITM */}
						<div className="relative h-16 w-48 md:h-20 md:w-60">
							<Image
								src="/wsiz/PL_mono_main.svg"
								alt="WSIiZ Logo"
								fill
								className="object-contain dark:invert opacity-80 hover:opacity-100 transition-opacity"
							/>
						</div>

						<div className="hidden md:block w-px h-12 bg-[var(--border)]" />

						{/* KNNTP */}
						<div className="relative h-24 w-48 md:h-32 md:w-60">
							<Image
								src="/logo_white.png"
								alt="KNNTP Logo"
								fill
								className="object-contain hidden dark:block drop-shadow-2xl"
							/>
							<Image
								src="/logo_black.png"
								alt="KNNTP Logo"
								fill
								className="object-contain dark:hidden"
							/>
						</div>
					</div>

				</div>

				{/* SOCIAL MEDIA */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 w-full max-w-4xl">
					
					{/* Facebook */}
					<SocialCard 
						href="https://www.facebook.com/netRzeszow/"
						icon={<FaFacebook className="h-8 w-8" />}
						label="Facebook"
						sublabel={t('Socials.facebook')}
						ariaLabel={t('Socials.facebook')}
					/>

					{/* Discord */}
					<SocialCard 
						href="https://discord.gg/QBTCtum5uw"
						icon={<FaDiscord className="h-8 w-8" />}
						label="Discord"
						sublabel={t('Socials.discord')}
						ariaLabel={t('Socials.discord')}
					/>

					{/* Github */}
					<SocialCard 
						href="https://github.com/knntp-wsiz"
						icon={<FaGithub className="h-8 w-8" />}
						label="GitHub"
						sublabel={t('Socials.github')}
						ariaLabel={t('Socials.github')}
					/>
      </div>
    </main>
  );
}

function SocialCard({ href, icon, label, sublabel, ariaLabel, highlighted = false }: any) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`
        group relative flex flex-col items-center justify-center p-6 rounded-xl border transition-all duration-300
        ${highlighted 
          ? 'bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] shadow-lg hover:shadow-[var(--brand)]/20' 
          : 'bg-[var(--background)]/50 border-[var(--border)] hover:border-[var(--foreground)]/20 hover:bg-[var(--accent)]'
        }
      `}
    >
      <div className="mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-lg">{label}</div>
        <div className={`text-xs mt-1 ${highlighted ? 'text-[var(--background)]/80' : 'text-[var(--foreground)]/50'}`}>
          {sublabel}
        </div>
      </div>
      
      {/* Ikonka strzałki pojawiająca się przy hoverze */}
      {/* <FaArrowRight className={`absolute top-4 right-4 h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`} /> */}
    </Link>
  );
}

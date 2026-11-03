import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { type Locale, localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import { DISCORD_URL, GITHUB_ORG_URL } from "@/lib/site";

export default function Footer({
	locale,
	messages,
}: {
	locale: Locale;
	messages: Pick<Messages, "footer" | "nav" | "a11y">;
}) {
	const { footer, nav, a11y } = messages;
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-line-soft">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_auto]">
				<div>
					<Image
						src="/logo_white.png"
						alt=""
						width={120}
						height={61}
						className="h-11 w-auto"
					/>
					<p className="mt-5 max-w-sm text-sm text-muted">{footer.tagline}</p>
				</div>

				<nav aria-label={footer.links}>
					<ul className="space-y-3 text-sm">
						<li>
							<Link
								href={localePath(locale, "/blog")}
								className="text-muted transition-colors hover:text-text"
							>
								{nav.blog}
							</Link>
						</li>
						<li>
							<a
								href="/forms"
								className="text-muted transition-colors hover:text-text"
							>
								{nav.join}
							</a>
						</li>
					</ul>
					<ul className="mt-6 flex gap-5">
						<li>
							<a
								href={DISCORD_URL}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${footer.discord} ${a11y.externalLink}`}
								className="text-muted transition-colors hover:text-accent"
							>
								<FaDiscord className="h-6 w-6" />
							</a>
						</li>
						<li>
							<a
								href={GITHUB_ORG_URL}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${footer.github} ${a11y.externalLink}`}
								className="text-muted transition-colors hover:text-accent"
							>
								<FaGithub className="h-6 w-6" />
							</a>
						</li>
					</ul>
				</nav>

				<Image
					src="/wsiz/PL_mono_main.svg"
					alt={footer.wsiz}
					width={246}
					height={50}
					className="h-auto w-48 self-start invert"
				/>
			</div>
			<p className="border-t border-line-soft px-4 py-5 text-center font-mono text-xs text-muted">
				© {year} {footer.rights}
			</p>
		</footer>
	);
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { LOCALES, type Locale, localePath } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

type Props = {
	locale: Locale;
	messages: Pick<Messages, "nav" | "a11y" | "lang">;
};

const SECTIONS = ["about", "hackathons", "programs", "why", "team"] as const;

/** Ścieżka bieżącej strony bez prefiksu języka, niezależnie od tego, czy rewrite go zostawił. */
function stripLocale(pathname: string) {
	const stripped = pathname.replace(/^\/(pl|en)(?=\/|$)/, "");
	return stripped === "" ? "/" : stripped;
}

export default function Header({ locale, messages }: Props) {
	const [open, setOpen] = useState(false);
	const menuId = useId();
	const pathname = usePathname();
	const rest = stripLocale(pathname);
	const home = localePath(locale);
	const { nav, a11y, lang } = messages;

	const items = [
		...SECTIONS.map((id) => ({ label: nav[id], href: `${home}#${id}` })),
		{ label: nav.blog, href: localePath(locale, "/blog") },
	];

	return (
		<header className="sticky top-0 z-50 border-b border-line-soft bg-bg/95">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
				<Link href={home} aria-label={a11y.home} className="shrink-0">
					<span className="font-display text-3xl font-bold leading-none tracking-tight">
						KNNTP
					</span>
				</Link>

				<nav aria-label={a11y.mainNav} className="hidden md:block">
					<ul className="flex items-center gap-7">
						{items.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="text-[0.95rem] text-muted transition-colors duration-150 hover:text-text"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="flex items-center gap-2">
					<ul
						aria-label={a11y.language}
						className="flex items-center font-mono text-xs"
					>
						{LOCALES.map((code) => {
							const active = code === locale;
							const href =
								code === "pl"
									? rest === "/"
										? "/pl"
										: `/pl${rest}`
									: localePath("en", rest);
							return (
								<li key={code}>
									<Link
										href={href}
										hrefLang={code}
										lang={code}
										aria-current={active ? "true" : undefined}
										title={lang[code]}
										prefetch={false}
										className={
											active
												? "px-2.5 py-2 text-accent"
												: "px-2.5 py-2 text-muted transition-colors duration-150 hover:text-text"
										}
									>
										{code.toUpperCase()}
									</Link>
								</li>
							);
						})}
					</ul>

					<button
						type="button"
						className="-mr-2 p-2 text-text md:hidden"
						onClick={() => setOpen((v) => !v)}
						aria-controls={menuId}
						aria-expanded={open}
						aria-label={open ? a11y.menuClose : a11y.menuOpen}
					>
						{open ? (
							<AiOutlineClose className="h-6 w-6" />
						) : (
							<AiOutlineMenu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{open && (
				<nav
					id={menuId}
					aria-label={a11y.mainNav}
					className="border-t border-line-soft bg-bg md:hidden"
				>
					<ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
						{items.map((item) => (
							<li
								key={item.href}
								className="border-b border-line-soft last:border-0"
							>
								<Link
									href={item.href}
									onClick={() => setOpen(false)}
									className="block py-4 font-display text-2xl"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			)}
		</header>
	);
}

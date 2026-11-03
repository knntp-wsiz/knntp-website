import type { Metadata, Viewport } from "next";
import {
	Barlow_Condensed,
	Hanken_Grotesk,
	JetBrains_Mono,
} from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { isLocale, LOCALES, type Locale } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { alternates, openGraph } from "@/lib/seo";
import { DISCORD_URL, GITHUB_ORG_URL, SITE_URL } from "@/lib/site";

const display = Barlow_Condensed({
	variable: "--font-display-src",
	subsets: ["latin", "latin-ext"],
	weight: ["500", "600", "700"],
	display: "swap",
});

const body = Hanken_Grotesk({
	variable: "--font-body-src",
	subsets: ["latin", "latin-ext"],
	display: "swap",
});

const mono = JetBrains_Mono({
	variable: "--font-mono-src",
	subsets: ["latin", "latin-ext"],
	display: "swap",
});

export const viewport: Viewport = {
	themeColor: "#0d151a",
	colorScheme: "dark",
};

export function generateStaticParams() {
	return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const { meta } = getMessages(locale);

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: meta.title,
			template: format(meta.titleTemplate, { title: "%s" }),
		},
		description: meta.description,
		keywords: meta.keywords,
		authors: [{ name: meta.siteName }],
		alternates: alternates(locale),
		openGraph: openGraph(
			locale,
			"/",
			meta.title,
			meta.description,
			meta.siteName,
		),
		twitter: {
			card: "summary_large_image",
			title: meta.title,
			description: meta.description,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, "max-snippet": -1 },
		},
		icons: {
			icon: "/favicon.ico",
			shortcut: "/favicon-16x16.png",
			apple: "/apple-touch-icon.png",
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const messages = getMessages(locale as Locale);

	const organization = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: messages.meta.siteName,
		alternateName: "KNNTP",
		url: SITE_URL,
		logo: `${SITE_URL}/android-chrome-512x512.png`,
		description: messages.meta.description,
		parentOrganization: {
			"@type": "CollegeOrUniversity",
			name: "Wyższa Szkoła Informatyki i Zarządzania w Rzeszowie",
			url: "https://wsiz.edu.pl",
		},
		address: {
			"@type": "PostalAddress",
			addressLocality: "Rzeszów",
			addressCountry: "PL",
		},
		sameAs: [DISCORD_URL, GITHUB_ORG_URL],
	};

	return (
		<html lang={locale}>
			<body
				className={`${display.variable} ${body.variable} ${mono.variable} flex min-h-svh flex-col`}
			>
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: statyczny JSON-LD zbudowany z własnych stałych
					dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
				/>
				<a
					href="#main"
					className="sr-only z-[60] bg-accent px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
				>
					{messages.a11y.skip}
				</a>
				<Header locale={locale as Locale} messages={messages} />
				<main id="main" className="flex-1">
					{children}
				</main>
				<Footer locale={locale as Locale} messages={messages} />
			</body>
		</html>
	);
}

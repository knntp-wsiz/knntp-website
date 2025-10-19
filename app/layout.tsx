import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	// === Podstawowe Meta Tagi (SEO) ===
	title: {
		default: "Koło Naukowe Nowych Technologii Programistycznych WSIiZ",
		template: "%s | KNNTP WSIiZ", // Dla podstron (np. 'Projekty | KNNTP WSIiZ')
	},
	description:
		"Nie tylko studia! Zwiększ umiejętności w C++, C#, Java i .NET. Realizuj projekty, bierz udział w hackathonach i konkursach. Dołącz do nas już dziś!",

	// === Dane o Właścicielu i Adresie URL ===
	metadataBase: new URL("https://knntp.pl"), // Zastąp rzeczywistym adresem
	alternates: {
		canonical: "/",
	},

	// === Tagi Open Graph (Udostęnianie w Social Media - FB, LinkedIn) ===
	openGraph: {
		title: "Koło Naukowe Nowych Technologii Programistycznych WSIiZ",
		description:
			"Nie tylko studia! Zwiększ umiejętności w C++, C#, Java i .NET. Realizuj projekty, bierz udział w hackathonach i konkursach. Dołącz do nas już dziś!",
		url: "https://knntp.pl",
		siteName: "KNNTP WSIiZ",
		images: [
			{
				url: "/logo_white.png", // Obrazek do udostępniania (min. 1200x630px)
				width: 1389,
				height: 704,
				alt: "Logo KNNTP",
			},
		],
		locale: "pl_PL",
		type: "website",
	},

	// === Tagi Twitter (Udostęnianie na platformie X) ===
	twitter: {
		card: "summary_large_image",
		title: "KNNTP WSIiZ: C#, Java, VR, Robotyka",
		description:
			"KNNTP WSIiZ. Programowanie i projekty, sukcesy w Imagine Cup. **Dołącz do nas!**",
		images: ["/logo_white.jpg"], // Obrazek dla Twittera
	},

	// === Inne Ustawienia SEO/Techniczne ===
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-snippet": -1,
		},
	},
	keywords: [
		"Koło Naukowe",
		"WSIiZ",
		"Programowanie",
		"C++",
		"Java",
		"C#",
		".NET",
		"Robotyka",
		"VR",
		"Hackathon",
		"Imagine Cup",
		"Rzeszów",
		"Studia IT",
	],
	authors: [{ name: "Koło Naukowe KNNTP" }],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body
				className={`${roboto.variable} antialiased min-h-svh flex flex-col`}
			>
				<Header />
				<main className="max-w-7xl w-full mx-auto flex-1 p-8 flex">
					{children}
				</main>
			</body>
		</html>
	);
}

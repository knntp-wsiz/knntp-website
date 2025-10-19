import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

const roboto = Roboto({
	variable: "--font-roboto",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "KNNTP",
	description:
		"Oficjalna strona koła naukowego nowych technologii programistycznych 💻",
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

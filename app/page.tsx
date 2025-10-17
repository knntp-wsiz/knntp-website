import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center flex-col justify-center max-w-4xl text-center mx-auto p-8">
			<Image
				src="/logo_white.png"
				alt="KNNTP Logo"
				width={500}
				height={500}
				className="hidden dark:block"
			/>
			<Image
				src="/logo_black.png"
				alt="KNNTP Logo"
				width={500}
				height={500}
				className="dark:hidden"
			/>
			<p className="text-xl">
				Oficjalna strona koła naukowego nowych technologii programistycznych
			</p>
			<Link
				href="https://www.facebook.com/netRzeszow/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Nasz profil na Facebook'u"
				className="mt-8"
			>
				<FaFacebook className="h-12 w-12" />
			</Link>
		</main>
	);
}

import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<Image
				src="/logo_white.png"
				alt="KNNTP Logo"
				width={500}
				height={253.906}
				className="hidden dark:block"
			/>
			<Image
				src="/logo_black.png"
				alt="KNNTP Logo"
				width={500}
				height={253.906}
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

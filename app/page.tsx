import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaFacebook, FaGithub } from "react-icons/fa";

export default function Home() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center">
			<div className="flex justify-center items-center flex-col lg:flex-row">
				<Image
					src="/wsiz_logo_white.png"
					alt="WSIiZ Logo"
					width={491}
					height={100}
					className="hidden dark:block"
				/>
				<Image
					src="/wsiz_logo_black.png"
					alt="WSIiZ Logo"
					width={491}
					height={100}
					className="dark:hidden"
				/>

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
			</div>

			<h1 className="text-4xl font-bold text-center mt-8">Linki:</h1>

			<div className="flex justify-center space-x-4 mt-4">
				<Link
					href="https://www.facebook.com/netRzeszow/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Nasz profil na Facebook'u"
					className="hover:text-primary transition-colors duration-150 ease-in-out"
				>
					<FaFacebook className="h-12 w-12" />
				</Link>
				<Link
					href="https://discord.gg/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Nasz serwer na Discordzie"
					className="hover:text-primary transition-colors duration-150 ease-in-out"
				>
					<FaDiscord className="h-12 w-12" />
				</Link>
				<Link
					href="https://github.com/knntp-wsiz"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Nasz profil na GitHubie"
					className="hover:text-primary transition-colors duration-150 ease-in-out"
				>
					<FaGithub className="h-12 w-12" />
				</Link>
			</div>
		</div>
	);
}

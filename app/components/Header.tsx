"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const NAV_ITEMS = [{ name: "Strona główna", path: "/" }];

export default function Header() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const mobileMenuId = useId();

	const toggleMenu = (): void => {
		setIsOpen((prev) => !prev);
	};

	return (
		<header className="bg-background shadow-md sticky top-0 border-b border-secondary z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="text-2xl font-bold"
							aria-label="Strona główna"
						>
							<Image
								src="/logo_white.png"
								alt="KNNTP Logo"
								className="dark:block hidden"
								width={80}
								height={40}
							/>
							<Image
								src="/logo_black.png"
								alt="KNNTP Logo"
								className="dark:hidden"
								width={80}
								height={40}
							/>
						</Link>
					</div>

					<nav className="hidden md:block">
						<ul className="ml-10 flex items-baseline space-x-6">
							{NAV_ITEMS.map((item) => (
								<li key={item.path} role="none">
									<NavLink href={item.path}>{item.name}</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<button
						className="md:hidden hover:text-secondary cursor-pointer  transition duration-150 ease-in-out"
						onClick={toggleMenu}
						type="button"
						aria-controls={mobileMenuId}
						aria-expanded={isOpen}
						aria-label={isOpen ? "Zamknij menu główne" : "Otwórz menu główne"}
					>
						{isOpen ? (
							<AiOutlineClose className="h-6 w-6" />
						) : (
							<AiOutlineMenu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{isOpen && (
				<div
					className="md:hidden fixed bg-background w-full shadow-md border-b border-t border-secondary"
					id={mobileMenuId}
				>
					<nav
						className="px-2 pt-2 pb-3 space-y-4 sm:px-3"
						aria-label="Nawigacja mobilna"
					>
						{NAV_ITEMS.map((item) => (
							<NavLink
								key={item.path}
								href={item.path}
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</NavLink>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}

function NavLink({
	href,
	children,
	onClick,
	props,
}: {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
	props?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			className={clsx(
				"transition-colors relative group hover:text-secondary block rounded-md text-base duration-150 ease-in-out",
				isActive ? "text-secondary font-semibold" : "text-primary",
			)}
			role="menuitem"
			onClick={onClick}
			{...props}
		>
			{children}
			<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary group-hover:w-full transition-all duration-300 ease-in-out" />
		</Link>
	);
}

import Link from "next/link";

/** Wersja dwujęzyczna, bo not-found nie dostaje parametru języka. */
export default function NotFound() {
	return (
		<div className="mx-auto max-w-6xl px-4 py-32 sm:px-6">
			<p className="font-mono text-accent">404</p>
			<h1 className="mt-3 text-6xl font-bold">
				Nie znaleziono strony
				<span className="block text-muted">Page not found</span>
			</h1>
			<div className="mt-10 flex gap-6">
				<Link href="/" className="text-accent hover:text-text">
					Strona główna
				</Link>
				<Link href="/en" className="text-accent hover:text-text">
					Home page
				</Link>
			</div>
		</div>
	);
}

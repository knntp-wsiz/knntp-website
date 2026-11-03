"use client";

import { useEffect, useState } from "react";

type Props = {
	title: string;
	fullName: string;
	offer: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Nagłówek hero „pisany” od nowa przy każdym odświeżeniu, z losowym tempem.
 * Pełny tekst jest zawsze w DOM (SEO, czytniki ekranu): nienapisana reszta
 * jest tylko przezroczysta, więc układ nigdy się nie przesuwa.
 */
export default function HeroCopy({ title, fullName, offer }: Props) {
	const texts = [title, fullName, offer];
	const [counts, setCounts] = useState([0, 0, 0]);
	const [active, setActive] = useState(-1);

	// biome-ignore lint/correctness/useExhaustiveDependencies: teksty są stałe dla danego renderu strony
	useEffect(() => {
		const full = texts.map((t) => t.length);
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setCounts(full);
			return;
		}

		let cancelled = false;
		const perChar = 24 + Math.random() * 52;
		const weights = [2.6, 1, 0.8];

		(async () => {
			await wait(260 + Math.random() * 520);
			for (let line = 0; line < texts.length && !cancelled; line++) {
				setActive(line);
				for (let i = 1; i <= full[line] && !cancelled; i++) {
					setCounts((prev) => prev.map((c, k) => (k === line ? i : c)));
					const ch = texts[line][i - 1];
					const pause = ch === " " ? 0.6 : /[.,:]/.test(ch) ? 5 : 1;
					await wait(
						perChar * weights[line] * pause * (0.45 + Math.random() * 1.1),
					);
				}
				await wait(160 + Math.random() * 520);
			}
			await wait(2800);
			if (!cancelled) setActive(-1);
		})();

		return () => {
			cancelled = true;
		};
	}, []);

	const typed = (line: number) => (
		<>
			{texts[line].slice(0, counts[line])}
			{active === line && <span className="tw-caret" />}
			<span className="tw-rest">{texts[line].slice(counts[line])}</span>
		</>
	);

	return (
		<>
			<noscript>
				<style>{".tw-rest{opacity:1!important}"}</style>
			</noscript>
			<h1 id="hero-title">
				<span className="block text-[clamp(4.5rem,17vw,6rem)] font-bold leading-[0.9] tracking-tight">
					{typed(0)}
				</span>
				<span className="mx-auto mt-4 block max-w-2xl font-sans text-lg font-normal leading-snug text-muted sm:text-xl">
					{typed(1)}
				</span>
			</h1>
			<p className="mx-auto mt-8 max-w-xl text-lg text-text sm:text-xl">
				{typed(2)}
			</p>
		</>
	);
}

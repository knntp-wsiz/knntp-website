"use client";

import { useEffect, useState } from "react";
import { hasSeenIntro, markIntroSeen } from "@/lib/intro";
import { useHeroTyping } from "./HeroTyping";

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
	const { finish } = useHeroTyping();

	// biome-ignore lint/correctness/useExhaustiveDependencies: teksty są stałe dla danego renderu strony, finish jest stabilne
	useEffect(() => {
		const full = texts.map((t) => t.length);
		if (
			hasSeenIntro() ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setCounts(full);
			finish();
			return;
		}

		let cancelled = false;
		const perChar = 14 + Math.random() * 26;
		const weights = [3, 0.9, 0.7];

		(async () => {
			await wait(260 + Math.random() * 520);
			for (let line = 0; line < texts.length && !cancelled; line++) {
				setActive(line);
				for (let i = 1; i <= full[line] && !cancelled; i++) {
					setCounts((prev) => prev.map((c, k) => (k === line ? i : c)));
					const ch = texts[line][i - 1];
					const pause = ch === " " ? 0.6 : /[.,:]/.test(ch) ? 3.5 : 1;
					await wait(
						perChar * weights[line] * pause * (0.45 + Math.random() * 1.1),
					);
				}
				await wait(120 + Math.random() * 380);
			}
			finish();
			await wait(2800);
			if (cancelled) return;
			setActive(-1);
			markIntroSeen();
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
				<style>
					{
						".tw-rest{opacity:1!important}.hero-reveal{opacity:1!important;visibility:visible!important;transform:none!important}"
					}
				</style>
			</noscript>
			<h1 id="hero-title" className="hero-shadow">
				<span className="block text-[clamp(4.5rem,17vw,6rem)] font-bold leading-[0.9] tracking-tight">
					{typed(0)}
				</span>
				<span className="mx-auto mt-4 block max-w-2xl font-sans text-lg font-normal leading-snug text-muted sm:text-xl">
					{typed(1)}
				</span>
			</h1>
			<p className="hero-shadow mx-auto mt-8 max-w-xl text-lg text-text sm:text-xl">
				{typed(2)}
			</p>
		</>
	);
}

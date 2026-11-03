"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean };

/**
 * Wideo w tle hero. Pudełko ma maksymalnie proporcje 16:9: na ultrawide boki
 * rozmywają się i zanikają do czystego tła. Bez wideo (ograniczony ruch,
 * oszczędzanie danych, błąd ładowania) zostaje samo tło.
 * Gdy wideo faktycznie gra, sekcja dostaje data-video="on" (cień pod tekstem).
 */
export default function HeroVideo({ base }: { base: string }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [variant, setVariant] = useState<"" | "-sm" | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const connection = (
			navigator as Navigator & { connection?: NetworkInformation }
		).connection;
		if (reduced || connection?.saveData) return;
		// Telefony dostają lżejszą wersję, reszta pełną.
		setVariant(window.matchMedia("(min-width: 768px)").matches ? "" : "-sm");
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (variant === null || !video) return;
		video.muted = true;

		const markReady = () => setReady(true);
		const play = () => video.play().then(markReady, () => {});
		video.addEventListener("canplay", markReady);
		video.addEventListener("loadeddata", markReady);
		video.addEventListener("playing", markReady);
		if (video.readyState >= 3) markReady();

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) play();
			else video.pause();
		});
		observer.observe(video);
		return () => {
			video.removeEventListener("canplay", markReady);
			video.removeEventListener("loadeddata", markReady);
			video.removeEventListener("playing", markReady);
			observer.disconnect();
		};
	}, [variant]);

	// Znacznik na sekcji nadrzędnej: tylko CSS reaguje na „wideo gra”.
	useEffect(() => {
		const section = videoRef.current?.closest("section");
		if (!section) return;
		if (ready) section.dataset.video = "on";
		else delete section.dataset.video;
		return () => {
			delete section.dataset.video;
		};
	}, [ready]);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{variant !== null && (
				<div className="hero-video-box">
					<video
						key={variant}
						ref={videoRef}
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						onError={() => setReady(false)}
						className="hero-video"
						style={{ opacity: ready ? 1 : 0 }}
					>
						<source
							src={`${base}${variant}.mp4`}
							type='video/mp4; codecs="avc1.42E01E"'
						/>
						<source src={`${base}${variant}.webm`} type="video/webm" />
					</video>
					<span className="hero-video-blur hero-video-blur-left" />
					<span className="hero-video-blur hero-video-blur-right" />
				</div>
			)}
			<div className="hero-scrim" />
		</div>
	);
}

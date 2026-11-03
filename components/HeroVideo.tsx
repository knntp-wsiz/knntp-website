"use client";

import { useEffect, useRef, useState } from "react";

type NetworkInformation = { saveData?: boolean };

/**
 * Wideo w tle hero. Pudełko ma maksymalnie proporcje 16:9: na ultrawide boki
 * rozmywają się i zanikają do czystego tła. Bez wideo (ograniczony ruch,
 * oszczędzanie danych, błąd ładowania) zostaje samo tło.
 */
export default function HeroVideo({ src }: { src: string }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [enabled, setEnabled] = useState(false);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const connection = (
			navigator as Navigator & {
				connection?: NetworkInformation;
			}
		).connection;
		if (!reduced && !connection?.saveData) setEnabled(true);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!enabled || !video) return;
		video.muted = true;

		const play = () => video.play().catch(() => {});
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) play();
			else video.pause();
		});
		observer.observe(video);
		return () => observer.disconnect();
	}, [enabled]);

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{enabled && (
				<div className="hero-video-box">
					<video
						ref={videoRef}
						src={src}
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						onCanPlay={() => setReady(true)}
						onError={() => setReady(false)}
						className="hero-video"
						style={{ opacity: ready ? 1 : 0 }}
					/>
					<span className="hero-video-blur hero-video-blur-left" />
					<span className="hero-video-blur hero-video-blur-right" />
				</div>
			)}
			<div className="hero-scrim" />
		</div>
	);
}

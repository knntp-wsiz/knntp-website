"use client";

import { useEffect, useRef } from "react";
import { hasSeenIntro } from "@/lib/intro";

const GAP = 30;
const RADIUS = 190;
const INTRO_MS = 2600;

function channels(value: string, fallback: [number, number, number]) {
	const parts = value.trim().split(/\s+/).map(Number);
	return parts.length === 3 && parts.every(Number.isFinite)
		? (parts as [number, number, number])
		: fallback;
}

/**
 * Siatka kropek, która ugina się ku kursorowi i palcowi. Przy pierwszym wejściu
 * przechodzi przez nią fala. Animacja śpi, gdy nic się nie dzieje albo hero jest poza ekranem.
 */
export default function DotGrid({ className }: { className?: string }) {
	const wrapRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const host = wrapRef.current?.parentElement;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !host || !ctx) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		const style = getComputedStyle(document.documentElement);
		const accent = channels(
			style.getPropertyValue("--accent-rgb"),
			[100, 174, 201],
		);
		const muted = channels(
			style.getPropertyValue("--muted-rgb"),
			[150, 176, 191],
		);

		let width = 0;
		let height = 0;
		let cols = 0;
		let rows = 0;
		let frameId = 0;
		let visible = true;
		let strength = 0;
		let targetStrength = 0;
		let px = -1000;
		let py = -1000;
		const skipIntro = reduced.matches || hasSeenIntro();
		let started = performance.now();

		const resize = () => {
			const rect = host.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(width / GAP) + 1;
			rows = Math.ceil(height / GAP) + 1;
			schedule();
		};

		const draw = (now: number) => {
			frameId = 0;
			ctx.clearRect(0, 0, width, height);

			const elapsed = skipIntro ? INTRO_MS : now - started;
			const introDone = elapsed >= INTRO_MS;
			const progress = Math.min(elapsed / INTRO_MS, 1);
			const maxDist = Math.hypot(width, height);
			const ring = progress * maxDist * 1.1;
			const ringWidth = 140;
			const cx = width * 0.3;
			const cy = height * 0.45;

			strength += (targetStrength - strength) * 0.12;

			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					const x = c * GAP + (width - (cols - 1) * GAP) / 2;
					const y = r * GAP + (height - (rows - 1) * GAP) / 2;

					let pull = 0;
					let dx = 0;
					let dy = 0;
					if (strength > 0.01) {
						dx = px - x;
						dy = py - y;
						const d = Math.hypot(dx, dy);
						if (d < RADIUS) {
							const t = 1 - d / RADIUS;
							pull = t * t * strength;
						}
					}

					let wave = 0;
					if (!introDone) {
						const dc = Math.hypot(x - cx, y - cy);
						const k = (dc - ring) / ringWidth;
						wave = Math.exp(-k * k) * (1 - progress * 0.6);
					}

					const heat = Math.min(1, pull * 1.4 + wave);
					const size = 1.1 + pull * 2.8 + wave * 2.4;
					const alpha = 0.22 + heat * 0.78;
					const rr = muted[0] + (accent[0] - muted[0]) * heat;
					const gg = muted[1] + (accent[1] - muted[1]) * heat;
					const bb = muted[2] + (accent[2] - muted[2]) * heat;

					ctx.fillStyle = `rgba(${rr | 0},${gg | 0},${bb | 0},${alpha.toFixed(3)})`;
					ctx.beginPath();
					ctx.arc(x + dx * pull * 0.32, y + dy * pull * 0.32, size, 0, 6.2832);
					ctx.fill();
				}
			}

			if (visible && (!introDone || strength > 0.01 || targetStrength > 0)) {
				schedule();
			}
		};

		function schedule() {
			if (!frameId && visible) frameId = requestAnimationFrame(draw);
		}

		const move = (event: PointerEvent) => {
			const rect = host.getBoundingClientRect();
			px = event.clientX - rect.left;
			py = event.clientY - rect.top;
			targetStrength = 1;
			schedule();
		};
		const leave = () => {
			targetStrength = 0;
			schedule();
		};

		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) schedule();
		});

		host.addEventListener("pointermove", move);
		host.addEventListener("pointerdown", move);
		host.addEventListener("pointerleave", leave);
		host.addEventListener("pointerup", leave);
		host.addEventListener("pointercancel", leave);
		window.addEventListener("resize", resize);
		observer.observe(host);
		started = performance.now();
		resize();

		return () => {
			cancelAnimationFrame(frameId);
			observer.disconnect();
			host.removeEventListener("pointermove", move);
			host.removeEventListener("pointerdown", move);
			host.removeEventListener("pointerleave", leave);
			host.removeEventListener("pointerup", leave);
			host.removeEventListener("pointercancel", leave);
			window.removeEventListener("resize", resize);
		};
	}, []);

	return (
		<div ref={wrapRef} className={className} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}

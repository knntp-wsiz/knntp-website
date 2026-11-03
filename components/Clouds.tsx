import type { CSSProperties } from "react";

/**
 * Trzy warstwy chmur płynące w poprzek hero z różną prędkością (paralaksa).
 * Tekstury to proceduralny szum SVG (public/clouds), przesuwany tylko przez transform.
 */
const LAYERS = [
	{ src: "a", height: "26rem", top: "-2rem", opacity: 0.24, seconds: 70 },
	{ src: "b", height: "20rem", top: "26%", opacity: 0.22, seconds: 36 },
	{ src: "c", height: "18rem", bottom: "-2rem", opacity: 0.3, seconds: 16 },
] as const;

export default function Clouds() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			{LAYERS.map((layer) => (
				<div
					key={layer.src}
					className="cloud-layer"
					style={
						{
							backgroundImage: `url(/clouds/${layer.src}.svg)`,
							height: layer.height,
							top: "top" in layer ? layer.top : undefined,
							bottom: "bottom" in layer ? layer.bottom : undefined,
							opacity: layer.opacity,
							"--h": layer.height,
							"--s": `${layer.seconds}s`,
						} as CSSProperties
					}
				/>
			))}
		</div>
	);
}

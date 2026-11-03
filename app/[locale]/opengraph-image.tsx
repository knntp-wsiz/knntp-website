import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isLocale, LOCALES } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export const alt = "KNNTP WSIiZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
	return LOCALES.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const { meta } = getMessages(isLocale(locale) ? locale : "pl");
	const asset = (name: string) => readFile(join(process.cwd(), "assets", name));
	const [bg, bold, medium] = await Promise.all([
		asset("og-bg.jpg"),
		asset("BarlowCondensed-Bold.ttf"),
		asset("BarlowCondensed-Medium.ttf"),
	]);
	const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				background: "#0d151a",
				color: "#eef3f6",
				fontFamily: "Barlow Condensed",
			}}
		>
			{/* biome-ignore lint/performance/noImgElement: ImageResponse nie obsługuje next/image */}
			<img
				src={bgSrc}
				alt=""
				width={1200}
				height={630}
				style={{ position: "absolute", top: 0, left: 0 }}
			/>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					background:
						"linear-gradient(90deg, rgba(8,14,18,0.92) 0%, rgba(8,14,18,0.6) 55%, rgba(8,14,18,0.25) 100%)",
				}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "0 80px",
					position: "relative",
				}}
			>
				<div
					style={{
						fontSize: 320,
						fontWeight: 700,
						lineHeight: 0.9,
						letterSpacing: -4,
					}}
				>
					KNNTP
				</div>
				<div
					style={{
						marginTop: 28,
						fontSize: 60,
						fontWeight: 500,
						color: "#cfe3ec",
					}}
				>
					{meta.ogTagline}
				</div>
				<div style={{ display: "flex", marginTop: 44 }}>
					{meta.ogChips.map((chip) => (
						<div
							key={chip}
							style={{
								marginRight: 16,
								padding: "10px 24px",
								fontSize: 40,
								fontWeight: 500,
								color: "#64aec9",
								border: "2px solid #64aec9",
							}}
						>
							{chip}
						</div>
					))}
				</div>
			</div>
			<div
				style={{
					position: "absolute",
					right: 64,
					bottom: 48,
					fontSize: 44,
					fontWeight: 500,
					color: "#8fb0bf",
				}}
			>
				knntp.xyz
			</div>
		</div>,
		{
			...size,
			// Własne fonty: dynamiczne pobieranie z Google psuje się bez sieci i gubi polskie znaki.
			fonts: [
				{ name: "Barlow Condensed", data: bold, weight: 700 },
				{ name: "Barlow Condensed", data: medium, weight: 500 },
			],
		},
	);
}

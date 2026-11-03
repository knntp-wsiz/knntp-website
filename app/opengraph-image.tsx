import { ImageResponse } from "next/og";

export const alt = "KNNTP WSIiZ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
				padding: 72,
				background: "#0d151a",
				color: "#eef3f6",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 72,
					right: 72,
					width: 28,
					height: 28,
					borderRadius: 14,
					background: "#64aec9",
				}}
			/>
			<div style={{ fontSize: 220, fontWeight: 700, lineHeight: 0.9 }}>
				KNNTP
			</div>
			<div style={{ marginTop: 24, fontSize: 38, color: "#8fb0bf" }}>
				WSIiZ Rzeszow / knntp.xyz
			</div>
		</div>,
		size,
	);
}

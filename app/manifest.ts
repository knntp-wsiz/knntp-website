import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "KNNTP WSIiZ",
		short_name: "KNNTP",
		description:
			"Koło Naukowe Nowych Technologii Programistycznych WSIiZ w Rzeszowie",
		start_url: "/",
		display: "standalone",
		background_color: "#0d151a",
		theme_color: "#0d151a",
		icons: [
			{
				src: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}

import type { NextConfig } from "next";
import { DISCORD_URL, FORM_URL } from "./lib/site";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
	},
	async redirects() {
		return [
			{ source: "/forms", destination: FORM_URL, permanent: false },
			{ source: "/form", destination: FORM_URL, permanent: false },
			{ source: "/dc", destination: DISCORD_URL, permanent: false },
		];
	},
};

export default nextConfig;

"use client";

import { resetIntro } from "@/lib/intro";

export default function ReplayIntro({
	label,
	href,
}: {
	label: string;
	href: string;
}) {
	return (
		<button
			type="button"
			onClick={() => {
				resetIntro();
				window.location.assign(href);
			}}
			className="text-left text-muted transition-colors hover:text-text"
		>
			{label}
		</button>
	);
}

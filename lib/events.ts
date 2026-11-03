import type { Messages } from "@/i18n/messages";

export type HackathonId = keyof Messages["hackathons"]["items"];

export type Hackathon = {
	id: HackathonId;
	/** Data początku (ISO), do sortowania i znaczników czasu. */
	startDate: string;
	/** Slug wpisu na blogu. */
	blogSlug: string;
	sourceUrl: string;
	photos: string[];
};

/** Od najnowszego do najstarszego. Teksty (pl/en) żyją w messages/*.json pod hackathons.items[id]. */
export const HACKATHONS: Hackathon[] = [
	{
		id: "hackyeah-2026",
		startDate: "2026-10-03",
		blogSlug: "hackyeah-2026",
		sourceUrl:
			"https://wsiz.edu.pl/aktualnosci/mocna-reprezentacja-wsiiz-na-hackyeah-2026/",
		photos: [
			"/events/hackyeah-2026/group.jpg",
			"/events/hackyeah-2026/table.jpg",
		],
	},
	{
		id: "hackcarpathia-2026",
		startDate: "2026-04-01",
		blogSlug: "hackcarpathia-2026",
		sourceUrl:
			"https://wsiz.edu.pl/media-o-nas/badz-gotowa-wygrywa-hackcarpathia-2026-informacje-medialne/",
		photos: [],
	},
	{
		id: "hacknation-2025",
		startDate: "2025-12-06",
		blogSlug: "hacknation-2025",
		sourceUrl:
			"https://wsiz.edu.pl/aktualnosci/studenci-i-absolwenci-wsiiz-w-finalach-hacknation-2025/",
		photos: [
			"/events/hacknation-2025/hall.jpg",
			"/events/hacknation-2025/screens.jpg",
			"/events/hacknation-2025/crowd.jpg",
			"/events/hacknation-2025/laptops.jpg",
		],
	},
];

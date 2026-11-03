import type { Messages } from "@/i18n/messages";

export type HackathonId = keyof Messages["hackathons"]["items"];

export type ProgramId = keyof Messages["programs"]["items"];

export type EventEntryData = {
	/** Data początku (ISO lub sam rok), do znaczników czasu. */
	startDate: string;
	/** Slug wpisu na blogu. */
	blogSlug: string;
	sourceUrl: string;
	photos: string[];
};

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

export type Program = EventEntryData & { id: ProgramId };

/** Staże i programy praktyk, od najnowszego. Teksty żyją w messages/*.json pod programs.items[id]. */
export const PROGRAMS: Program[] = [
	{
		id: "mlab-ai-2026",
		startDate: "2026-10-14",
		blogSlug: "mlab-ai-2026",
		sourceUrl:
			"https://torzeszow.pl/news/demo-day-mlab-ai-2026-studenci-stworzyli-nowe-narzedzia-dla-ngo",
		photos: [
			"/events/mlab-2026/demo-day.jpg",
			"/events/mlab-2026/certificates.jpg",
			"/events/mlab-2026/team.jpg",
		],
	},
	{
		id: "mlab-ai-2025",
		startDate: "2025",
		blogSlug: "mlab-ai-2025",
		sourceUrl: "https://mlab.mobitouch.net/",
		photos: [
			"/events/mlab-2025/group.jpg",
			"/events/mlab-2025/mentoring.jpg",
			"/events/mlab-2025/demo.jpg",
		],
	},
];

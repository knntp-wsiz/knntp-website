import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiArrowDown } from "react-icons/fi";
import CourseBrowser from "@/components/CourseBrowser";
import DotGrid from "@/components/DotGrid";
import HeroVideo from "@/components/HeroVideo";
import { isLocale, type Locale, localePath } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { COURSES } from "@/lib/courses";
import { alternates, openGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const { courses, meta } = getMessages(locale);
	return {
		title: courses.title,
		description: courses.description,
		alternates: alternates(locale, "/courses"),
		openGraph: openGraph(
			locale,
			"/courses",
			`${courses.title} | ${meta.siteName}`,
			courses.description,
			meta.siteName,
		),
	};
}

export default async function CoursesPage({ params }: Props) {
	const { locale: raw } = await params;
	if (!isLocale(raw)) notFound();
	const locale: Locale = raw;
	const { courses } = getMessages(locale);
	const { filters } = courses;

	const cards = COURSES.map((course) => {
		const text = courses.items[course.id];
		return {
			...course,
			summary: text.summary,
			certificateName: text.certificateName,
			href: localePath(locale, `/courses/${course.id}`),
			coverAlt: format(courses.coverAlt, { name: course.name }),
		};
	});

	return (
		<>
			<section
				aria-labelledby="courses-title"
				className="relative flex min-h-[60svh] items-center justify-center overflow-hidden border-b border-line-soft"
			>
				<HeroVideo base="/video/clouds" />
				<DotGrid className="absolute inset-0 h-full w-full" />
				<div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6">
					<h1
						id="courses-title"
						className="hero-shadow text-7xl font-bold sm:text-[6rem]"
					>
						{courses.title}
					</h1>
					<p className="hero-shadow mt-5 max-w-xl text-lg text-muted">
						{courses.lead}
					</p>
					<a
						href="#catalog"
						className="pointer-events-auto mt-9 inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors duration-150 hover:bg-text"
					>
						{courses.cta}
						<FiArrowDown aria-hidden="true" />
					</a>
				</div>
			</section>

			<div
				id="catalog"
				className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16 sm:px-6"
			>
				<CourseBrowser
					courses={cards}
					labels={{
						filtersLabel: courses.filtersLabel,
						topic: {
							label: filters.topic.label,
							choices: [
								{ value: "all", label: filters.topic.all },
								{ value: "programming", label: filters.topic.programming },
								{ value: "ai", label: filters.topic.ai },
							],
						},
						price: {
							label: filters.price.label,
							choices: [
								{ value: "all", label: filters.price.all },
								{ value: "free", label: filters.price.free },
								{ value: "paid", label: filters.price.paid },
							],
						},
						certificate: {
							label: filters.certificate.label,
							choices: [
								{ value: "all", label: filters.certificate.all },
								{ value: "yes", label: filters.certificate.yes },
								{ value: "no", label: filters.certificate.no },
							],
						},
						certificateCost: {
							label: filters.certificateCost.label,
							choices: [
								{ value: "all", label: filters.certificateCost.all },
								{ value: "free", label: filters.certificateCost.free },
								{ value: "paid", label: filters.certificateCost.paid },
							],
						},
						searchLabel: courses.searchLabel,
						searchPlaceholder: courses.searchPlaceholder,
						count: courses.count,
						empty: courses.empty,
						reset: courses.reset,
						details: courses.details,
						groups: courses.groups,
						badges: courses.badges,
						kinds: courses.kinds,
						hours: courses.hours,
					}}
				/>
			</div>
		</>
	);
}

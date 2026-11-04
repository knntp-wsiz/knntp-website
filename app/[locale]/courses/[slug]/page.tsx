import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight, FiAward } from "react-icons/fi";
import { isLocale, LOCALES, type Locale, localePath } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { COURSES, COURSES_CHECKED, getCourse } from "@/lib/courses";
import { alternates, openGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
	return LOCALES.flatMap((locale) =>
		COURSES.map((course) => ({ locale, slug: course.id })),
	);
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isLocale(locale)) return {};
	const course = getCourse(slug);
	if (!course) return {};
	const { courses, meta } = getMessages(locale);
	const text = courses.items[course.id];
	const path = `/courses/${slug}`;
	return {
		title: course.name,
		description: text.summary,
		alternates: alternates(locale, path),
		openGraph: openGraph(
			locale,
			path,
			`${course.name} | ${meta.siteName}`,
			text.summary,
			meta.siteName,
		),
	};
}

export default async function CoursePage({ params }: Props) {
	const { locale: raw, slug } = await params;
	if (!isLocale(raw)) notFound();
	const locale: Locale = raw;
	const course = getCourse(slug);
	if (!course) notFound();
	const m = getMessages(locale);
	const { courses } = m;
	const text = courses.items[course.id];
	const { detail, badges } = courses;

	const certificate =
		course.certificate === "none"
			? detail.noCertificate
			: `${course.certificate === "free" ? badges.certFree : badges.certPaid}: ${text.certificateName}`;
	const price = `${course.price === "free" ? badges.free : badges.paid}${course.cost ? `, ${course.cost}` : ""}`;
	const facts: [string, string][] = [
		[detail.kind, courses.kinds[course.kind]],
		[detail.provider, course.provider],
		[detail.price, price],
		[detail.certificate, certificate],
		...(course.level
			? ([[detail.level, courses.levels[course.level]]] as [string, string][])
			: []),
		...(course.hours
			? ([
					[
						detail.duration,
						format(courses.hours, {
							n: String(course.hours).replace(".", locale === "pl" ? "," : "."),
						}),
					],
				] as [string, string][])
			: []),
		[
			detail.language,
			course.languages
				.map(
					(code) => courses.languages[code as keyof typeof courses.languages],
				)
				.join(", "),
		],
		[detail.checked, COURSES_CHECKED],
	];

	return (
		<article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
			<Link
				href={localePath(locale, "/courses")}
				className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-text"
			>
				<FiArrowLeft aria-hidden="true" />
				{detail.back}
			</Link>

			<div className="mt-8 grid gap-12 lg:grid-cols-[1fr_21rem]">
				<div>
					<h1 className="text-5xl font-bold sm:text-7xl">{course.name}</h1>
					<p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm">
						{course.certificate !== "none" && (
							<span
								className={
									course.certificate === "free"
										? "inline-flex items-center gap-1.5 border border-accent bg-accent px-2.5 py-1 font-semibold text-on-accent"
										: "inline-flex items-center gap-1.5 border border-accent px-2.5 py-1 font-semibold text-accent"
								}
							>
								<FiAward aria-hidden="true" />
								{course.certificate === "free"
									? badges.certFree
									: badges.certPaid}
							</span>
						)}
						{course.certificate === "none" && (
							<span className="text-muted">{badges.certNone}</span>
						)}
						<span className="text-muted">{course.provider}</span>
					</p>

					<p className="mt-10 max-w-2xl text-xl text-text">{text.summary}</p>

					<h2 className="mt-12 text-3xl font-semibold">{detail.how}</h2>
					<p className="mt-4 max-w-2xl text-muted">{text.how}</p>

					<a
						href={course.url}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-10 inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors duration-150 hover:bg-text"
					>
						{detail.open}
						<FiArrowUpRight aria-hidden="true" />
						<span className="sr-only">{m.a11y.externalLink}</span>
					</a>
				</div>

				<aside aria-labelledby="facts-title" className="lg:pt-4">
					<h2 id="facts-title" className="text-2xl font-semibold">
						{detail.facts}
					</h2>
					<dl className="mt-4 border-t border-line">
						{facts.map(([term, value]) => (
							<div
								key={term}
								className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3"
							>
								<dt className="font-mono text-sm text-muted">{term}</dt>
								<dd className="text-text">{value}</dd>
							</div>
						))}
					</dl>
					<p className="mt-4 font-mono text-xs text-muted">
						{detail.sourceNote}
					</p>
				</aside>
			</div>
		</article>
	);
}

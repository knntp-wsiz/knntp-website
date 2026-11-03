import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { type Locale, localePath } from "@/i18n/config";
import type { EventEntryData } from "@/lib/events";

export type EventText = {
	name: string;
	place: string;
	date: string;
	badge: string;
	stats: readonly string[];
	summary: string;
	extra: string;
	credit: string;
	photoAlts: readonly string[];
};

type Props = {
	event: EventEntryData;
	text: EventText;
	locale: Locale;
	labels: {
		readMore: string;
		sourceLabel: string;
		credit: string;
		externalLink: string;
	};
};

/** Jeden wpis osi czasu (hackathon lub staż): data i miejsce z lewej, opis i zdjęcia z prawej. */
export default function EventEntry({ event, text, locale, labels }: Props) {
	const count = event.photos.length;
	return (
		<li className="grid gap-8 border-t border-line py-12 lg:grid-cols-[13rem_1fr]">
			<div className="font-mono text-sm">
				<time dateTime={event.startDate} className="block text-text">
					{text.date}
				</time>
				<p className="mt-1 text-muted">{text.place}</p>
				<p className="mt-4 inline-block border border-accent px-2.5 py-1 text-accent">
					{text.badge}
				</p>
			</div>

			<article>
				<h3 className="text-4xl font-semibold sm:text-5xl">{text.name}</h3>
				<ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm text-accent tabular">
					{text.stats.map((stat) => (
						<li key={stat}>{stat}</li>
					))}
				</ul>
				<p className="mt-6 max-w-2xl text-lg text-text">{text.summary}</p>
				{text.extra && (
					<p className="mt-3 max-w-2xl text-muted">{text.extra}</p>
				)}

				{count > 0 && (
					<div
						className={
							count === 2
								? "mt-8 grid max-w-2xl grid-cols-2 gap-3"
								: count === 3
									? "mt-8 grid grid-cols-3 gap-3"
									: "mt-8 grid grid-cols-2 gap-3"
						}
					>
						{event.photos.map((src, i) => (
							<Image
								key={src}
								src={src}
								alt={text.photoAlts[i] ?? ""}
								width={900}
								height={count === 2 ? 1200 : 600}
								sizes="(min-width: 1024px) 460px, 50vw"
								className={
									count === 2
										? "aspect-[3/4] w-full object-cover"
										: "aspect-[3/2] w-full object-cover"
								}
							/>
						))}
					</div>
				)}
				{text.credit && (
					<p className="mt-3 font-mono text-xs text-muted">{labels.credit}</p>
				)}

				<div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
					<Link
						href={localePath(locale, `/blog/${event.blogSlug}`)}
						className="inline-flex items-center gap-2 font-semibold text-accent hover:text-text"
					>
						{labels.readMore}
						<FiArrowRight aria-hidden="true" />
					</Link>
					<a
						href={event.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-muted hover:text-text"
					>
						{labels.sourceLabel}
						<FiArrowUpRight aria-hidden="true" />
						<span className="sr-only">{labels.externalLink}</span>
					</a>
				</div>
			</article>
		</li>
	);
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import DotGrid from "@/components/DotGrid";
import EventEntry from "@/components/EventEntry";
import HeroCopy from "@/components/HeroCopy";
import { HeroReveal, HeroTypingProvider } from "@/components/HeroTyping";
import HeroVideo from "@/components/HeroVideo";
import { isLocale, type Locale, localePath } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { getPosts } from "@/lib/blog";
import { HACKATHONS, PROGRAMS } from "@/lib/events";
import {
	DISCORD_URL,
	GITHUB_ORG_URL,
	LEADER,
	SUPERVISOR_URL,
} from "@/lib/site";

const primaryButton =
	"inline-flex items-center justify-center gap-2 bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors duration-150 hover:bg-text";
const secondaryButton =
	"inline-flex items-center justify-center gap-2 border border-line px-6 py-3.5 font-semibold text-text transition-colors duration-150 hover:border-accent hover:text-accent";

function formatDate(iso: string, locale: Locale) {
	return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(iso));
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale: raw } = await params;
	if (!isLocale(raw)) notFound();
	const locale: Locale = raw;
	const m = getMessages(locale);
	const posts = getPosts(locale).slice(0, 3);

	return (
		<>
			<section
				aria-labelledby="hero-title"
				className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden border-b border-line-soft"
			>
				<HeroVideo base="/video/clouds" />
				<DotGrid className="absolute inset-0 h-full w-full" />
				<div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
					<HeroTypingProvider>
						<HeroCopy
							title="KNNTP"
							fullName={m.hero.fullName}
							offer={m.hero.offer}
						/>
						<HeroReveal className="flex w-full flex-col items-center">
							<div className="pointer-events-auto mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
								<a href="/forms" className={primaryButton}>
									{m.hero.join}
									<FiArrowRight aria-hidden="true" />
								</a>
								<a
									href={DISCORD_URL}
									target="_blank"
									rel="noopener noreferrer"
									className={secondaryButton}
								>
									<FaDiscord aria-hidden="true" />
									{m.hero.discord}
									<span className="sr-only">{m.a11y.externalLink}</span>
								</a>
							</div>
							<p className="hero-shadow pointer-events-auto mt-12 max-w-xl border-t border-line-soft pt-5 font-mono text-sm text-muted">
								<span className="text-accent">{m.hero.latestLabel}</span>
								{" / "}
								<Link
									href={localePath(locale, "/blog/hackyeah-2026")}
									className="text-text underline decoration-line hover:decoration-accent"
								>
									{m.hero.latest}
								</Link>
							</p>
						</HeroReveal>
					</HeroTypingProvider>
				</div>
			</section>

			<section
				id="themes"
				aria-labelledby="themes-title"
				className="border-b border-line-soft bg-raised"
			>
				<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
					<h2 id="themes-title" className="text-5xl font-semibold sm:text-6xl">
						{m.themes.title}
					</h2>
					<p className="mt-5 max-w-xl text-lg text-muted">{m.themes.lead}</p>
					<ul className="mt-14 border-b border-line">
						{m.themes.items.map((item) => (
							<li
								key={item.name}
								className="grid gap-4 border-t border-line py-8 lg:grid-cols-2 lg:items-baseline lg:gap-12 lg:py-10"
							>
								<h3 className="text-7xl font-bold sm:text-8xl">{item.name}</h3>
								<div>
									<ul className="flex flex-wrap gap-x-6 gap-y-1 font-display text-3xl font-semibold text-accent sm:text-4xl">
										{item.topics.map((topic) => (
											<li key={topic}>{topic}</li>
										))}
									</ul>
									<p className="mt-3 text-lg text-muted">{item.text}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</section>

			<section
				id="about"
				aria-labelledby="about-title"
				className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
			>
				<div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
					<div>
						<h2 id="about-title" className="text-5xl font-semibold sm:text-6xl">
							{m.about.title}
						</h2>
						<p className="mt-6 max-w-md text-lg text-muted">{m.about.lead}</p>
					</div>
					<ul>
						{m.about.items.map((item) => (
							<li
								key={item.title}
								className="grid gap-2 border-t border-line py-7 sm:grid-cols-[11rem_1fr] sm:gap-8"
							>
								<h3 className="text-3xl font-semibold">{item.title}</h3>
								<p className="text-muted">{item.text}</p>
							</li>
						))}
					</ul>
				</div>

				<div className="mt-20 border-t border-line pt-8">
					<h3 className="text-2xl font-semibold">{m.about.historyTitle}</h3>
					<ul className="mt-6 grid gap-8 sm:grid-cols-3">
						{m.about.history.map((entry) => (
							<li key={entry.name}>
								<p className="font-mono text-sm text-accent tabular">
									{entry.count}
								</p>
								<p className="mt-1 font-display text-3xl font-semibold">
									{entry.name}
								</p>
							</li>
						))}
					</ul>
					<p className="mt-6 font-mono text-xs text-muted">
						{m.about.historyNote}
					</p>
				</div>
			</section>

			<section
				id="hackathons"
				aria-labelledby="hackathons-title"
				className="border-y border-line-soft bg-raised"
			>
				<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
					<h2
						id="hackathons-title"
						className="text-5xl font-semibold sm:text-6xl"
					>
						{m.hackathons.title}
					</h2>
					<p className="mt-5 max-w-xl text-lg text-muted">
						{m.hackathons.lead}
					</p>

					<ol className="mt-14">
						{HACKATHONS.map((event) => {
							const text = m.hackathons.items[event.id];
							return (
								<EventEntry
									key={event.id}
									event={event}
									text={text}
									locale={locale}
									labels={{
										readMore: m.hackathons.readMore,
										sourceLabel: m.hackathons.sourceLabel,
										credit: format(m.hackathons.photoCredit, {
											credit: text.credit,
										}),
										externalLink: m.a11y.externalLink,
									}}
								/>
							);
						})}
					</ol>

					<div className="border-t border-line pt-10">
						<h3 className="text-2xl font-semibold">
							{m.hackathons.earlierTitle}
						</h3>
						<ul className="mt-5 grid gap-4 sm:grid-cols-3">
							{m.hackathons.earlier.map((entry) => (
								<li key={entry.name + entry.date}>
									<p className="font-display text-2xl font-semibold">
										{entry.name}
									</p>
									<p className="font-mono text-sm text-muted">{entry.date}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section
				id="programs"
				aria-labelledby="programs-title"
				className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
			>
				<h2 id="programs-title" className="text-5xl font-semibold sm:text-6xl">
					{m.programs.title}
				</h2>
				<p className="mt-5 max-w-xl text-lg text-muted">{m.programs.lead}</p>
				<ol className="mt-14">
					{PROGRAMS.map((event) => {
						const text = m.programs.items[event.id];
						return (
							<EventEntry
								key={event.id}
								event={event}
								text={text}
								locale={locale}
								labels={{
									readMore: m.hackathons.readMore,
									sourceLabel: text.sourceLabel,
									credit: format(m.hackathons.photoCredit, {
										credit: text.credit,
									}),
									externalLink: m.a11y.externalLink,
								}}
							/>
						);
					})}
				</ol>
			</section>

			<section
				id="why"
				aria-labelledby="why-title"
				className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
			>
				<h2
					id="why-title"
					className="max-w-3xl text-5xl font-semibold sm:text-6xl"
				>
					{m.why.title}
				</h2>
				<ul className="mt-14 grid gap-x-12 gap-y-2 md:grid-cols-2">
					{m.why.items.map((item) => (
						<li key={item.title} className="border-t border-line py-7">
							<h3 className="text-3xl font-semibold">{item.title}</h3>
							<p className="mt-3 max-w-md text-muted">{item.text}</p>
						</li>
					))}
				</ul>
			</section>

			<section
				id="team"
				aria-labelledby="team-title"
				className="border-t border-line-soft"
			>
				<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
					<h2 id="team-title" className="text-5xl font-semibold sm:text-6xl">
						{m.team.title}
					</h2>
					<div className="mt-14 grid gap-14 md:grid-cols-2">
						<article className="border-t border-line pt-7">
							<Image
								src="/team/leader.jpg"
								alt={m.team.leader.photoAlt}
								width={480}
								height={320}
								sizes="(min-width: 768px) 384px, 100vw"
								className="mb-6 aspect-[3/2] w-full max-w-sm object-cover object-[center_35%]"
							/>
							<p className="font-mono text-sm text-accent">
								{m.team.leader.role}
							</p>
							<h3 className="mt-2 text-4xl font-semibold">
								{m.team.leader.name}
							</h3>
							<p className="mt-4 max-w-md text-muted">{m.team.leader.text}</p>
							<ul className="mt-6 flex gap-5">
								<li>
									<a
										href={LEADER.github}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`GitHub ${m.team.leader.name} ${m.a11y.externalLink}`}
										className="text-muted transition-colors hover:text-accent"
									>
										<FaGithub className="h-6 w-6" />
									</a>
								</li>
								<li>
									<a
										href={LEADER.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`LinkedIn ${m.team.leader.name} ${m.a11y.externalLink}`}
										className="text-muted transition-colors hover:text-accent"
									>
										<FaLinkedin className="h-6 w-6" />
									</a>
								</li>
							</ul>
						</article>

						<article className="border-t border-line pt-7">
							<Image
								src="/team/supervisor.jpg"
								alt={m.team.supervisor.photoAlt}
								width={480}
								height={320}
								sizes="(min-width: 768px) 480px, 100vw"
								className="mb-6 aspect-[3/2] w-full max-w-sm object-cover"
							/>
							<p className="font-mono text-sm text-accent">
								{m.team.supervisor.role}
							</p>
							<h3 className="mt-2 text-4xl font-semibold">
								{m.team.supervisor.name}
							</h3>
							<p className="mt-4 max-w-md text-muted">
								{m.team.supervisor.text}
							</p>
							<a
								href={SUPERVISOR_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-5 inline-flex items-center gap-2 text-accent hover:text-text"
							>
								{m.team.supervisor.link}
								<FiArrowUpRight aria-hidden="true" />
								<span className="sr-only">{m.a11y.externalLink}</span>
							</a>
						</article>
					</div>
				</div>
			</section>

			{posts.length > 0 && (
				<section
					aria-labelledby="blog-title"
					className="border-t border-line-soft bg-raised"
				>
					<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<h2
								id="blog-title"
								className="text-5xl font-semibold sm:text-6xl"
							>
								{m.blog.latest}
							</h2>
							<Link
								href={localePath(locale, "/blog")}
								className="inline-flex items-center gap-2 font-semibold text-accent hover:text-text"
							>
								{m.blog.all}
								<FiArrowRight aria-hidden="true" />
							</Link>
						</div>
						<ul className="mt-12">
							{posts.map((post) => (
								<li key={post.slug} className="border-t border-line">
									<Link
										href={localePath(locale, `/blog/${post.slug}`)}
										className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8"
									>
										<time
											dateTime={post.date}
											className="font-mono text-sm text-muted tabular"
										>
											{formatDate(post.date, locale)}
										</time>
										<span>
											<span className="block font-display text-3xl font-semibold hover:text-accent">
												{post.title}
											</span>
											<span className="mt-2 block max-w-2xl text-muted">
												{post.description}
											</span>
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</section>
			)}

			<section
				id="join"
				aria-labelledby="join-title"
				className="border-t border-line-soft"
			>
				<div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
					<h2
						id="join-title"
						className="max-w-3xl text-6xl font-bold sm:text-[6rem]"
					>
						{m.join.title}
					</h2>
					<p className="mt-6 max-w-xl text-lg text-muted">{m.join.text}</p>
					<div className="mt-10 flex flex-col gap-3 sm:flex-row">
						<a href="/forms" className={primaryButton}>
							{m.join.form}
							<FiArrowRight aria-hidden="true" />
						</a>
						<a
							href={DISCORD_URL}
							target="_blank"
							rel="noopener noreferrer"
							className={secondaryButton}
						>
							<FaDiscord aria-hidden="true" />
							{m.join.discord}
							<span className="sr-only">{m.a11y.externalLink}</span>
						</a>
						<a
							href={GITHUB_ORG_URL}
							target="_blank"
							rel="noopener noreferrer"
							className={secondaryButton}
						>
							<FaGithub aria-hidden="true" />
							GitHub
							<span className="sr-only">{m.a11y.externalLink}</span>
						</a>
					</div>
				</div>
			</section>
		</>
	);
}

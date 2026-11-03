import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { isLocale, LOCALES, type Locale, localePath } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { allLocalePosts, getPost } from "@/lib/blog";
import { absolute, alternates } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
	return allLocalePosts().map(({ locale, slug }) => ({ locale, slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!isLocale(locale)) return {};
	const post = getPost(slug, locale);
	if (!post) return {};
	const { meta } = getMessages(locale);
	const path = `/blog/${slug}`;
	const other = LOCALES.filter((code) => code !== locale).filter((code) =>
		getPost(slug, code),
	);

	return {
		title: post.title,
		description: post.description,
		alternates: {
			...alternates(locale, path),
			// hreflang tylko dla wersji, które istnieją.
			languages: Object.fromEntries(
				[locale, ...other].map((code) => [
					code,
					absolute(localePath(code, path)),
				]),
			),
		},
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			url: absolute(localePath(locale, path)),
			siteName: meta.siteName,
			publishedTime: post.date,
			images: post.cover
				? [{ url: post.cover, alt: post.coverAlt ?? post.title }]
				: undefined,
		},
	};
}

export default async function PostPage({ params }: Props) {
	const { locale: raw, slug } = await params;
	if (!isLocale(raw)) notFound();
	const locale: Locale = raw;
	const post = getPost(slug, locale);
	if (!post) notFound();
	const m = getMessages(locale);

	const date = new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(post.date));

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		inLanguage: locale,
		mainEntityOfPage: absolute(localePath(locale, `/blog/${slug}`)),
		image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
		author: { "@type": "Organization", name: m.meta.siteName },
		publisher: {
			"@type": "Organization",
			name: m.meta.siteName,
			url: SITE_URL,
		},
	};

	return (
		<article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD zbudowany z treści repozytorium
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<Link
				href={localePath(locale, "/blog")}
				className="inline-flex items-center gap-2 text-sm text-muted hover:text-text"
			>
				<FiArrowLeft aria-hidden="true" />
				{m.blog.back}
			</Link>

			<header className="mt-10 max-w-4xl">
				<p className="font-mono text-sm text-muted tabular">
					<time dateTime={post.date}>{date}</time>
					{" / "}
					{format(m.blog.readingTime, { minutes: post.readingMinutes })}
				</p>
				<h1 className="mt-3 text-5xl font-bold sm:text-7xl">{post.title}</h1>
				<p className="mt-6 max-w-2xl text-xl text-muted">{post.description}</p>
			</header>

			{post.cover && (
				<figure className="mt-12">
					<Image
						src={post.cover}
						alt={post.coverAlt ?? ""}
						width={1200}
						height={800}
						sizes="(min-width: 640px) 576px, 100vw"
						priority
						className="h-auto w-full max-w-xl"
					/>
					{post.photoCredit && (
						<figcaption className="mt-3 font-mono text-xs text-muted">
							{format(m.hackathons.photoCredit, { credit: post.photoCredit })}
						</figcaption>
					)}
				</figure>
			)}

			<div
				className="prose-post mt-12"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: Markdown z repozytorium, nie od użytkowników
				dangerouslySetInnerHTML={{ __html: post.html }}
			/>

			{post.sourceUrl && (
				<p className="mt-14 border-t border-line pt-6 text-sm text-muted">
					{m.blog.source}:{" "}
					<a
						href={post.sourceUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 text-accent hover:text-text"
					>
						{post.sourceName ?? post.sourceUrl}
						<FiArrowUpRight aria-hidden="true" />
						<span className="sr-only">{m.a11y.externalLink}</span>
					</a>
				</p>
			)}
		</article>
	);
}

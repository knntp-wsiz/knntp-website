import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale, localePath } from "@/i18n/config";
import { format, getMessages } from "@/i18n/messages";
import { getPosts } from "@/lib/blog";
import { alternates, openGraph } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const { blog, meta } = getMessages(locale);
	return {
		title: blog.title,
		description: blog.description,
		alternates: alternates(locale, "/blog"),
		openGraph: openGraph(
			locale,
			"/blog",
			`${blog.title} | ${meta.siteName}`,
			blog.description,
			meta.siteName,
		),
	};
}

function formatDate(iso: string, locale: Locale) {
	return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	}).format(new Date(iso));
}

export default async function BlogIndex({ params }: Props) {
	const { locale: raw } = await params;
	if (!isLocale(raw)) notFound();
	const locale: Locale = raw;
	const { blog } = getMessages(locale);
	const posts = getPosts(locale);

	return (
		<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
			<h1 className="text-6xl font-bold sm:text-[6rem]">{blog.title}</h1>
			<p className="mt-5 max-w-xl text-lg text-muted">{blog.intro}</p>

			{posts.length === 0 ? (
				<p className="mt-16 text-muted">{blog.empty}</p>
			) : (
				<ul className="mt-16">
					{posts.map((post) => (
						<li key={post.slug} className="border-t border-line">
							<Link
								href={localePath(locale, `/blog/${post.slug}`)}
								className="group grid gap-6 py-8 md:grid-cols-[14rem_1fr] md:gap-10"
							>
								{post.cover ? (
									<Image
										src={post.cover}
										alt={post.coverAlt ?? ""}
										width={448}
										height={300}
										sizes="(min-width: 768px) 224px, 100vw"
										className="aspect-[3/2] w-full object-cover"
									/>
								) : (
									<div className="hidden md:block" aria-hidden="true" />
								)}
								<div>
									<p className="font-mono text-sm text-muted tabular">
										<time dateTime={post.date}>
											{formatDate(post.date, locale)}
										</time>
										{" / "}
										{format(blog.readingTime, { minutes: post.readingMinutes })}
									</p>
									<h2 className="mt-2 text-4xl font-semibold group-hover:text-accent">
										{post.title}
									</h2>
									<p className="mt-3 max-w-2xl text-muted">
										{post.description}
									</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/i18n/config";
import { allLocalePosts, getAllSlugs } from "@/lib/blog";
import { COURSES } from "@/lib/courses";
import { absolute } from "@/lib/seo";

function languages(path: string) {
	return Object.fromEntries(
		LOCALES.map((code) => [code, absolute(localePath(code, path))]),
	);
}

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = allLocalePosts();
	const complete = new Set(
		getAllSlugs().filter(
			(slug) => posts.filter((p) => p.slug === slug).length === LOCALES.length,
		),
	);

	const pages = ["/", "/courses", "/blog"].flatMap((path) =>
		LOCALES.map((locale) => ({
			url: absolute(localePath(locale, path)),
			changeFrequency: "weekly" as const,
			priority: path === "/" ? 1 : 0.7,
			alternates: { languages: languages(path) },
		})),
	);

	const courses = COURSES.flatMap(({ id }) =>
		LOCALES.map((locale) => ({
			url: absolute(localePath(locale, `/courses/${id}`)),
			changeFrequency: "monthly" as const,
			priority: 0.5,
			alternates: { languages: languages(`/courses/${id}`) },
		})),
	);

	const blog = posts.map(({ slug, locale, date }) => ({
		url: absolute(localePath(locale, `/blog/${slug}`)),
		lastModified: date,
		changeFrequency: "yearly" as const,
		priority: 0.6,
		alternates: complete.has(slug)
			? { languages: languages(`/blog/${slug}`) }
			: undefined,
	}));

	return [...pages, ...courses, ...blog];
}

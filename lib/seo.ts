import type { Metadata } from "next";
import { LOCALES, type Locale, localePath, OG_LOCALE } from "@/i18n/config";
import { SITE_URL } from "@/lib/site";

export function absolute(path: string) {
	return `${SITE_URL}${path === "/" ? "" : path}` || SITE_URL;
}

/** canonical + hreflang dla ścieżki podanej bez prefiksu języka. */
export function alternates(locale: Locale, path = "/"): Metadata["alternates"] {
	return {
		canonical: absolute(localePath(locale, path)),
		languages: {
			...Object.fromEntries(
				LOCALES.map((code) => [code, absolute(localePath(code, path))]),
			),
			"x-default": absolute(localePath("pl", path)),
		},
	};
}

/** BreadcrumbList JSON-LD; ścieżki podajemy bez prefiksu języka. */
export function breadcrumbs(
	locale: Locale,
	items: { name: string; path: string }[],
) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: absolute(localePath(locale, item.path)),
		})),
	};
}

export function openGraph(
	locale: Locale,
	path: string,
	title: string,
	description: string,
	siteName: string,
): Metadata["openGraph"] {
	return {
		title,
		description,
		url: absolute(localePath(locale, path)),
		siteName,
		locale: OG_LOCALE[locale],
		alternateLocale: LOCALES.filter((c) => c !== locale).map(
			(c) => OG_LOCALE[c],
		),
		type: "website",
	};
}

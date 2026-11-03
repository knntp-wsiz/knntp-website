export const LOCALES = ["pl", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pl";
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
	return (LOCALES as readonly string[]).includes(value);
}

/** Ścieżka publiczna: polski bez prefiksu, angielski pod /en. */
export function localePath(locale: Locale, path = "/"): string {
	const clean = path === "/" ? "" : path;
	return locale === DEFAULT_LOCALE ? clean || "/" : `/en${clean}`;
}

export const OG_LOCALE: Record<Locale, string> = {
	pl: "pl_PL",
	en: "en_US",
};

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { LOCALES, type Locale } from "@/i18n/config";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
	slug: string;
	locale: Locale;
	title: string;
	description: string;
	/** ISO, np. 2026-10-05 */
	date: string;
	cover?: string;
	coverAlt?: string;
	sourceUrl?: string;
	sourceName?: string;
	photoCredit?: string;
	readingMinutes: number;
};

export type Post = PostMeta & { html: string };

const REQUIRED = ["title", "description", "date"] as const;

/** Prosty parser frontmattera: `klucz: wartość` między liniami `---`. */
function parse(raw: string, file: string) {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) throw new Error(`Brak frontmattera w ${file}`);
	const data: Record<string, string> = {};
	for (const line of match[1].split(/\r?\n/)) {
		const i = line.indexOf(":");
		if (i === -1) continue;
		data[line.slice(0, i).trim()] = line
			.slice(i + 1)
			.trim()
			.replace(/^"(.*)"$/, "$1");
	}
	for (const key of REQUIRED) {
		if (!data[key]) throw new Error(`Brak pola "${key}" w ${file}`);
	}
	return { data, body: match[2] };
}

function fileFor(slug: string, locale: Locale) {
	return path.join(BLOG_DIR, `${slug}.${locale}.md`);
}

function read(slug: string, locale: Locale): Post | null {
	const file = fileFor(slug, locale);
	if (!fs.existsSync(file)) return null;
	const { data, body } = parse(fs.readFileSync(file, "utf8"), file);
	const words = body.split(/\s+/).filter(Boolean).length;
	return {
		slug,
		locale,
		title: data.title,
		description: data.description,
		date: data.date,
		cover: data.cover,
		coverAlt: data.coverAlt,
		sourceUrl: data.sourceUrl,
		sourceName: data.sourceName,
		photoCredit: data.photoCredit,
		readingMinutes: Math.max(1, Math.round(words / 200)),
		html: marked.parse(body, { async: false }) as string,
	};
}

export function getAllSlugs(): string[] {
	if (!fs.existsSync(BLOG_DIR)) return [];
	const slugs = new Set<string>();
	for (const name of fs.readdirSync(BLOG_DIR)) {
		const m = name.match(/^(.+)\.(pl|en)\.md$/);
		if (m) slugs.add(m[1]);
	}
	return [...slugs];
}

/** Posty w danym języku, od najnowszego. */
export function getPosts(locale: Locale): PostMeta[] {
	return getAllSlugs()
		.map((slug) => read(slug, locale))
		.filter((p): p is Post => p !== null)
		.sort((a, b) => b.date.localeCompare(a.date))
		.map(({ html: _html, ...meta }) => meta);
}

export function getPost(slug: string, locale: Locale): Post | null {
	return read(slug, locale);
}

export function allLocalePosts(): {
	slug: string;
	locale: Locale;
	date: string;
}[] {
	return LOCALES.flatMap((locale) =>
		getPosts(locale).map(({ slug, date }) => ({ slug, locale, date })),
	);
}

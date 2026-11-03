// Sprawdza kompletność tłumaczeń: te same klucze i długości tablic w messages/*.json,
// brak pustych tekstów (poza jawnie dozwolonymi), zgodne {placeholdery}
// oraz komplet wersji językowych każdego wpisu na blogu.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const LOCALES = ["pl", "en"];
const BASE = "pl";
/** Klucze, które mogą być puste w każdym języku (np. brak zdjęć lub dopisku). */
const ALLOW_EMPTY = [/\.extra$/, /\.credit$/, /\.photoAlts$/];
/** Wartości, które celowo brzmią tak samo w obu językach (nazwy własne). */
const ALLOW_SAME = [
	/\.name$/,
	/^meta\.siteName$/,
	/^meta\.titleTemplate$/,
	/^lang\./,
];

const errors = [];
const fail = (msg) => errors.push(msg);

function flatten(value, prefix = "", out = new Map()) {
	if (Array.isArray(value)) {
		out.set(`${prefix}[]`, value.length);
		if (value.length === 0) out.set(prefix, "");
		value.forEach((v, i) => {
			flatten(v, `${prefix}.${i}`, out);
		});
	} else if (value && typeof value === "object") {
		for (const [k, v] of Object.entries(value)) {
			flatten(v, prefix ? `${prefix}.${k}` : k, out);
		}
	} else {
		out.set(prefix, value);
	}
	return out;
}

const load = (locale) =>
	flatten(
		JSON.parse(
			fs.readFileSync(path.join(root, "messages", `${locale}.json`), "utf8"),
		),
	);

const base = load(BASE);
const placeholders = (s) =>
	typeof s === "string"
		? [...s.matchAll(/\{(\w+)\}/g)]
				.map((m) => m[1])
				.sort()
				.join(",")
		: "";

for (const locale of LOCALES) {
	const current = load(locale);
	for (const key of base.keys()) {
		if (!current.has(key)) fail(`[${locale}] brakuje klucza: ${key}`);
	}
	for (const [key, value] of current) {
		if (!base.has(key)) fail(`[${locale}] nadmiarowy klucz: ${key}`);
		if (key.endsWith("[]")) {
			if (base.get(key) !== value) {
				fail(
					`[${locale}] inna długość tablicy ${key}: ${value} zamiast ${base.get(key)}`,
				);
			}
			continue;
		}
		if (typeof value === "string") {
			const optional = ALLOW_EMPTY.some((re) => re.test(key));
			if (value.trim() === "" && !optional) {
				fail(`[${locale}] pusty tekst: ${key}`);
			}
			if (placeholders(value) !== placeholders(base.get(key))) {
				fail(`[${locale}] inne placeholdery w ${key}`);
			}
			const sameOk = ALLOW_SAME.some((re) => re.test(key));
			if (
				locale !== BASE &&
				!sameOk &&
				value === base.get(key) &&
				value.includes(" ") &&
				value.length > 12
			) {
				fail(
					`[${locale}] ${key} wygląda na nieprzetłumaczony (identyczny z ${BASE})`,
				);
			}
		}
	}
}

// Wpisy na blogu: każdy slug w każdym języku, te same wymagane pola.
const blogDir = path.join(root, "content", "blog");
if (fs.existsSync(blogDir)) {
	const slugs = new Set();
	for (const name of fs.readdirSync(blogDir)) {
		const m = name.match(/^(.+)\.(\w+)\.md$/);
		if (!m) {
			fail(
				`[blog] zła nazwa pliku: ${name} (oczekiwano slug.pl.md i slug.en.md)`,
			);
		} else if (!LOCALES.includes(m[2])) {
			fail(`[blog] nieznany język w ${name}`);
		} else {
			slugs.add(m[1]);
		}
	}
	for (const slug of slugs) {
		for (const locale of LOCALES) {
			const file = path.join(blogDir, `${slug}.${locale}.md`);
			if (!fs.existsSync(file)) {
				fail(`[blog] brak wersji ${locale} wpisu: ${slug}`);
				continue;
			}
			const raw = fs.readFileSync(file, "utf8");
			const front = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
			if (!front) {
				fail(`[blog] ${slug}.${locale}: brak frontmattera`);
				continue;
			}
			for (const field of ["title", "description", "date"]) {
				if (!new RegExp(`^${field}:\\s*\\S`, "m").test(front[1])) {
					fail(`[blog] ${slug}.${locale}: brak pola ${field}`);
				}
			}
		}
	}
}

if (errors.length) {
	console.error(
		`Błędy tłumaczeń (${errors.length}):\n- ${errors.join("\n- ")}`,
	);
	process.exit(1);
}
console.log(
	`i18n OK: ${base.size} wpisów w ${LOCALES.length} językach, blog zgodny.`,
);

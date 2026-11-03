import en from "@/messages/en.json";
import pl from "@/messages/pl.json";
import type { Locale } from "./config";

/** Kształt słownika wynika z pl.json; en.json musi go spełniać (błąd kompilacji przy braku klucza). */
export type Messages = typeof pl;

const messages: Record<Locale, Messages> = { pl, en };

export function getMessages(locale: Locale): Messages {
	return messages[locale];
}

/** Podstawia {nazwa} w tłumaczeniu. */
export function format(
	template: string,
	values: Record<string, string | number>,
): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) =>
		String(values[key] ?? `{${key}}`),
	);
}

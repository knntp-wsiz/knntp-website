import { type NextRequest, NextResponse } from "next/server";
import {
	DEFAULT_LOCALE,
	isLocale,
	LOCALE_COOKIE,
	type Locale,
} from "@/i18n/config";

const COOKIE_OPTIONS = {
	path: "/",
	maxAge: 60 * 60 * 24 * 365,
	sameSite: "lax",
} as const;

function preferredLocale(header: string | null): Locale {
	const first = header?.split(",")[0]?.trim().slice(0, 2).toLowerCase();
	return first && isLocale(first) ? first : DEFAULT_LOCALE;
}

/**
 * Polski jest domyślny i działa bez prefiksu (rewrite do /pl),
 * angielski żyje pod /en. Adres /pl/* przekierowuje na wersję bez prefiksu.
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === "/pl" || pathname.startsWith("/pl/")) {
		const url = request.nextUrl.clone();
		url.pathname = pathname.slice(3) || "/";
		const response = NextResponse.redirect(url, 308);
		response.cookies.set(LOCALE_COOKIE, "pl", COOKIE_OPTIONS);
		return response;
	}

	if (pathname === "/en" || pathname.startsWith("/en/")) {
		const response = NextResponse.next();
		response.cookies.set(LOCALE_COOKIE, "en", COOKIE_OPTIONS);
		return response;
	}

	if (pathname === "/" && !request.cookies.has(LOCALE_COOKIE)) {
		if (preferredLocale(request.headers.get("accept-language")) === "en") {
			const url = request.nextUrl.clone();
			url.pathname = "/en";
			const response = NextResponse.redirect(url, 307);
			response.cookies.set(LOCALE_COOKIE, "en", COOKIE_OPTIONS);
			return response;
		}
	}

	const url = request.nextUrl.clone();
	url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
	return NextResponse.rewrite(url);
}

export const config = {
	matcher: [
		"/((?!_next|api|dc|forms|form|events|team|opengraph-image|.*\\..*).*)",
	],
};

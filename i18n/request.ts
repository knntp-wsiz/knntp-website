import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !locales.includes(locale as any)) {
    
        // Fallback na domyślny język, jeśli brak lub nieobsługiwany język, zdefiniowany w ./config.ts
        locale = defaultLocale;
    }

    return {
        locale,

        // Odczyt odpowiedniego pliku z tłumaczeniami
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
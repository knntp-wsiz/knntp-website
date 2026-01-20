import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config'; 

export default createMiddleware({
  locales: locales, // ./i18n/config.ts

  defaultLocale: defaultLocale
});
 
export const config = {
  matcher: ['/', '/(pl|en)/:path*']
};
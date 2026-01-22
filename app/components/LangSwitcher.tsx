'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { ChangeEvent, useTransition } from 'react';
import { locales } from '@/i18n/config';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const t = useTranslations('Header');

    // Zmiana języka dla dropdown:
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const handleToggle = () => {
        const currentIndex = locales.indexOf(locale);
        const nextIndex = (currentIndex + 1) % locales.length;
        const nextLocale = locales[nextIndex];

        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    // Przełącznik języka jako przycisk: (imo, stylizacje mozna tu poprawic)

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className="flex flex-row justify-between items-center gap-1 border border-text-primary hover:border-text-secondary rounded px-2 py-1 hover:text-secondary transition-colors uppercase text-sm text-primary font-semibold min-w-[3rem] cursor-pointer mr-5"
            aria-label={t("lang-change")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>
            {}
            {locale}
        </button>
    );

    // Przełącznik języka jako dropdown:
    //
    // return (
    //     <label className="relative inline-flex items-center">
    //           {}
    //           <select
    //               defaultValue={locale}
    //               onChange={handleChange}
    //               disabled={isPending}
    //               className="bg-transparent py-2 pl-3 pr-8 text-sm font-medium focus:outline-none cursor-pointer"
    //           >
    //               <option value="pl">PL</option>
    //               <option value="en">EN</option>
    //           </select>
    //     </label>
    // );
}
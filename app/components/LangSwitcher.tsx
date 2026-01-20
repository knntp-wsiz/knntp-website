'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation'; // Import z naszego nowego pliku!
import { ChangeEvent, useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      // zachowanie scieżki
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="relative inline-flex items-center">
        {/* styl placeholder */}
        <select
          defaultValue={locale}
          onChange={handleChange}
          disabled={isPending}
          className="bg-transparent py-2 pl-3 pr-8 text-sm font-medium focus:outline-none cursor-pointer"
        >
          <option value="pl">PL</option>
          <option value="en">EN</option>
        </select>
    </label>
  );
}
import { createNavigation } from 'next-intl/navigation';
import { locales } from './config';

// Tworzymy i eksportujemy wrappery nawigacji, które wiedzą o naszych językach
export const { Link, redirect, usePathname, useRouter } =
    createNavigation({ locales });
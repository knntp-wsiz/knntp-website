# KNNTP website

Strona koła naukowego KNNTP (WSIiZ Rzeszów), domena knntp.xyz, hosting Vercel. Produkt i odbiorcy: `PRODUCT.md`. Repo: `knntp-wsiz/knntp-website`.

## Stack i komendy

Next.js 15 (App Router, Turbopack), React 19, Tailwind v4 (tokeny w `app/globals.css`), Biome, pnpm, TypeScript.

- `pnpm dev`: serwer deweloperski
- `pnpm lint` (Biome), `pnpm typecheck`, `pnpm lint:i18n`
- `pnpm build`: uruchamia najpierw `lint:i18n`, potem `next build`
- `pnpm start -p <port>`: sprawdzanie zbudowanej wersji (po zmianach trzeba przebudować)

Biome i Next potrafią zmienić `postcss.config.mjs` i `tsconfig.json`. Przed commitem cofnij je (`git checkout`). Na Windowsie `git status` pokazuje też szum po końcach linii (CRLF), nie dodawaj tych plików przez `git add -A`.

## Zasady, które obowiązują

- **Dwa języki, zero wyjątków.** Polski jest domyślny pod `/` (middleware robi rewrite do `/pl`, a `/pl/*` przekierowuje na adres bez prefiksu), angielski pod `/en`. Każdy tekst UI jest w `messages/pl.json` i `messages/en.json`; `en.json` jest sprawdzany typami względem `pl.json`. `scripts/check-i18n.mjs` pilnuje kluczy, długości tablic, placeholderów, pustych i nieprzetłumaczonych tekstów oraz par wpisów bloga. Wyjątki (nazwy własne) dopisuj do `ALLOW_SAME` / `ALLOW_EMPTY` w skrypcie.
- **Blog to pliki**, bez bazy: `content/blog/<slug>.<pl|en>.md`, frontmatter: `title`, `description`, `date`, `cover`, `coverAlt`, `sourceUrl`, `sourceName`, `photoCredit`. Każdy wpis musi mieć obie wersje językowe. Zdjęcia we wpisach to `![alt](/ścieżka)` i podpis w kursywie linijkę niżej.
- **Fakty tylko ze źródeł.** Wyniki, liczby i nazwiska podajemy takie, jakie opisała uczelnia lub organizator, z linkiem do źródła i kredytem zdjęć. Gdy źródła rozchodzą się z tym, co mówi właściciel, zgłaszamy rozbieżność i pytamy. Ustalone: mLab AI 2025 to 2. edycja, a mLab AI 2026 to 3. edycja (potwierdził właściciel; torzeszow.pl pisze tylko „druga w obecnej formule”, więc nie cytujemy tego sformułowania).
- **Timeline wydarzeń**: hackathony w `HACKATHONS`, staże w `PROGRAMS` (`lib/events.ts`), teksty w `messages/*.json` pod `hackathons.items[id]` i `programs.items[id]`. Oba renderuje wspólny `components/EventEntry.tsx`. Chronologicznie, od najnowszego.
- **Kursy**: katalog pod `/courses` (`/en/courses`) i szczegóły pod `/courses/<id>`. Dane w `COURSES` (`lib/courses.ts`: rodzaj kurs/egzamin, temat, cena `free|paid`, certyfikat `none|free|paid`, koszt, link), teksty w `messages/*.json` pod `courses.items[id]` (`summary`, `how`, `certificateName`). Filtry (temat, cena, certyfikat, koszt certyfikatu, wyszukiwarka) i grupy Darmowe/Płatne robi `components/CourseBrowser.tsx`. Dodawaj tylko pozycje, których cenę i certyfikat potwierdza strona organizatora (data w `COURSES_CHECKED`); niepotwierdzonych nie wpisujemy, bez Udemy i kursów bez renomy. Odznaka ukończenia (Anthropic Academy) liczy się jako certyfikat bezpłatny, ale jej nazwa mówi, że to nie certyfikat zawodowy. Okładki to autorskie SVG w `public/courses/` (nie materiały organizatorów).
- **Hero**: wideo w tle (`components/HeroVideo.tsx`) z plikami `public/video/clouds[-sm].{mp4,webm}`, pętla ma wtopiony crossfade 1,5 s (przy podmianie wideo zachowaj to). Wyłączane przy `prefers-reduced-motion` i `saveData`, na wąskich ekranach wersja `-sm`. Gdy wideo gra, sekcja ma `data-video="on"`, a tekst klasę `hero-shadow` (czarny cień).
- **Intro hero** gra do pierwszego pełnego obejrzenia: `lib/intro.ts` zapisuje flagę w localStorage dopiero po dopisaniu całego tekstu, a skrypt w `<head>` ustawia `html[data-intro="seen"]` przed renderem (brak mignięcia). Reset: przycisk w stopce (`ReplayIntro`). Pełny tekst hero zawsze jest w DOM (SEO, czytniki ekranu).
- **Podgląd linków**: `app/[locale]/opengraph-image.tsx` (tło z `assets/og-bg.jpg`, fonty z `assets/`, bez pobierania z sieci). `og:title` i `og:description` są krótkie i zachęcające (`meta.ogTitle`, `meta.ogDescription`), a `<title>` i meta description zostają pod SEO. Middleware pomija ścieżki `*opengraph-image`.
- **Analityka**: Microsoft Clarity ładuje się tylko w produkcji (`CLARITY_ID` w `lib/site.ts`, skrypt w `app/[locale]/layout.tsx`). Nie nadawaj skryptowi `id="clarity"`, bo koliduje z `window.clarity`.
- Nowe statyczne katalogi na najwyższym poziomie `public/` dopisz do matchera w `middleware.ts` (pliki z kropką są już wyłączone).

## Jak pracujemy (preferencje właściciela)

- Odpowiedzi po polsku, commity i opisy PR po angielsku.
- Standardowy obieg zadania: zmiana, test w Playwright (Chrome, `channel="chrome"`) na zbudowanej wersji, commit, PR z opisem co dodano/zmieniono/usunięto, merge do `main`. Push na `main` odbywa się przez merge PR-a.
- Testuj na kilku rozmiarach: 390, 600, 1440 i ultrawide 3440. Sprawdzaj też `prefers-reduced-motion`.
- Dla dużych plików używaj narzędzia Write zamiast heredoców w Git Bash (heredoc potrafi się zepsuć na apostrofach).
- Nie dodawaj do repo katalogów `.codex/` i `.cursor/` oraz tymczasowych katalogów `.impeccable/tmp-*`.

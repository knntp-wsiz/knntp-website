# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: students of WSIiZ (Wyższa Szkoła Informatyki i Zarządzania) in Rzeszów who are considering joining the club. They arrive from social media or word of mouth, want to know what KNNTP does and whether it is worth their time, and need a clear way to get in touch or join the community.

Members and outside audiences (employers, sponsors, university staff, organizers) are not confirmed audiences yet.

## Product Purpose

Website of Koło Naukowe Nowych Technologii Programistycznych (KNNTP) at WSIiZ. It exists to recruit new members and show the club's activity. Today it is a link hub (Facebook, Discord, GitHub). It is meant to grow into a fuller club site: about, projects, events and news, how to join, achievements. Success is a prospective student understanding what the club does and joining its Discord.

## Positioning

A student programming club, not only coursework: practical projects, hackathons and competitions beyond the degree ("Nie tylko studia!"). Topics named in metadata: web dev (React), C++, C#, .NET.

## Operating Context

Run by students at one university in Rzeszów. Community lives on Discord (`/dc` redirects to the invite), Facebook (netRzeszow) and GitHub (knntp-wsiz). The audience mostly visits on phones from social links.

## Capabilities and Constraints

- Existing Next.js 15 / React 19 / Tailwind 4 app, deployed on Vercel; Biome for formatting; pnpm.
- Current pages: home (logos plus social links) and `/dc` redirect to Discord. Header nav has one item.
- Language: Polish only (`lang="pl"`). Domain: knntp.pl.
- Light and dark themes both exist and must keep working.
- Page sections beyond the home page are undecided. Do not assume which will be built.
- Metadata still mentions Java, VR, robotics and Imagine Cup in places (Twitter tags, keywords). These are unverified and partly outdated, since Java was removed from the description. Treat as open facts to confirm.

## Brand Commitments

Existing KNNTP logo (`public/logo_black.png`, `public/logo_white.png`) and WSIiZ logo (`public/wsiz/`, `public/wsiz_logo_*.png`) are fixed identity assets. The club name is "KNNTP WSIiZ".

## Evidence on Hand

The user says the following exist and can be used: participation in hackathons (HackNation, HackCarpathia, HackYeah) and photos from them. None of these photos, results or details are in the repository yet; the user must supply them. Do not invent placements, member counts, testimonials, project case studies or event dates.

## Product Principles

1. Recruit first: every page should help a prospective student understand the club and reach Discord within a click or two.
2. Show real activity: hackathons and photos are the proof. Use real material or leave it out.
3. Student-run and practical: tone is peer-to-peer and concrete, not institutional.
4. Mobile first: most visits come from social links on phones.
5. Grow incrementally: the site expands page by page from a working link hub without breaking existing links.

## Accessibility & Inclusion

No product-specific standard established. Polish-language content; keep semantic HTML, labelled links, and readable contrast in both themes.

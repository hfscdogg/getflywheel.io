# getflywheel.io

The Flywheel marketing site, rebuilt for the AI community relaunch. Astro, fully static, deployed on Vercel.

## The story

The site follows the StoryBrand framework with **the integrator as the hero** and Flywheel as the guide.
The home page runs the seven beats in order:

| Beat | Section |
|---|---|
| A character who wants something | Hero: "Your firm, fully staffed." |
| Has a problem (external, internal, philosophical) | 01 The problem: four jobs, doing it all yourself, lessons dying inside four walls |
| Meets a guide (empathy + authority) | 02 We run an integration firm too: Livewire, client zero, since 1994 |
| Who gives them a plan | 03 Three steps: own your warehouse, hire your staff, join the network |
| And calls them to action | Apply for a founding seat (direct), See how it works (transitional) |
| That helps them avoid failure | 06 What's at stake: "If nothing changes" |
| And ends in success | 06 "With a Flywheel staff", plus the closing band |

Source material: the Flywheel partner pitch deck (Aug 2026), the relaunch media advisory draft and the
flywheel-kitchen architecture docs.

## Design

Taken from the partner deck: near-black `#141414`, warm paper `#faf9f6`, one signal yellow `#f0d000`,
slate `#506080`; Oswald for display, Hanken Grotesk for reading, Space Mono for labels and numbers. Tokens are
in `src/styles/global.css`. Fonts are self-hosted (`@fontsource`), so there are no third-party requests.

## SEO and AI answer engines

The same setup as getlivewire.com:

- One JSON-LD `@graph` per page with stable `@id`s (`src/schema.ts`): Organization, WebSite, the page,
  BreadcrumbList, FAQPage wherever a page has FAQs, and a Service with Offers on `/pricing/`.
- `public/llms.txt` and a `robots.txt` that welcomes search and AI crawlers.
- Sitemap, canonical URLs, Open Graph and Twitter cards, a 1200x630 share image.
- `vercel.json` sends `X-Robots-Tag: noindex` on every host except `www.getflywheel.io`, so previews never
  get indexed.
- First-party journey tracking (`src/components/Analytics.astro`): visitor id, first and last touch, CTA and
  outbound clicks, stamped onto forms. GA4 loads once `SITE.ga4` is set.

## Editing

Copy lives in the page files under `src/pages/`. Shared facts (seat count, proof numbers, the four seats, the
tools) live in `src/site.ts` so they change in one place.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```

`scripts/og.cjs` re-renders `public/og.png` and `public/brand/mark-512.png` (needs `npx astro preview` running).

## Before launch

- Confirm the client zero numbers (47 / 3 min / 34) are current and OK to publish.
- Founding firms are not named; the advisory draft says to confirm permission first. Names go in
  `src/pages/index.astro` (seats) and `src/components/NetworkDiagram.astro`.
- Pricing is published from the deck. Confirm it should be public.
- `hello@getflywheel.io` is a placeholder inbox; `press@` is from the advisory.
- The apply form has no backend yet; it composes an email. Point it at Zoho Forms or the CRM.
- Add a GA4 measurement id in `src/site.ts`.

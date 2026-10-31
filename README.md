# getflywheel.io

The Flywheel marketing site, rebuilt for the AI community relaunch. Astro, fully static, deployed on Vercel.

## The story

The site follows the StoryBrand framework with **the integrator as the hero** and Flywheel as the guide.
The home page runs the seven beats in order:

| Beat | Section |
|---|---|
| A character who wants something | Hero: "Your firm, fully staffed." beside a Livewire technician on a job |
| Has a problem (external, internal, philosophical) | The four jobs that pile up, the owner doing all of them, lessons that stay inside one firm |
| Meets a guide (empathy and authority) | "We run an integration firm too": Livewire since 1994, plus the client-zero numbers |
| Who gives them a plan | Three steps: own your data, hire the seat that hurts most, join the network |
| And calls them to action | Apply for a founding seat (direct); How it works (transitional) |
| That helps them avoid failure | "If nothing changes" |
| And ends in success | "With a Flywheel staff", then the founding-seats band |

Source material: the Flywheel partner pitch deck (Aug 2026), the relaunch media advisory draft and the
flywheel-kitchen architecture docs.

## Design

- Logos are the concept 12 kit in `brand/source/` (October 2026). `python3 scripts/brand.py` copies them
  into `public/brand/` and writes the favicon and apple touch icon.
- Palette accents: ink `#1f2a36`, Momentum Yellow `#f2c200`, Steel Blue `#3e5a7a`, with Slate `#6b7785` and
  Mist `#e8edf2`. Oxblood `#7d4949` and bone `#e2ddcf` stay in support. Yellow and steel blue are used as
  whole sections, not small accents.
- Type: Zilla Slab for headings, in sentence case (its slab serifs echo the wordmark), and Hanken Grotesk for
  reading. Both are self-hosted, so there are no third-party font requests.
- Photos in `public/photos/` are Livewire's own, from the getlivewire.com image library. Higher-resolution
  originals, and photos from founding firms, would sharpen the hero.
- Numbering is used only where order matters (the three steps, the onboarding weeks).

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

`scripts/og.cjs` re-renders the share image, `public/og.png` (needs `npx astro preview` running).

## Before launch

- Confirm the client zero numbers (47 / 3 min / 34) are current and OK to publish.
- Founding firms are not named; the advisory draft says to confirm permission first. Names go in
  `src/components/CtaBand.astro` and `src/components/NetworkDiagram.astro`.
- Pricing is published from the deck. Confirm it should be public.
- `hello@getflywheel.io` is a placeholder inbox; `press@` is from the advisory.
- The apply form has no backend yet; it composes an email. Point it at Zoho Forms or the CRM.
- Add a GA4 measurement id in `src/site.ts`.

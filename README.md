# Trade landing page template

A reusable landing page for Australian trade and renovation businesses (concreters, builders, landscapers, deck and pergola builders), built for Meta ad traffic on phones. One repo is one client: copy it, fill in `site.config.ts`, add images, deploy to Vercel.

The page reproduces the structure, mobile layout and persuasion sequence of a measured reference page with every piece of content replaced by an instruction. The teardown of that reference is in `docs/teardown.md` and the standard a client page is measured against is in `docs/exemplar.md`.

Stack: Astro 7 (static output), scoped CSS driven by design tokens, no UI framework, no CMS. Client-side JavaScript is limited to the form, the carousel, the compare slider, the modals and the pixel events.

## Launching a new client

1. **Copy the repo.** Create a new repository from this one (or `git clone` and change the remote). One repository per client.
2. **Install.** Node 22.18 or newer, then `npm install`.
3. **Fill in `site.config.ts`.** It is the only file to edit. Every text slot holds an instruction written to the length of the real content; replace all of them. The comment above each field says the section's job, the objection it handles and the asset it needs. Targets and ranges for every slot: `docs/content-spec.md`. Run `npm run check:content` to confirm lengths, spelling and no em dashes.
4. **Add images.** Put files under `src/images/` and reference them by file name, for example `{ src: 'hero.jpg', alt: 'Finished driveway in Berwick' }`. Export sizes and the shot each slot needs are in `docs/content-spec.md`; the shot list and photography standard are in `docs/exemplar.md`. Until a file is supplied, the slot renders as a labelled grey box at the right aspect ratio. Alt text comes from config.
5. **Set colours and fonts.** `brand.colours` in the config overrides any colour role (primary, accent, surfaces). Keep the primary dark enough for white text and keep `accent-text` at 4.5:1 on white. Manrope is bundled and self-hosted; to change it, add font files under `public/fonts` and `@font-face` rules in `src/styles/fonts.css`, then set `brand.fonts.family`.
6. **Set proof, tracking and legal.** `proof` takes the real review rating, count and source (leave rating or count empty to hide every badge). `tracking.metaPixelId` turns the pixel on. `legal.terms` and `legal.privacy` hold the client's own texts. `urgency.line` stays empty unless the client writes a real limit by hand.
7. **Run locally.** `npm run dev` and open the printed URL. Test at 390 wide in the browser's device mode. `npm run guide` adds an overlay on each section with its job and persuasion principle.
8. **Check it.** `npm run build` then `npm run verify` (modularity, empty proof, form, tracking, guide mode), `npm run shoot` (screenshots into `docs/build/`) and `npm run lighthouse`.
9. **Deploy to Vercel.** Import the repository in Vercel. It detects Astro; no settings are needed (output is static, clean URLs, `/thank-you/` is a real route). Every push to the main branch redeploys.
10. **Connect the domain.** In Vercel, Project, Settings, Domains, add the client's subdomain (for example `offer.clientdomain.com.au`) and create the CNAME record Vercel shows at the client's DNS host. Keep `seo.noindex` true for an ad landing page.
11. **Wire the form destination.** Set `form.destination.url` in the config, then open `src/lib/submit-lead.ts` and replace the single TODO block with the client's CRM, webhook or email relay. Until then, submits are logged to the browser console and the visitor is still redirected to the thank-you page. The payload holds the field values (phone normalised to a local number), the page URL, first-touch UTM parameters and a timestamp.

## What is in the box

- `site.config.ts`: all client content, typed by `src/config/types.ts`.
- `src/sections/`: one component per section type, registered in `registry.ts`. The page renders `config.sections` in order; `enabled: false` removes a section; reordering the array reorders the page. Backgrounds are planned from the rendered order (`src/lib/sections.ts`), so removing or reordering sections keeps the page looking deliberate.
- `src/components/`: shared pieces. `Cta` (button plus review badge), `ReviewBadge`, `ImageSlot` (optimised image or labelled placeholder), `LeadForm`, `Carousel`, `CompareSlider`, `Marquee`, `Modal`, `Header`, `Footer`, `MetaPixel`, `GuideNote`.
- `src/tokens/`: design tokens measured from the reference (`tokens.css` for styling, `tokens.ts` for image export sizes).
- `src/lib/submit-lead.ts`: the one place a lead leaves the page.
- `src/pages/thank-you.astro`: the thank-you route. The Meta `Lead` event fires there once, only after a real submit.
- `scripts/`: `check-content.mjs`, `build-content-spec.mjs`, `shoot.mjs`, `verify.mjs`, `lighthouse.mjs`.
- `docs/`: `teardown.md`, `exemplar.md`, `content-spec.md`, `decisions.md`, `verification.md`, the reference captures in `docs/reference/` and the build captures in `docs/build/`.

## Sections

In the default order: hero, trust strip, before and after marquee, problem letter, recent projects (videos by suburb), photo grid, comparison, photo grid, testimonials, benefits, future pacing with compare slider, bento gallery, three steps, guarantee, photo grid, offer and form. Then the footer with terms and privacy modals. The supported number of items for every list section is in `docs/content-spec.md`.

## Tracking

With a pixel ID set: `PageView` on every page, `Contact` on every click of a phone link, `Lead` once on the thank-you page after a successful submit (guarded against refresh and direct visits). Without an ID, no pixel code is output.

## Adding a section type

Write the component in `src/sections/`, add its content type and the union member in `src/config/types.ts`, register it in `src/sections/registry.ts`, describe its surface in `src/lib/sections.ts`, add its guide note in `src/guide/notes.ts`, and add its slots to `src/config/spec.ts`.

## Licence notes

Manrope is bundled under the SIL Open Font License (`public/fonts/OFL.txt`). The reference page's images, logo and wording are not included anywhere in this repository; the screenshots under `docs/reference/` are an internal study record only.

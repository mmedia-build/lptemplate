# Decisions

Every judgement call made while building the template, one line of reasoning each. Newest at the bottom.

## Access and tooling

- The build container's network policy denied the reference host (403 on CONNECT), so the page was rendered and measured through Firecrawl's interactive Chromium session instead of local Playwright; screenshots were exported from that session and local Playwright is used only for the built template. Reason: it was the only route with real rendering and DOM access.
- Reference screenshots are saved at device pixel ratio 1 for full pages (to stay under Chromium's capture height limit) and at 2x for first-screen, scroll and interaction captures. Reason: full pages are 16,000 px tall; 2x would exceed the capture limit.
- Per-section reference crops are cut from the full-page captures using measured section boxes rather than captured per element. Reason: identical pixels, one browser round trip instead of thirty.
- Video lengths are recorded as unknown. Reason: the Wistia player never attached a loaded video element in the headless session, so duration could not be read; poster frames were sampled instead.
- WebKit checks could not be run. Reason: the Playwright WebKit download hosts are blocked by the same network policy; this is reported in the final report rather than worked around.

## Stack

- Astro 7 (static output) with scoped component CSS driven by CSS custom property tokens; no Tailwind, no UI framework. Reason: zero-config on Vercel, zero JS by default, each section is a component, and tokens make brand overrides a config matter. Tailwind would add a build dependency and class soup for no gain on a one-page site.
- Images use Astro's built-in `Image` and `Picture` components with the sharp service. Reason: responsive srcset, format conversion and width/height attributes for free, no custom pipeline.
- Playwright 1.56.1 is pinned as a dev dependency. Reason: it matches the Chromium build pre-installed in this environment; newer versions want a browser download the network policy blocks.

## Fonts

- Manrope is kept and self-hosted (SIL Open Font License) as two variable woff2 subsets (latin, latin-ext) from the Google Fonts build, with a size-adjusted Arial fallback face computed from the font's metrics. Reason: the reference font is open licensed, the variable file replaces seven static files, and the metric-matched fallback removes layout shift during the swap.

## Layout and behaviour

- The trust strip is its own section type (as the inventory asked) rendered flush beneath the hero on a white surface, rather than inside the hero over the photo. Reason: modularity; the hero photo on the reference is almost white at that point so the difference is slight.
- Photo grid strips inherit the background tone of the section above them. Reason: on the reference the third grid sits inside the textured guarantee section; inheriting reproduces that without coupling sections.
- Background tones are assigned from rendered order: comparison, benefits and guarantee prefer the textured tone, a textured section never follows another textured section, and every third light section in a run becomes off-white. Reason: this reproduces the reference order exactly and still reads as deliberate when sections are removed or reordered.
- Sections use padding only, never margins between sections. Reason: gaps cannot double up or collapse when sections are removed or reordered.
- The plaster texture is generated as a tiny inline SVG noise over a warm grey, with an optional client image override. Reason: the reference texture is a photo that cannot be copied.
- No sticky header or sticky CTA, matching the reference, with an optional sticky phone button in config (off by default). Reason: the reference relies on CTA repetition; the option exists because the reference's phone target is under 44 px.
- The CTA gets a slight darken on hover and active. Reason: the reference has no hover change at all, which reads as broken on desktop; the change is small and does not affect mobile.
- Mobile CTA height is 44 px (reference 40) and the phone link is a 44 px target (reference 32). Reason: the brief's tap target minimum beats the reference where they conflict.
- The comparison table keeps two side-by-side columns on mobile as the reference does, but at 360 px wide the columns stack. Reason: 155 px columns were already tight at 390; at 360 they break words.
- The compare slider gains keyboard control (arrow keys on the focusable handle) and the marquee and reveals respect `prefers-reduced-motion`. Reason: brief requirements the reference lacks.
- The projects carousel is a native scroll-snap row instead of Swiper, with dots and arrow buttons. Reason: zero dependencies, touch and keyboard work natively, and vertical scroll is never trapped.
- The video tiles are a thin host-agnostic embed: an optional poster image slot plus a `videoUrl`; a poster alone renders as an image with a play glyph, a YouTube, Vimeo or Wistia URL renders an iframe on tap. Reason: no third-party scripts load until a visitor chooses to play, which protects the mobile performance budget.
- The email field is `type="email"` and the postcode field accepts four digits only; the reference's phone country picker is dropped in favour of Australian-only phone validation. Reason: the brief asks for Australian formats and the reference's geolocated flag picker showed the wrong country.
- The agency credit link in the reference footer is not reproduced. Reason: the brief allows no outbound links other than the phone number.
- The privacy policy modal exists and is wired to a footer button, unlike the reference where it is empty and has no trigger. Reason: the brief lists both legal texts in config.
- The thank-you page adds a three-step "what happens next" list and a click-to-call number that the reference lacks. Reason: the brief asks for them.
- Urgency line is empty by default and nothing generates dates or counts. Reason: brief requirement; the reference hard-codes a month that goes stale.
- Placeholder text is written to within 10% of each reference slot's character count and the check is scripted (`npm run check:content`). Reason: layout correctness before real copy is the point of placeholders, and a script keeps it honest.

## Found during the build and verification

- Astro's `scopedStyleStrategy` is set to `where`. Reason: with the default attribute strategy a class passed to a child component (Section, Container, Cta) does not carry the parent's scope, which silently dropped the hero and trust-strip layout; `where` carries the scope with the class and keeps selector specificity flat.
- Mobile header padding is 22 px instead of the reference's 28 px. Reason: with a 44 px phone target the header stays 88 px tall, the same as the reference's 89.
- The eyebrow text uses a darker sage (`--colour-accent-text`, 5.7:1 on white) and surfaces that carry white text (comparison column, step numbers, check circles) use `--colour-accent-strong` (5.0:1); icons and quote marks keep the reference sage. Reason: the reference's sage fails WCAG AA for text at 2.8 to 3.2:1, and the brief requires AA.
- Error red is `#d32f2f` and input placeholder grey is `#737373`. Reason: the nearer reference values fail 4.5:1.
- The thank-you headline reads "Thank You" rather than an instruction. Reason: two words with nothing to instruct; every other slot is an instruction.
- The trust strip has no top padding and the hero keeps 34 px (mobile) or 80 px (desktop) of bottom padding. Reason: reproduces the reference's 41 px gap from badge to icons with the strip as a separate section.
- The future-pacing section keeps 100 px of extra vertical air on desktop. Reason: the reference leaves that space around the slider, and it reads as deliberate.
- Flipped testimonial rows keep the card wide and the photo narrow on desktop, matching the reference, rather than mirroring the column widths.
- The comparison table stacks only below 375 px. Reason: 155 px columns at 390 match the reference; at 360 they break words.
- The screenshot harness forces reveal animations visible and disables smooth scrolling before capturing. Reason: captures are about layout, and smooth scrolling was being caught mid-move.
- Fixture configs for the modularity, empty-proof and tracking tests live in `tests/fixtures/` and build to `dist-*` folders through `SITE_CONFIG` and `OUT_DIR`. Reason: the default config and `dist/` are never touched by tests.
- `docs/content-spec.md` is generated from `src/config/spec.ts`. Reason: one source of truth for the checker, the shot list and the copy brief.

## Launch pathway

- Leads are sent as a flat JSON body with an added `phone_e164` key. Reason: GoHighLevel's Inbound Webhook trigger, Zapier and Make all map flat keys without configuration, and GHL matches contacts on E.164 numbers.
- The per-client process is a GitHub template repository, a Claude Code session guided by `CLAUDE.md`, a Vercel preview for sign-off and a GHL snapshot workflow. Reason: each step is a copy or a click, so two clients get the same result from the same inputs.

## Reference B (renovation page) and the section catalogue

- The second reference is recorded in its own teardown (`docs/teardown-b.md`) and its captures in `docs/reference-b/`, with the exemplar gaining a fourth part rather than a second file. Reason: the standard for a client page is one document; the measurements are per reference.
- Reference B's four text-beside-photos sections (dream outcome, problem, owner story, liveable home) are one `split` type with `images`, `imageSide` and a per-section `tone`, not four types. Reason: they are the same layout; the copy differs, and the content checker measures each by its id.
- Sections gained an optional `tone` override and the planner counts a pinned tone in its alternation. Reason: reference B keeps its comparison and benefits on light surfaces where the planner would have darkened them, and a client with a dark brand photo needs to choose where it goes.
- Dark sections have two looks chosen once per brand (`brand.darkTone`): the plaster texture of A or the near-black "night" of B with the brand photo blurred behind white text. Reason: one tone name keeps the planner unchanged; cards inside a night section keep dark text through a scoped override so no component needs to know which look is on.
- The line under every CTA is now configurable (`cta.under`): the review badge when there is proof, otherwise the reinforcement line B uses. Reason: B has no rating anywhere; a page with no proof needs something under the button, and the bonus value is the honest option.
- Reference B's hero photo sits as a band under the text on phones (`imageLayout: 'band'`) and still covers on desktop. Reason: it keeps a 375 character paragraph on the first screen without washing the photo to nothing, and the band layout uses a smaller eyebrow and tighter gaps measured from B to fit 664 px exactly.
- Comparison, testimonials, benefits and steps gained a second layout each (`cards`, `carousel`, `list`, `rows`) instead of new section types. Reason: the job and the slots are the same; only the shape differs, and a client can switch shape without re-keying content.
- The testimonial name, suburb and rating became optional. Reason: B names nobody; the carousel hides what is empty, while the exemplar checklist still asks for a first name and suburb.
- The form gained a `select` field type with options. Reason: B qualifies the job with two dropdowns (room and budget band), which costs the visitor no typing; the first option is the placeholder and is unselectable when required.
- Reference B's gold (`#b09359`) is kept for icons and decoration only; buttons and eyebrow text in the preset use darker golds (`#85703f`, `#7a6636`) that reach 4.5:1. Reason: the reference's white-on-gold CTA is 2.9:1 and fails AA, as A's sage did.
- Plus Jakarta Sans is bundled beside Manrope as a variable woff2 with a metric-matched Arial fallback computed from its TTF (size-adjust 136.2%). Reason: it is OFL licensed and the preset should render in B's face without a network request.
- The logo strip, gallery wall and photo set take individual images rather than B's composite sprites. Reason: a composite cannot be swapped per client, has no alt text per mark and ships at 6,912 px wide.
- The content checker skips slots whose section is not in the config and measures a section with an id against id-specific lengths when the spec has them (`sections[comparison:b-comparison]`). Reason: one spec file serves both presets and a mixed page without false failures.
- Preset section ids start with `b-` (and the four splits are `dream`, `problem`, `owner`, `liveable`). Reason: the ids are what tie a section to reference B's measured lengths; a client page keeps them and adds nothing.
- The FAQ animates with a grid-row transition on real buttons with `aria-expanded`, one open at a time, the first open on load. Reason: matches B's behaviour and needs no height measuring script.
- The gallery expands once and the button leaves, as on B. Reason: collapsing a wall of photos the visitor asked to see has no purpose.
- `npm run verify` builds the renovation preset and runs fourteen checks on it (order, tones, fonts, first screen fit, six sliders, gallery, FAQ, selects, submit). Reason: the preset is a second product surface and must not rot when the shared components change.

## Reference C (agency booking page) for Minus Media

- "Recreate this page for Minus Media" was read as reference C of this template with a preset Minus Media can fill for its own booking page, not a copy of the reference. Reason: the skill's boundaries forbid copying the reference's wording, files or brand; no Minus Media figures, testimonials, guarantee terms or client names were supplied, so the preset names the business and every claim stays an instruction.
- Access: the host is blocked by the container's network policy (403 on CONNECT), so the page was measured through Firecrawl's interactive Chromium with iPhone, Instagram in-app and desktop profiles set over the DevTools protocol, and captured through Firecrawl's screenshot endpoint, whose files the container can download. Reason: the only route with real rendering and DOM access; the same route as references A and B.
- Interaction states of the reference were described from the DOM rather than captured. Reason: the interactive browser returns screenshots only inline, and the session could not write them to disk; a test of outbound file-sharing hosts was refused by the permission policy and not pursued.
- No submit was made on the reference's live form, not even with bad values. Reason: the remote browser action was refused as a live-site transaction; the reference's validation copy is recorded as unknown.
- The video hero is an `imageLayout: 'video'` option on the existing hero, with `headlineAccent`, `video` and `showUrgency`, not a new section type. Reason: its job (qualify, promise, CTA on the first screen) and its eyebrow, headline and body slots are the hero's; only the shape and the media differ.
- The video hero is tightened to fit 664 at 390 wide: a 12 px one-line eyebrow pill (C: 14 px, two lines), a 34 px headline (C: 38), smaller gaps, a 52 px header (C: 60). Reason: reference C fails the template's own first-screen rule (its CTA starts at 641 and is cut off at 664); the brief's quality bar wins over the reference where they conflict.
- The hero's scarcity block is `urgency.line`, shown under the hero CTA with a dot only when `showUrgency` is on and the line is hand-written; it is empty in the preset. Reason: reference C hard-codes "2 of 3 spots available" and a closing date; the template never generates counts or dates.
- The hero video never autoplays and loads nothing until tapped; the play control is a labelled panel (bold label, caption) styled after C's unmute button. Reason: C autoplays a 1920x1080 MP4 with `preload="auto"`, which costs a phone in an in-app browser several megabytes before the visitor chooses to watch; the poster carries the first impression instead.
- The video testimonials are a `layout: 'videos'` option on the existing testimonials section (the result line in `headline`, the business in `suburb`, a new optional `videoUrl`), not a new type. Reason: same job and same slots (who, how many stars, what they got, a picture); a client can switch between photo and video proof without re-keying.
- The coverflow is the shared scroll-snap carousel with a new `mode: 'centre'`: the current slide centred, neighbours scaled to 0.92, arrows only, spacer pseudo-elements so percentage widths resolve against the full track. Reason: zero dependencies, touch and keyboard native, vertical scroll never trapped; C's version is a transform-driven custom slider.
- Neighbouring cards are dimmed to 90%, not blurred to 48% as on C. Reason: at 55% their CTA text measured 4.1:1 and failed Lighthouse's contrast audit; blurred text in the reading order is unreadable to anyone who reaches it.
- A CTA on every video card, in a compact `size: 'small'` CTA (48 px tall so it is still 44 on a scaled neighbour). Reason: C's pattern; the tap-target floor applies to the scaled cards too.
- The booking form is `layout: 'booking'` on the existing offer form section (headline, a bold `lead`, an `intro`, the form in a white card), not a new type. Reason: same job (the conversion point carrying the CTA anchor); the bundle, bullets and reinforcement are simply not shown.
- A `checkbox` field type with `**bold**` phrases in its label and an optional `hint`, and `form.labels: 'visible'`. Reason: C qualifies with a confirmation and shows labels above fields; a confirmation is faster than a select and filters without a question.
- The submit is never disabled; an unticked box gets its own inline message (`form.messages.checkbox`). Reason: C greys the button out at 50% opacity (white on lime at about 1.1:1) with no explanation; a disabled button tells a screen reader nothing about why.
- The checkbox is 24 px and the whole panel is its label (over 44 px tall); the hint is 12 px (C: 10); labels are 14 px (C: 12). Reason: tap target and legibility floors.
- The phone country picker and the envelope icon on the email field are not reproduced. Reason: the market is Australia and the phone field validates Australian numbers; icons inside visible-label inputs add nothing.
- Cloudflare Turnstile is not reproduced. Reason: no third-party scripts beyond the pixel; the honeypot is the template's spam guard, and `src/lib/submit-lead.ts` is where a client adds Turnstile if spam appears.
- After the form, the reference hands the visitor to a booking calendar; the template keeps its thank-you route (so the Lead event has a page to fire on) and adds `thankYou.bookingUrl`, which puts a button to the calendar at the top of that page. The phone block on the thank-you page shows only when a number is set. Reason: C has no phone anywhere, and the calendar is the conversion C is really after.
- The header gains `header.action: 'cta'` (a compact CTA link on desktop, nothing on phones) and turns dark with the white logo and a hairline rule when the first section is the video hero. Reason: C's header; one option instead of a fork, and the colour follows the hero automatically.
- Every CTA can carry C's up-right arrow (`cta.icon: 'arrow'`), and buttons take their case, border, corner radius and shadow from tokens (`button-transform`, `button-border`, `radius-button`, `button-shadow`) set in `brand.tokens`. Reason: C's sentence-case, bordered, rounded buttons are a brand look; earlier presets keep uppercase, square and shadowed by default.
- League Spartan (SIL OFL) is bundled as a variable woff2 per subset from Fontsource 5.3.0, with an Arial fallback scaled from its metrics (size-adjust 111.9%, ascent 62.6%, descent 19.7%). Reason: C's family, open licensed; self-hosted like Manrope and Plus Jakarta Sans.
- Section headlines use `brand.fonts.displayFamily: 'Times New Roman'`, resolved to a system serif stack with no font file. Reason: C's section headings fall through to the system serif (no serif web font is requested), so the look costs nothing to load; the hero, labels and buttons stay League Spartan.
- Type sizes that differ between phone and desktop in the preset are written as `clamp()` values in `brand.tokens` (for example `fs-h2: clamp(28px, 0.762vw + 25px, 36px)`), measured at 390 and 1440. Reason: brand tokens are inline on the root and would otherwise override the desktop media query.
- C's star gold (`#e6a500`, 1.9:1 on the card) becomes `#a56f00` (3.8:1 on the card, 4.2:1 on cream). Reason: the stars carry meaning, so the 3:1 non-text contrast floor applies.
- C's two H1s (hero and form) become one H1 and an H2. Reason: one H1 per page.
- The Santa hat drawn on one letter of the headline and the hand-drawn underline under the guarantee line are not reproduced. Reason: seasonal decoration tied to one campaign and the reference's own artwork; a client can supply their own as part of the poster or copy.
- Preset section ids are `c-hero`, `c-booking`, `c-testimonials` and the checkbox field is named `qualified`; the CTA target is `#c-booking`. Reason: the ids tie the slots to reference C's lengths in the content checker.
- The content checker now skips `form.fields[name]` slots when the form has no field of that name, skips the header phone invitation when the header shows no phone, treats `footer.disclaimer` as optional and ignores `**` markers when measuring. Reason: one spec file serves three presets and mixed pages without false failures.
- The verification scripts launch Playwright's own Chromium when it is installed and otherwise the container's pre-installed Chromium (`/opt/pw-browsers/chromium` or `CHROME_PATH`), through `scripts/browser.mjs`. Reason: this container ships a newer Chromium than the pinned Playwright 1.56.1 expects, and the checks should not depend on a browser download the network policy blocks.
- `npm run verify` builds the agency preset and a fixture with video links, a calendar link and a hand-written urgency line, and runs 24 checks on them. Reason: the preset is a third product surface and must not rot when shared components change.
- `astro.config.mjs` falls back to `site.config.ts`, with a warning, when `SITE_CONFIG` names a file that does not exist on the branch being built. Reason: a Vercel project set to `SITE_CONFIG=examples/site.config.agency.ts` failed on a branch that predates the preset; one project-wide variable should not break older branches.

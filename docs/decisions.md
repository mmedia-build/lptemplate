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

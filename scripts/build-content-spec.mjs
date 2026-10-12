#!/usr/bin/env node
/**
 * Writes docs/content-spec.md from src/config/spec.ts and src/tokens/tokens.ts
 * so the shot list and copy brief never drift from what the checker enforces.
 *
 *   node --experimental-strip-types scripts/build-content-spec.mjs
 */
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { promises as fs } from 'node:fs';

const { textSlots, imageSlots } = await import(pathToFileURL(path.resolve('src/config/spec.ts')).href);
const { imageSpecs } = await import(pathToFileURL(path.resolve('src/tokens/tokens.ts')).href);

const sectionOf = (p) => {
  const m = p.match(/sections\[(\w+)(?::[\w-]+)?\]/);
  if (m) return m[1];
  if (p.startsWith('thankYou')) return 'thankYou';
  if (p.startsWith('form') || p.startsWith('urgency')) return 'offerForm';
  if (p.startsWith('business') || p.startsWith('proof') || p.startsWith('cta')) return 'global';
  return 'global';
};

const names = {
  global: 'Global (header, CTA, proof)',
  hero: '1. Hero',
  trustStrip: '2. Trust strip',
  beforeAfter: '3. Before and after marquee',
  letter: '4. Problem letter',
  projects: '5. Recent projects',
  photoGrid: '6, 8 and 15. Photo grid strips',
  comparison: '7. Comparison',
  testimonials: '9. Testimonials',
  benefits: '10. Benefits',
  futurePacing: '11. Future pacing',
  bentoGallery: '12. Bento gallery',
  steps: '13. Three steps',
  guarantee: '14. Guarantee',
  offerForm: '16. Offer and form',
  footer: '17. Footer',
  thankYou: 'Thank-you page',
  brand: 'Brand',
  seo: 'SEO',
  logoStrip: 'B. Logo strip (reference B)',
  gallery: 'B. Gallery wall (reference B)',
  split: 'B. Split sections: dream, problem, owner, liveable (reference B)',
  statement: 'B. Method statement (reference B)',
  beforeAfterGrid: 'B. Before and after grid (reference B)',
  logoGrid: 'B. Materials and supplier logos (reference B)',
  faq: 'B. FAQ (reference B)',
};
const order = Object.keys(names);

const ranges = {
  trustStrip: '3 to 8 items (6 on the reference). Below 5 the phone marquee repeats the set to stay seamless.',
  beforeAfter: '3 to 12 pairs (7 on the reference). Fewer pairs get more copies in the loop.',
  letter: '1 to 4 paragraphs and 1 or 2 images (2 and 2 on the reference).',
  projects: '2 to 8 items (6 on the reference). Two per view on phones, four on desktop.',
  photoGrid: '2 to 8 images per strip (4 on the reference). 4 or 8 look best; desktop shows up to 4 per row.',
  comparison: '2 to 6 rows per column, independently (4 and 4 on the reference).',
  testimonials: '1 to 6 items (3 on the reference).',
  benefits: '3 to 6 cards (5 on the reference). With 5 the photo sits in the centre of the desktop grid, otherwise before the last card.',
  futurePacing: '1 to 4 paragraphs (3 on the reference).',
  bentoGallery: '3 to 9 images (7 on the reference). Mark wide tiles with wide: true; use hideOnMobile to keep the two-column phone grid even.',
  steps: '2 to 6 steps (3 on the reference).',
  offerForm: '2 to 6 bullets (4 on the reference); 1 to 8 form fields (5 on reference A, 6 on B including two selects).',
  thankYou: '2 to 5 next steps (3 in the template).',
  logoStrip: '4 to 24 logos (18 on reference B). Fewer logos get more copies in the loop.',
  gallery: '6 to 15 square photos (9 or 12 fill the rows). Collapsed to 338 px on phones and 828 px on desktop until tapped.',
  split: '1 to 4 paragraphs and 1 or 2 photos per section. Reference B uses four split sections with ids dream, problem, owner and liveable; the lengths below are per id.',
  statement: '1 to 4 paragraphs (2 on reference B). The foot photo is optional.',
  beforeAfterGrid: '2 to 9 items (6 on reference B), three per row on desktop.',
  logoGrid: '4 to 24 logos (18 on reference B), six per row on desktop. The foot photo is optional.',
  faq: '3 to 10 questions (6 on reference B). The first starts open.',
};

const grouped = {};
for (const slot of textSlots) (grouped[sectionOf(slot.path)] ??= { text: [], images: [] }).text.push(slot);
for (const slot of imageSlots) {
  const sec = slot.path.startsWith('brand') ? 'brand' : slot.path.startsWith('seo') ? 'seo' : sectionOf(slot.path);
  (grouped[sec] ??= { text: [], images: [] }).images.push(slot);
}

let md = `# Content spec

Every slot on the page in order, with its purpose, target length and, for images, the export size and the shot needed. Generated from \`src/config/spec.ts\` and \`src/tokens/tokens.ts\` by \`npm run content-spec\`; edit those files, not this one.

How to read the lengths: the target is the reference page's own content length. \`npm run check:content\` fails any slot outside the tolerance (10% unless stated). Staying inside the range keeps the mobile layout as measured in \`docs/teardown.md\`; going outside is allowed, but re-check the page at 390 wide.

Each slot links to the matching pattern and standard in \`docs/exemplar.md\`. Client copy is written from the client's own customer research and offer, never by rewording the exemplar excerpts.

Image files go under \`src/images/\` and are referenced by file name in \`site.config.ts\`. Export at the listed size (2x the largest rendered size); the build makes the responsive versions.

`;

for (const key of order) {
  const g = grouped[key];
  if (!g) continue;
  md += `## ${names[key]}\n\n`;
  if (ranges[key]) md += `Supported range: ${ranges[key]}\n\n`;
  if (g.text.length) {
    md += `| Slot | Purpose | Target | Accepted range | Exemplar |\n| --- | --- | --- | --- | --- |\n`;
    for (const t of g.text) {
      const tol = t.tolerance ?? 0.1;
      const min = Math.floor(t.chars * (1 - tol));
      const max = Math.ceil(t.chars * (1 + tol));
      const target = `${t.chars} chars, ${t.words} words`;
      const range = t.path === 'urgency.line' ? 'empty, or up to 94 chars' : `${min} to ${max} chars`;
      md += `| \`${t.path}\` | ${t.purpose} | ${target} | ${range} | [pattern](exemplar.md#${t.exemplar}) |\n`;
    }
    md += '\n';
  }
  if (g.images.length) {
    md += `| Image slot | Export size | Ratio | Shot | Crop on the page | Exemplar |\n| --- | --- | --- | --- | --- | --- |\n`;
    for (const im of g.images) {
      const spec = imageSpecs[im.specKey];
      const ratio = spec.ratio >= 1 ? `${(spec.ratio).toFixed(2)}:1` : `1:${(1 / spec.ratio).toFixed(2)}`;
      md += `| \`${im.path}\` | ${spec.width}x${spec.height} px | ${ratio} | ${im.shot} | ${spec.crop} | [standard](exemplar.md#${im.exemplar}) |\n`;
    }
    md += '\n';
  }
}

md += `## Video slots

| Slot | Format | Standard |
| --- | --- | --- |
| \`sections[projects].content.items[n].videoUrl\` | YouTube, Vimeo or Wistia URL, or a direct MP4. Empty shows the poster only. | Portrait 9:16, 10 to 30 seconds, one per suburb, crew or surface visible. See [Part 2 of the exemplar](exemplar.md#part-2-video). |

## Shot list summary

Minimum set to fill the page to the standard: 1 hero wide shot, 14 matched before and after photos (7 pairs, portrait), 2 matched letter photos (landscape), 12 square job photos for three strips (at least 3 with crew working), 3 testimonial job photos, 1 crew-at-work landscape, 2 matched square compare photos, 7 finished exteriors for the bento (2 wide, 5 square), 3 process photos (landscape), 1 offer mock-up, logo in colour and white, 4 customer head shots, 6 portrait clips with posters. Details in [the exemplar's page-level imagery summary](exemplar.md#page-level-imagery-summary).
`;

await fs.writeFile('docs/content-spec.md', md);
console.log(`docs/content-spec.md written: ${textSlots.length} text slots, ${imageSlots.length} image slot rows.`);

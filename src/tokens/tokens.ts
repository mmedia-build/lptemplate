/**
 * Design tokens that components need at build time (image export sizes,
 * aspect ratios, breakpoints). The CSS custom properties that drive styling
 * live in ./tokens.css. Keep the two files in step.
 *
 * Every image slot on the page is listed here with the pixel size a client
 * should export at. Sizes are 2x the largest rendered CSS size measured on
 * the reference at 1440px, rounded to friendly numbers.
 */

export const breakpoints = {
  /** Desktop layout switches on at this width. Below it the mobile layout is used. */
  desktop: 1024,
} as const;

export interface ImageSlotSpec {
  /** Export width in pixels. */
  width: number;
  /** Export height in pixels. */
  height: number;
  /** Aspect ratio as width / height, used for the grey placeholder box. */
  ratio: number;
  /** Short note on how the image is cropped on the page. */
  crop: string;
}

const spec = (width: number, height: number, crop: string): ImageSlotSpec => ({
  width,
  height,
  ratio: width / height,
  crop,
});

/** Measured from the reference: natural sizes and rendered boxes at both widths. */
export const imageSpecs = {
  logo: spec(440, 146, 'Rendered 100x33 (mobile) and 150x50 (desktop). Transparent PNG or SVG.'),
  logoWhite: spec(262, 116, 'Rendered 104x46 (mobile) and 131x58 (desktop) on the sage comparison column.'),
  heroBackground: spec(2400, 1400, 'Covers the hero at every width. Centre of the frame is what survives the mobile crop (390x811).'),
  beforeAfterTile: spec(700, 930, 'Portrait 3:4. Rendered 234x311. Each pair sits side by side with a 2px gap.'),
  letterImage: spec(1100, 782, 'Landscape 7:5. Rendered 350x250 (mobile) and 550x391 (desktop).'),
  gridTile: spec(700, 700, 'Square. Rendered 191x191 (mobile) and 349x349 (desktop), object-fit cover.'),
  testimonialImage: spec(790, 844, 'Near square portrait. Rendered 350x263 (mobile, cropped) and 395x422 (desktop).'),
  benefitsImage: spec(740, 600, 'Landscape 5:4. Rendered 350x257 (mobile) and 369x300 (desktop).'),
  compareImage: spec(1160, 1160, 'Square. Both halves of the slider must be the same size and framing.'),
  bentoWide: spec(1506, 732, 'Landscape 2:1. Rendered 350x170 (mobile) and 753x366 (desktop).'),
  bentoSquare: spec(734, 732, 'Square. Rendered 171x170 (mobile) and 367x366 (desktop).'),
  stepImage: spec(936, 536, 'Landscape 7:4. Rendered 290x158 (mobile) and 468x268 (desktop).'),
  offerBundle: spec(1528, 764, 'Landscape 2:1, transparent or white background. Rendered 350x175 (mobile) and 764x382 (desktop).'),
  videoPoster: spec(640, 1138, 'Portrait 9:16 poster frame for each project video.'),
  avatars: spec(164, 48, 'Row of four round customer faces, overlapping. Rendered 68x20 (mobile) and 82x24 (desktop).'),
  /* Slots introduced by reference B */
  supplierLogo: spec(400, 120, 'Supplier or brand mark, transparent PNG or SVG, contained in a 120x36 (strip) or 160x50 (grid tile) box.'),
  splitImageSingle: spec(1100, 1000, 'Landscape 11:10. Rendered 358x325 (mobile) and 545x496 (desktop). One photo beside the text.'),
  splitImagePair: spec(1100, 740, 'Landscape 3:2. Rendered 358x241 (mobile) and 545x367 (desktop). Two stacked photos beside the text.'),
  compareTile: spec(1100, 880, 'Landscape 5:4. Rendered 358x286 (mobile) and 369x295 (desktop). Before and after from the same doorway.'),
  footImage: spec(2732, 1100, 'Wide, low contrast. Rendered full width, 300 tall (mobile) and 520 (desktop), cover, fading in from the section colour.'),
  testimonialPortrait: spec(680, 960, 'Portrait 17:24. Rendered 358x386 (mobile, cropped) and 255x332 (desktop) in the carousel layout.'),
  stepRowImage: spec(1140, 656, 'Landscape 7:4. Rendered 358x206 (mobile) and 569x328 (desktop), cover, in the rows layout.'),
  decorative: spec(948, 700, 'Line drawing or diagram on transparent, for example a floor plan. Rendered 308x225 (mobile) and 474x347 (desktop).'),
} as const;

export type ImageSlotKey = keyof typeof imageSpecs;

/** Widths Astro generates for responsive srcset output. */
export const responsiveWidths = [390, 640, 780, 1024, 1280, 1536, 2048] as const;

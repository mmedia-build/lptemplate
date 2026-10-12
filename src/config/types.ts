/**
 * Types for site.config.ts. Everything client-specific is described here.
 * Components read only from this shape; nothing client-specific is hard-coded.
 */

export interface ImageRef {
  /** File name under src/images, for example "hero.jpg" or "jobs/driveway-1.jpg". Leave empty for the grey placeholder box. */
  src: string;
  /** Alt text read by screen readers and used when the image fails. Empty string for decorative images. */
  alt: string;
}

export type IconName =
  | 'pin' | 'cog' | 'trowel' | 'target' | 'hardhat' | 'house' | 'handshake'
  | 'document' | 'wheelbarrow' | 'sparkle' | 'clipboard' | 'layers' | 'shield'
  | 'calendar' | 'ruler' | 'truck' | 'person' | 'mail' | 'phone' | 'dollar' | 'none';

export interface Business {
  name: string;
  /** Full colour logo on transparent background. */
  logo: ImageRef;
  /** White version of the logo for the sage comparison column. Falls back to the business name in white text. */
  logoWhite: ImageRef;
  /** Number as dialled, used in the tel: link. Australian numbers work with or without +61. */
  phone: string;
  /** Number as displayed in the header and on the thank-you page. */
  phoneDisplay: string;
  /** Short line above the number in the desktop header. */
  phoneEyebrow: string;
  /** City or region the ads target. Used in the page title fallback only. */
  serviceArea: string;
  /** Optional. Shown in the footer when present. */
  abn?: string;
}

export interface Brand {
  /** Any colour role from src/tokens/tokens.css can be overridden here, keyed without the --colour- prefix. */
  colours: Partial<Record<
    'heading' | 'body' | 'primary' | 'primary-hover' | 'on-primary' | 'accent' | 'accent-text' | 'accent-strong' |
    'surface' | 'surface-muted' | 'surface-dark' | 'border' | 'star' | 'danger' | 'focus',
    string
  >>;
  fonts: {
    /** Family name of the self-hosted font in public/fonts. Leave as Manrope unless you add font files and @font-face rules in src/styles/fonts.css. */
    family: string;
    /** Optional heading family. Defaults to the body family. */
    headingFamily?: string;
  };
  /** Optional texture image for the "dark" sections, under src/images. Empty uses the generated plaster texture. */
  texture: ImageRef;
  /** 0 to 1. White wash laid over the hero photo so dark text stays readable. 0 means none. */
  heroWash: number;
  /**
   * How "dark" sections look. 'texture' is the light plaster of reference A (dark text);
   * 'night' is the black section of reference B (white text over the blurred texture image).
   */
  darkTone: 'texture' | 'night';
  /**
   * Any layout token from src/tokens/tokens.css, keyed without the leading dashes, for example
   * { 'section-pad': '50px', 'radius-input': '0px' }. For the handful of values that differ between
   * the two reference pages; most clients leave this empty.
   */
  tokens: Record<string, string>;
}

export interface Proof {
  /** Leave rating or count empty to hide every review badge on the page. */
  rating: string;
  count: string;
  source: string;
  /** Row of customer faces for the stacked badge. Optional. */
  avatars: ImageRef;
}

export interface Tracking {
  /** Meta pixel ID. Empty means no pixel code is output at all. */
  metaPixelId: string;
}

export type FieldType = 'text' | 'email' | 'tel' | 'postcode' | 'textarea' | 'select';

export interface FormField {
  name: string;
  type: FieldType;
  /** Visually hidden label for screen readers. For a select it is also the first, unselectable option. */
  label: string;
  placeholder: string;
  required: boolean;
  /** HTML autocomplete token. Sensible defaults are applied per type when omitted. */
  autocomplete?: string;
  icon?: IconName;
  minLength?: number;
  rows?: number;
  /** Choices for a select field, in the client's own words (for example budget ranges). */
  options?: string[];
}

export interface FormConfig {
  fields: FormField[];
  /** Defaults to cta.label when empty. */
  submitLabel: string;
  /** Where the lead goes. Read by src/lib/submit-lead.ts. Empty means log only. */
  destination: {
    url: string;
    method: 'POST';
    /** Optional extra fields sent with every lead, for example a CRM form ID. */
    extra: Record<string, string>;
  };
  /** Route the visitor lands on after a successful submit. */
  thankYouPath: string;
  messages: {
    required: string;
    email: string;
    phone: string;
    postcode: string;
    minLength: string;
    generic: string;
  };
  /** Text on the submit button while sending. */
  sendingLabel: string;
}

export interface LegalDoc {
  title: string;
  /** Button label in the footer. */
  label: string;
  sections: Array<{ heading?: string; paragraphs: string[]; bullets?: string[] }>;
}

export interface Seo {
  title: string;
  description: string;
  /** True keeps the page out of search engines. Ad landing pages should stay true. */
  noindex: boolean;
  /** Optional social share image under src/images. */
  ogImage: ImageRef;
}

export interface Cta {
  /** The label used on every CTA button and the form submit unless a section overrides it. */
  label: string;
  /** Anchor every CTA scrolls to. Must match the id of the offer form section. */
  target: string;
  /**
   * What sits under every CTA button. 'auto' shows the review badge when proof is set and the
   * reinforcement line otherwise; 'badge', 'reinforcement' and 'none' force one or nothing.
   */
  under: 'auto' | 'badge' | 'reinforcement' | 'none';
  /** One line restating the bonus and its value, for pages without a review profile. Empty hides it. */
  reinforcement: string;
}

export interface Header {
  /** Shows a fixed phone button at the bottom right on mobile. Off by default to match the reference. */
  stickyPhoneButton: boolean;
}

/* ---- Section content ------------------------------------------------- */

export interface HeroContent {
  eyebrow: string;
  headline: string;
  body: string;
  image: ImageRef;
  /**
   * 'cover': the photo fills the hero behind the text (reference A, needs a washed photo).
   * 'band': on phones the photo sits as a band under the CTA with the text on a flat surface
   * (reference B); on desktop it covers as usual.
   */
  imageLayout?: 'cover' | 'band';
}

export interface TrustItem { icon: IconName; label: string }
export interface TrustStripContent {
  items: TrustItem[];
  /** 'strip': icons over labels on the page surface (A). 'panel': a charcoal panel with accent icons and white uppercase labels (B). */
  variant?: 'strip' | 'panel';
}

export interface BeforeAfterPair { before: ImageRef; after: ImageRef }
export interface BeforeAfterContent {
  beforeLabel: string;
  afterLabel: string;
  pairs: BeforeAfterPair[];
  /** Direction the strip travels. The reference moves right. */
  direction: 'left' | 'right';
}

export interface LetterContent {
  headline: string;
  salutation: string;
  paragraphs: string[];
  images: ImageRef[];
}

export interface ProjectItem {
  suburb: string;
  /** Poster frame, portrait 9:16. Shown with a play glyph; required for the tile to render. */
  poster: ImageRef;
  /** YouTube, Vimeo or Wistia URL, or a direct MP4. Empty shows the poster only. */
  videoUrl: string;
}
export interface ProjectsContent { headline: string; items: ProjectItem[] }

export interface PhotoGridContent {
  images: ImageRef[];
  /** Tiles per row on desktop (phones always show two). Defaults to the image count up to four. */
  columns?: number;
}

export interface ComparisonRow { lead: string; text: string }
export interface ComparisonContent {
  headline: string;
  us: { title: string; items: ComparisonRow[] };
  them: { title: string; items: ComparisonRow[] };
  /** 'columns': two joined columns, accent and white (A). 'cards': two white cards with header plates and a dashed accent border on ours (B). */
  layout?: 'columns' | 'cards';
}

export interface Testimonial {
  /** The reviewer's own summary line (A) or the job type (B). */
  headline: string;
  body: string;
  /** Optional in the carousel layout; the rows layout expects all three. */
  name?: string;
  suburb?: string;
  /** 1 to 5. Omit or set 0 to hide the stars. */
  rating?: number;
  image: ImageRef;
}
export interface TestimonialsContent {
  headline: string;
  items: Testimonial[];
  /** 'rows': photo beside a card, alternating sides (A). 'carousel': one swipeable slide at a time with the photo above the quote (B). */
  layout?: 'rows' | 'carousel';
}

export interface BenefitItem { icon: IconName; title: string; body: string }
export interface BenefitsContent {
  headline: string;
  items: BenefitItem[];
  /** Used by the grid layout only. */
  image: ImageRef;
  /** 'grid': three-column cards around the photo (A). 'list': one column of cards, no photo (B). */
  layout?: 'grid' | 'list';
}

export interface FuturePacingContent {
  headline: string;
  paragraphs: string[];
  before: ImageRef;
  after: ImageRef;
  beforeLabel: string;
  afterLabel: string;
}

export interface BentoImage extends ImageRef {
  /** Spans two columns. The reference uses this on the first and last image. */
  wide?: boolean;
  /** Hidden below the desktop breakpoint so the two-column mobile grid stays even. */
  hideOnMobile?: boolean;
}
export interface BentoContent { headline: string; images: BentoImage[] }

export interface StepItem { title: string; body: string; image: ImageRef }
export interface StepsContent {
  headline: string;
  items: StepItem[];
  /** 'rail': number circles on a dashed rail beside the photo (A). 'rows': each step a muted card with the photo on one side and a numbered square (B). */
  layout?: 'rail' | 'rows';
}

export interface GuaranteeContent {
  badgeLine1: string;
  badgeLine2: string;
  /** Optional third badge line, for example the word Guaranteed. */
  badgeLine3?: string;
  headline: string;
  /** Optional. Empty hides it. */
  subheadline: string;
  paragraphs: string[];
  /** Optional decorative image between the paragraphs (reference B shows a floor-plan line drawing). */
  decorativeImage?: ImageRef;
  /** Shows a "terms apply" button that opens the terms modal, after the paragraphs. */
  termsLink?: boolean;
}

export interface OfferBullet { lead: string; text: string }
export interface OfferFormContent {
  headline: string;
  bundleImage: ImageRef;
  /** Optional line introducing the bullets, for example "Here is a fraction of what you will get:". */
  lead?: string;
  bullets: OfferBullet[];
  reinforcement: string;
}

/* ---- Section types introduced by reference B ------------------------- */

/** Slow strip of supplier and brand marks. */
export interface LogoStripContent { logos: ImageRef[] }

/** Wall of finished-job photos cropped to a fixed height with a "see more" button that expands it. */
export interface GalleryContent {
  images: ImageRef[];
  /** Button label, for example "Tap to see more". */
  moreLabel: string;
}

/**
 * Heading, paragraphs and a CTA beside one or two photos. Covers reference B's dream outcome,
 * problem, owner story and liveable-home sections. Set tone: 'dark' on the section for the problem variant.
 */
export interface SplitContent {
  headline: string;
  paragraphs: string[];
  /** One landscape photo (11:10) or two stacked photos (3:2). */
  images: ImageRef[];
  /** Which side the photos take on desktop. Phones always show heading, photos, paragraphs. */
  imageSide: 'left' | 'right';
  /** Set false to leave the CTA out (for example when the next section opens with one). */
  showCta?: boolean;
}

/** Centred heading and paragraphs with no photo in the body, optionally fading into a photo at the foot. */
export interface StatementContent {
  headline: string;
  paragraphs: string[];
  footImage?: ImageRef;
  showCta?: boolean;
}

export interface BeforeAfterGridItem {
  before: ImageRef;
  after: ImageRef;
  /** Suburb and room or surface, for example "Suburb Bathroom". */
  label: string;
  /** One line naming the change. */
  caption: string;
}
/** Grid of drag-to-compare tiles, one per job, each labelled with a suburb. */
export interface BeforeAfterGridContent {
  headline: string;
  items: BeforeAfterGridItem[];
  beforeLabel: string;
  afterLabel: string;
  showCta?: boolean;
}

/** Durability promise with the suppliers' marks on white tiles. */
export interface LogoGridContent {
  headline: string;
  paragraphs: string[];
  logos: ImageRef[];
  footImage?: ImageRef;
  showCta?: boolean;
}

export interface FaqItem { question: string; answer: string }
/** Accordion of the questions customers ask on the phone. The first item starts open. */
export interface FaqContent {
  headline: string;
  items: FaqItem[];
  showCta?: boolean;
}

export interface SectionBase {
  /** Turn a section off without deleting its content. */
  enabled: boolean;
  /** Optional HTML id. The offer form defaults to the CTA target. */
  id?: string;
  /** Per-section CTA label override. */
  ctaLabel?: string;
  /**
   * Background override. 'auto' (the default) lets the page plan backgrounds from the rendered order;
   * 'light', 'muted' and 'dark' pin this section. The dark look comes from brand.darkTone.
   */
  tone?: 'auto' | 'light' | 'muted' | 'dark';
}

export type SectionConfig =
  | (SectionBase & { type: 'hero'; content: HeroContent })
  | (SectionBase & { type: 'trustStrip'; content: TrustStripContent })
  | (SectionBase & { type: 'beforeAfter'; content: BeforeAfterContent })
  | (SectionBase & { type: 'letter'; content: LetterContent })
  | (SectionBase & { type: 'projects'; content: ProjectsContent })
  | (SectionBase & { type: 'photoGrid'; content: PhotoGridContent })
  | (SectionBase & { type: 'comparison'; content: ComparisonContent })
  | (SectionBase & { type: 'testimonials'; content: TestimonialsContent })
  | (SectionBase & { type: 'benefits'; content: BenefitsContent })
  | (SectionBase & { type: 'futurePacing'; content: FuturePacingContent })
  | (SectionBase & { type: 'bentoGallery'; content: BentoContent })
  | (SectionBase & { type: 'steps'; content: StepsContent })
  | (SectionBase & { type: 'guarantee'; content: GuaranteeContent })
  | (SectionBase & { type: 'offerForm'; content: OfferFormContent })
  | (SectionBase & { type: 'logoStrip'; content: LogoStripContent })
  | (SectionBase & { type: 'gallery'; content: GalleryContent })
  | (SectionBase & { type: 'split'; content: SplitContent })
  | (SectionBase & { type: 'statement'; content: StatementContent })
  | (SectionBase & { type: 'beforeAfterGrid'; content: BeforeAfterGridContent })
  | (SectionBase & { type: 'logoGrid'; content: LogoGridContent })
  | (SectionBase & { type: 'faq'; content: FaqContent });

export type SectionType = SectionConfig['type'];

export interface ThankYou {
  headline: string;
  subheadline: string;
  steps: Array<{ title: string; body: string }>;
  phoneLabel: string;
  seoTitle: string;
}

export interface SiteConfig {
  business: Business;
  brand: Brand;
  proof: Proof;
  tracking: Tracking;
  cta: Cta;
  header: Header;
  form: FormConfig;
  /** One optional plain-text line above the offer headline. Empty by default. Never generated. */
  urgency: { line: string };
  legal: { terms: LegalDoc; privacy: LegalDoc };
  seo: Seo;
  footer: { copyrightSuffix: string };
  thankYou: ThankYou;
  sections: SectionConfig[];
}

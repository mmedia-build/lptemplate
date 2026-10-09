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

export type FieldType = 'text' | 'email' | 'tel' | 'postcode' | 'textarea';

export interface FormField {
  name: string;
  type: FieldType;
  /** Visually hidden label for screen readers. */
  label: string;
  placeholder: string;
  required: boolean;
  /** HTML autocomplete token. Sensible defaults are applied per type when omitted. */
  autocomplete?: string;
  icon?: IconName;
  minLength?: number;
  rows?: number;
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
}

export interface TrustItem { icon: IconName; label: string }
export interface TrustStripContent { items: TrustItem[] }

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

export interface PhotoGridContent { images: ImageRef[] }

export interface ComparisonRow { lead: string; text: string }
export interface ComparisonContent {
  headline: string;
  us: { title: string; items: ComparisonRow[] };
  them: { title: string; items: ComparisonRow[] };
}

export interface Testimonial {
  headline: string;
  body: string;
  name: string;
  suburb: string;
  /** 1 to 5. */
  rating: number;
  image: ImageRef;
}
export interface TestimonialsContent { headline: string; items: Testimonial[] }

export interface BenefitItem { icon: IconName; title: string; body: string }
export interface BenefitsContent { headline: string; items: BenefitItem[]; image: ImageRef }

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
export interface StepsContent { headline: string; items: StepItem[] }

export interface GuaranteeContent {
  badgeLine1: string;
  badgeLine2: string;
  headline: string;
  subheadline: string;
  paragraphs: string[];
}

export interface OfferBullet { lead: string; text: string }
export interface OfferFormContent {
  headline: string;
  bundleImage: ImageRef;
  bullets: OfferBullet[];
  reinforcement: string;
}

export interface SectionBase {
  /** Turn a section off without deleting its content. */
  enabled: boolean;
  /** Optional HTML id. The offer form defaults to the CTA target. */
  id?: string;
  /** Per-section CTA label override. */
  ctaLabel?: string;
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
  | (SectionBase & { type: 'offerForm'; content: OfferFormContent });

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

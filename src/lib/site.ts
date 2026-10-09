/**
 * Single import point for the client config plus a few derived values that
 * several components need.
 */
import config from '@config';
import type { SiteConfig } from '../config/types.ts';

export const site: SiteConfig = config;

export const hasProof = Boolean(site.proof.rating && site.proof.count);

export const ctaLabel = site.cta.label;
export const ctaTarget = site.cta.target;
export const submitLabel = site.form.submitLabel || site.cta.label;

/** tel: href from the configured number, tolerant of spaces and brackets. */
export const telHref = `tel:${site.business.phone.replace(/[\s().-]/g, '')}`;

/** True when guide mode is on for this build. Read at build time only. */
export const guideMode = ['1', 'true', 'on', 'yes'].includes(
  String(import.meta.env.GUIDE_MODE ?? process.env.GUIDE_MODE ?? '').toLowerCase(),
);

export const currentYear = new Date().getFullYear();

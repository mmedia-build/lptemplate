/**
 * Meta pixel event helpers. Every function is a no-op when the pixel is not
 * loaded (no ID in config), so the rest of the page never has to check.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const LEAD_FLAG = 'lp:lead-submitted';

export function track(event: 'PageView' | 'Lead' | 'Contact', params?: Record<string, unknown>): void {
  if (typeof window.fbq !== 'function') return;
  if (params) window.fbq('track', event, params);
  else window.fbq('track', event);
}

/** Fires Contact on every click of a phone link. Delegated, so it also covers links added later. */
export function trackPhoneClicks(): void {
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    const link = target?.closest?.('a[href^="tel:"]');
    if (link) track('Contact');
  });
}

/** Marks that a lead was just submitted, read once by the thank-you page. */
export function markLeadSubmitted(): void {
  try {
    sessionStorage.setItem(LEAD_FLAG, String(Date.now()));
  } catch {
    /* ignore */
  }
}

/**
 * Fires Lead once on the thank-you page, only when the visitor arrived from a
 * successful submit. The flag is cleared immediately so a refresh or a direct
 * visit never fires it again.
 */
export function fireLeadOnce(): boolean {
  let flag: string | null = null;
  try {
    flag = sessionStorage.getItem(LEAD_FLAG);
    if (flag) sessionStorage.removeItem(LEAD_FLAG);
  } catch {
    return false;
  }
  if (!flag) return false;
  track('Lead');
  return true;
}

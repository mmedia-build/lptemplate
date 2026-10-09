/** Captures first-touch UTM parameters so a visitor who scrolls or returns still carries them to the form. */

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
const STORAGE_KEY = 'lp:utm';

export function captureUtm(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of KEYS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length && !sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    /* storage can be unavailable inside some in-app browsers; the form still works */
  }
}

export function readUtm(): Record<string, string> {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Record<string, string>;
  } catch {
    /* ignore */
  }
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

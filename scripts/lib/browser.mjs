/**
 * Launch options for Playwright's Chromium. The pinned Playwright expects its
 * own browser build; a container or CI image may ship a different one. When
 * the expected build is missing this falls back to CHROME_PATH or to a system
 * Chromium, so the checks run instead of asking for a browser download.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

export function launchOptions() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return { executablePath: process.env.CHROME_PATH };
  try {
    if (existsSync(chromium.executablePath())) return {};
  } catch {
    /* fall through */
  }
  const candidates = ['/opt/pw-browsers/chromium', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'];
  const found = candidates.find((p) => existsSync(p));
  return found ? { executablePath: found } : {};
}

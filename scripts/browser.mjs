/**
 * Launches Chromium for the verification scripts. Playwright's own browser is
 * used when it is installed; otherwise the build image's pre-installed
 * Chromium (/opt/pw-browsers/chromium, or CHROME_PATH) is used, so a newer
 * browser in the container does not stop the checks from running.
 */
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';

export const chromeCandidates = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].filter(Boolean);

export async function launchBrowser(options = {}) {
  try {
    return await chromium.launch(options);
  } catch (err) {
    const executablePath = chromeCandidates.find((p) => existsSync(p));
    if (!executablePath) throw err;
    return chromium.launch({ ...options, executablePath });
  }
}

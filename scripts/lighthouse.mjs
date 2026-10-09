#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile, simulated 4G) against the built site and writes
 * docs/build/lighthouse-mobile.json plus a one-line summary.
 *
 *   node scripts/lighthouse.mjs [path=/]
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import { serveDist } from './shoot.mjs';

const pagePath = process.argv[2] || '/';
const candidates = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROME_PATH].filter(Boolean);
const chromePath = candidates.find((p) => existsSync(p));
const { server, url } = await serveDist();
const chrome = await launch({ chromePath, chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
const result = await lighthouse(`${url}${pagePath}`, { port: chrome.port, output: 'json', logLevel: 'error' });
await chrome.kill();
server.close();
const lhr = result.lhr;
const cats = Object.fromEntries(Object.entries(lhr.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
const audits = lhr.audits;
const summary = {
  url: pagePath,
  scores: cats,
  metrics: {
    lcp: audits['largest-contentful-paint']?.displayValue,
    fcp: audits['first-contentful-paint']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    speedIndex: audits['speed-index']?.displayValue,
  },
  lcpElement: audits['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet?.slice(0, 120),
  failingAudits: Object.values(audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode === 'binary').map((a) => a.id),
};
await fs.mkdir('docs/build', { recursive: true });
await fs.writeFile(`docs/build/lighthouse-mobile${pagePath === '/' ? '' : '-' + pagePath.replace(/\W+/g, '')}.json`, result.report);
console.log(JSON.stringify(summary, null, 2));

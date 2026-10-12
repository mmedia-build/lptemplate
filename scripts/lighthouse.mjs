#!/usr/bin/env node
/**
 * Runs Lighthouse (mobile, simulated 4G) against the built site and writes
 * docs/build/lighthouse-mobile.json plus a one-line summary.
 *
 *   node scripts/lighthouse.mjs [path=/] [--dist=dist] [--tag=name]
 *
 * --dist points at another build (for example dist-renovation); --tag is
 * added to the output file name so results for presets sit side by side.
 */
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { serveDist } from './shoot.mjs';

const args = process.argv.slice(2);
const pagePath = args.find((a) => !a.startsWith('--')) || '/';
const distArg = args.find((a) => a.startsWith('--dist='));
const tag = (args.find((a) => a.startsWith('--tag=')) || '').slice(6);
const candidates = ['/opt/pw-browsers/chromium-1194/chrome-linux/chrome', process.env.CHROME_PATH].filter(Boolean);
const chromePath = candidates.find((p) => existsSync(p));
const { server, url } = await serveDist(0, distArg ? path.resolve(distArg.slice(7)) : undefined);
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
await fs.writeFile(`docs/build/${tag ? tag + '/' : ''}lighthouse-mobile${pagePath === '/' ? '' : '-' + pagePath.replace(/\W+/g, '')}.json`, result.report);
console.log(JSON.stringify(summary, null, 2));

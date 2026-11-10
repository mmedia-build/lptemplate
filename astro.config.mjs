// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/**
 * SITE_CONFIG lets the verification scripts build with an alternative config
 * (for example tests/fixtures/config.modular.ts) without touching
 * site.config.ts, and lets a Vercel project build a preset
 * (SITE_CONFIG=examples/site.config.agency.ts). When the file it names does
 * not exist on the branch being built, the build warns and uses
 * site.config.ts instead of failing, so one project-wide variable cannot
 * break branches that predate the preset.
 */
const defaultConfigPath = fileURLToPath(new URL('./site.config.ts', import.meta.url));
const requestedConfigPath = process.env.SITE_CONFIG ? path.resolve(process.env.SITE_CONFIG) : null;
if (requestedConfigPath && !existsSync(requestedConfigPath)) {
  console.warn(`[site-config] SITE_CONFIG=${process.env.SITE_CONFIG} does not exist on this branch; building site.config.ts instead.`);
}
const siteConfigPath = requestedConfigPath && existsSync(requestedConfigPath) ? requestedConfigPath : defaultConfigPath;

export default defineConfig({
  output: 'static',
  // OUT_DIR lets the verification scripts build fixtures beside dist/ without clobbering it.
  outDir: process.env.OUT_DIR || './dist',
  compressHTML: true,
  // 'where' keeps scoped selectors at natural specificity and lets a class passed to a
  // child component (Section, Container, Cta...) carry the parent's scope with it.
  scopedStyleStrategy: 'where',
  build: {
    // One inline stylesheet: no render-blocking CSS request on a one-page site.
    inlineStylesheets: 'always',
  },
  vite: {
    resolve: {
      alias: {
        '@config': siteConfigPath,
      },
    },
  },
});

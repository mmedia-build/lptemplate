// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * SITE_CONFIG lets the verification scripts build with an alternative config
 * (for example tests/fixtures/config.modular.ts) without touching
 * site.config.ts. Normal builds never set it.
 */
const siteConfigPath = process.env.SITE_CONFIG
  ? path.resolve(process.env.SITE_CONFIG)
  : fileURLToPath(new URL('./site.config.ts', import.meta.url));

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

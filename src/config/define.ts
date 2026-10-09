import type { SiteConfig } from './types.ts';

/** Identity helper that gives site.config.ts full type checking and editor hints. */
export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

export type { SiteConfig } from './types.ts';

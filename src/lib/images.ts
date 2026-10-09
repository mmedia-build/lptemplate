/**
 * Resolves the file names used in site.config.ts to the image modules Astro
 * can optimise. Every file under src/images is picked up; reference it by its
 * path relative to that folder, for example "hero.jpg" or "jobs/one.jpg".
 */
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/images/**/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG}',
  { eager: true },
);

export type ResolvedImage =
  | { status: 'empty' }
  | { status: 'missing'; src: string }
  | { status: 'ok'; src: string; image: ImageMetadata };

export function resolveImage(src: string | undefined): ResolvedImage {
  if (!src) return { status: 'empty' };
  const clean = src.replace(/^\/?src\/images\//, '').replace(/^\.?\//, '');
  const key = `/src/images/${clean}`;
  const mod = modules[key];
  if (!mod) return { status: 'missing', src };
  return { status: 'ok', src, image: mod.default };
}

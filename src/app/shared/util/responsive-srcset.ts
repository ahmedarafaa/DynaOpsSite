import type { ImageLoaderConfig } from '@angular/common';

// Copies written by scripts/generate-responsive-images.mjs; keep the widths and shares in sync with it.
export const HERO_MOBILE_WIDTHS = [600, 780] as const;
export const HOME_FEATURE_WIDTHS = [600, 960] as const;
// Percent of the source's own width: half and three quarters everywhere, plus a re-encoded full size for heroes.
const SCALES = [50, 75] as const;
const HERO_SCALES = [50, 75, 100] as const;

function copy(src: string, suffix: string): string {
  return src.replace(/\.webp$/, `-${suffix}.webp`);
}

// `srcset` of an image's fixed-width copies, ending with the file itself when its width is given.
export function responsiveSrcset(
  src: string,
  widths: readonly number[],
  fullWidth?: number,
): string {
  const copies = widths.map((width) => `${copy(src, `${width}w`)} ${width}w`);
  return [...copies, ...(fullWidth ? [`${src} ${fullWidth}w`] : [])].join(', ');
}

// `srcset` by width for an image whose size follows the layout; `width` is the file's own.
export function scaledSrcset(src: string, width: number): string {
  const copies = SCALES.map((scale) => `${copy(src, `s${scale}`)} ${scaledWidth(width, scale)}w`);
  return [...copies, `${src} ${width}w`].join(', ');
}

// `srcset` by screen density for a 2x export shown at a fixed size.
export function densitySrcset(src: string): string {
  return `${copy(src, 's50')} 1x, ${copy(src, 's75')} 1.5x, ${src} 2x`;
}

// `ngSrcset` listing a hero's copies, for an NgOptimizedImage that uses `scaledImageLoader`.
export function heroSrcsetWidths(width: number): string {
  return HERO_SCALES.map((scale) => `${scaledWidth(width, scale)}w`).join(', ');
}

// IMAGE_LOADER for hero images: maps each requested width back to its copy; `loaderParams.width` is the file's own.
export function scaledImageLoader({ src, width, loaderParams }: ImageLoaderConfig): string {
  const full = loaderParams?.['width'] as number | undefined;
  const scale = HERO_SCALES.find((s) => full && width === scaledWidth(full, s));
  return scale ? copy(src, `s${scale}`) : src;
}

function scaledWidth(width: number, scale: number): number {
  return Math.round((width * scale) / 100);
}

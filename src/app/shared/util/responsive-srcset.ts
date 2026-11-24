// Widths of the smaller copies written by scripts/generate-responsive-images.mjs; keep both in sync.
export const HERO_MOBILE_WIDTHS = [600, 780] as const;
export const HOME_FEATURE_WIDTHS = [600, 960] as const;

// `srcset` of an image's smaller copies, ending with the file itself when its width is given.
export function responsiveSrcset(
  src: string,
  widths: readonly number[],
  fullWidth?: number,
): string {
  const copies = widths.map((width) => `${src.replace(/\.webp$/, `-${width}w.webp`)} ${width}w`);
  return [...copies, ...(fullWidth ? [`${src} ${fullWidth}w`] : [])].join(', ');
}

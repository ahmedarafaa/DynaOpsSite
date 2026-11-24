// Writes smaller copies of large images next to their source, for srcset: <name>-<width>w.webp for fixed widths,
// <name>-s<percent>.webp for a share of the source's own width. Run it after adding or replacing a listed image
// and commit the output; copies newer than their source are kept. Usage: npm run images
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
// Visually matches the Figma exports at about two thirds of their size.
const QUALITY = 82;
const COPY = /-(\d+w|s\d+)\.webp$/;

// Keep in sync with src/app/shared/util/responsive-srcset.ts. Hero sets add a full-size (100) copy,
// because the first image on screen is worth re-encoding even where it cannot be smaller.
const SETS = [
  { match: /^home(-ar)?\/hero-map-mobile\.webp$/, widths: [600, 780] },
  { match: /^home(-ar)?\/feature-\d\.webp$/, widths: [600, 960] },
  { match: /(^|\/)footer-cta\.webp$/, scales: [50, 75] },
  { match: /^features\/all-features(-ar)?\/[^/]+\.webp$/, scales: [50, 75, 100] },
  { match: /^features\/[^/]+\/hero\.webp$/, scales: [50, 75, 100] },
  { match: /^features\/[^/]+\/capability-\d+\.webp$/, scales: [50, 75] },
  { match: /^features\/[^/]+\/(showcase|dashboard)\.webp$/, scales: [50, 75] },
  { match: /^industries\/features\/[^/]+\.webp$/, scales: [50, 75] },
];

async function list(dir, prefix = '') {
  const entries = await readdir(join(ROOT, dir), { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? list(join(dir, entry.name), `${prefix}${entry.name}/`)
        : [`${prefix}${entry.name}`],
    ),
  );
  return nested.flat();
}

const files = (await list('')).filter((file) => file.endsWith('.webp') && !COPY.test(file));
let written = 0;
let bytes = 0;

for (const { match, widths = [], scales = [] } of SETS) {
  const matched = files.filter((file) => match.test(file));
  if (!matched.length) {
    throw new Error(`No image matches ${match}`);
  }
  let setBytes = 0;
  for (const file of matched) {
    const source = join(ROOT, file);
    const { width: sourceWidth } = await sharp(source).metadata();
    const { mtimeMs: sourceModified } = await stat(source);
    const copies = [
      ...widths.map((width) => ({ width, suffix: `${width}w` })),
      ...scales.map((scale) => ({
        width: Math.round((sourceWidth * scale) / 100),
        suffix: `s${scale}`,
      })),
    ];
    for (const { width, suffix } of copies) {
      if (width > sourceWidth) {
        throw new Error(`${file} is ${sourceWidth}px wide, narrower than its ${suffix} copy`);
      }
      const target = source.replace(/\.webp$/, `-${suffix}.webp`);
      const existing = await stat(target).catch(() => null);
      if (existing && existing.mtimeMs >= sourceModified) {
        setBytes += existing.size;
        continue;
      }
      const { size } = await sharp(source)
        .resize({ width })
        .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
        .toFile(target);
      written++;
      setBytes += size;
    }
  }
  bytes += setBytes;
  const sourceBytes = (await Promise.all(matched.map((file) => stat(join(ROOT, file))))).reduce(
    (sum, { size }) => sum + size,
    0,
  );
  console.log(
    `${String(match)}: ${matched.length} images (${Math.round(sourceBytes / 1024)} KB), copies ${Math.round(setBytes / 1024)} KB`,
  );
}
console.log(`${written} copies written, ${(bytes / 1024 / 1024).toFixed(1)} MB`);

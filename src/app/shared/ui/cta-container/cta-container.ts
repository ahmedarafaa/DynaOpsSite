import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { scaledSrcset } from '../../util/responsive-srcset';
import type { CtaImagePosition, CtaImageSize } from './cta-container.model';

// Width of a positioned image: 440px by default; the device photo of the feature pages is 400 / 500 / full width.
// Compact is the Integration page's 344x170 artwork, exported with 42px of shadow below that stays out of the layout.
const IMAGE_SIZES: Record<CtaImageSize, string> = {
  default: 'block w-full max-w-110',
  device: 'block w-full md:max-w-125 xl:max-w-100',
  compact: 'block w-full max-w-86 -mb-10.5',
};

// Rendered width per size for `sizes`; a cover image spans the frame.
const IMAGE_SIZES_ATTR: Record<CtaImageSize, string> = {
  default: '(min-width: 30rem) 440px, calc(100vw - 2rem)',
  device: '(min-width: 80rem) 400px, (min-width: 48rem) 500px, calc(100vw - 2rem)',
  compact: '344px',
};
const COVER_SIZES_ATTR = '(min-width: 80rem) 1200px, calc(100vw - 2rem)';

const IMAGE_POSITIONS: Record<CtaImagePosition, { layer: string; content: string }> = {
  'top-start': { layer: 'xl:items-start xl:justify-start xl:pt-16', content: 'xl:ps-116' },
  'center-start': { layer: 'xl:items-center xl:justify-start', content: 'xl:ps-116' },
  'bottom-start': { layer: 'xl:items-end xl:justify-start', content: 'xl:ps-116' },
  'top-end': { layer: 'xl:items-start xl:justify-end xl:pt-16', content: 'xl:pe-116' },
  'center-end': { layer: 'xl:items-center xl:justify-end', content: 'xl:pe-116' },
  'bottom-end': { layer: 'xl:items-end xl:justify-end', content: 'xl:pe-116' },
};

@Component({
  selector: 'app-cta-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'relative isolate flex min-h-92.5 flex-col justify-center overflow-hidden rounded-xl md:min-h-0',
  },
  template: `
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 bg-linear-to-t/srgb from-brand-500/50 to-brand-500"
    ></div>

    @if (image(); as src) {
      <div aria-hidden="true" class="pointer-events-none" [class]="imageLayerClass()">
        <img
          [src]="src"
          [attr.srcset]="srcset()"
          [attr.sizes]="srcset() ? sizes() : null"
          alt=""
          [attr.width]="imageWidth()"
          [attr.height]="imageHeight()"
          loading="lazy"
          [class]="imageCover() ? coverImageClass : IMAGE_SIZES[imageSize()]"
          [style.--cta-cover-offset]="imageCover() ? '-' + imageCoverOffset() + '%' : null"
        />
      </div>
    }

    <div
      class="relative flex flex-col items-center gap-8 px-4 pt-8 text-center text-fg-inverse md:px-12 md:pt-16"
      [class]="contentClass()"
    >
      <ng-content />
    </div>
  `,
})
export class CtaContainer {
  readonly image = input<string>();
  readonly imageWidth = input<number>();
  readonly imageHeight = input<number>();
  // The image has the smaller copies written by scripts/generate-responsive-images.mjs; needs the file's own `imageWidth`.
  readonly imageScaled = input(false, { transform: booleanAttribute });
  // Fill the frame with the image instead of placing it at `imagePosition`.
  readonly imageCover = input(false, { transform: booleanAttribute });
  // Paint the gradient over the image rather than under it.
  readonly imageBehindGradient = input(false, { transform: booleanAttribute });
  readonly imagePosition = input<CtaImagePosition>('top-end');
  // From xl a cover image fits the frame width; this percent of its height is cropped off the top.
  readonly imageCoverOffset = input(0);
  readonly imageSize = input<CtaImageSize>('default');
  // Up to lg, place a positioned image above the copy instead of below it.
  readonly imageFirst = input(false, { transform: booleanAttribute });

  protected readonly IMAGE_SIZES = IMAGE_SIZES;

  protected readonly srcset = computed(() => {
    const src = this.image();
    const width = this.imageWidth();
    return this.imageScaled() && src && width ? scaledSrcset(src, width) : null;
  });
  protected readonly sizes = computed(() =>
    this.imageCover() ? COVER_SIZES_ATTR : IMAGE_SIZES_ATTR[this.imageSize()],
  );

  // Centred cover up to lg; from xl the image keeps its ratio and slides up by the offset, as Figma crops it.
  protected readonly coverImageClass =
    'size-full object-cover opacity-80 xl:h-auto xl:translate-y-(--cta-cover-offset)';

  private readonly positioned = computed(() => !!this.image() && !this.imageCover());

  // A positioned image stacks under the copy up to lg; from xl it moves into the frame and is clipped by it.
  protected readonly imageLayerClass = computed(() => {
    const depth = this.imageBehindGradient() ? '-z-10' : '';
    if (this.imageCover()) {
      return `absolute inset-0 ${depth}`;
    }
    const { layer } = IMAGE_POSITIONS[this.imagePosition()];
    // order-first also paints the layer first, under the gradient, so it is lifted back above it.
    const order = this.imageFirst()
      ? `order-first pt-8 md:pt-16 xl:pt-0 ${depth ? '' : 'z-10 xl:z-auto'}`
      : 'order-last';
    return `relative ${order} flex justify-center px-4 md:px-12 xl:absolute xl:inset-0 xl:order-none ${layer} ${depth}`;
  });

  // The copy stays centred unless an image is positioned beside it from xl.
  protected readonly contentClass = computed(() =>
    this.positioned()
      ? `pb-8 xl:items-start xl:pb-16 xl:text-start ${IMAGE_POSITIONS[this.imagePosition()].content}`
      : 'pb-8 md:pb-16',
  );
}

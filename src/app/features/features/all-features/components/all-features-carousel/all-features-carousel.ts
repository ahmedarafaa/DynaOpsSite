import { IMAGE_LOADER, NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

import { heroSrcsetWidths, scaledImageLoader } from '../../../../../shared/util/responsive-srcset';
import type { AllFeaturesSlide } from './all-features-carousel.model';

// Figma: each slide holds 2.5s, then smart-animates to the next over 0.6s and loops.
const HOLD_MS = 2500;
const FADE_MS = 600;

@Component({
  selector: 'app-all-features-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './all-features-carousel.html',
  providers: [{ provide: IMAGE_LOADER, useValue: scaledImageLoader }],
  host: {
    class: 'block',
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'paused.set(false)',
    '(focusin)': 'paused.set(true)',
    '(focusout)': 'paused.set(false)',
  },
})
export class AllFeaturesCarousel {
  readonly slides = input.required<AllFeaturesSlide[]>();
  readonly label = input.required<string>();

  protected readonly active = signal(0);
  // Stays opaque under the incoming slide, so the page never shows through mid-fade.
  protected readonly previous = signal(-1);
  protected readonly paused = signal(false);
  // Slides whose image is in the page: the first, then each one before its turn.
  protected readonly mounted = signal<ReadonlySet<number>>(new Set([0]));

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.startAutoplay();
      // The second slide waits for the page to finish loading, so it never competes with the first.
      if (document.readyState === 'complete') {
        this.mount(1);
      } else {
        window.addEventListener('load', () => this.mount(1), { once: true });
      }
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  // A dot click restarts the countdown, so autoplay never cuts the fade it just started.
  protected select(index: number): void {
    this.show(index);
    if (this.timer) this.startAutoplay();
  }

  private startAutoplay(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.paused()) this.show(this.active() + 1);
    }, HOLD_MS + FADE_MS);
  }

  // The transition lives only on the incoming slide and only on opacity, so z-index never animates.
  protected layerClass(index: number): string {
    if (index === this.active()) {
      return 'z-20 transition-opacity duration-600 ease-in-out motion-reduce:transition-none';
    }
    return index === this.previous() ? 'z-10' : 'opacity-0';
  }

  protected srcsetWidths({ width }: AllFeaturesSlide): string {
    return heroSrcsetWidths(width);
  }

  private mount(...indexes: number[]): void {
    const count = this.slides().length;
    this.mounted.update((mounted) => new Set([...mounted, ...indexes.map((i) => i % count)]));
  }

  protected show(index: number): void {
    const next = index % this.slides().length;
    if (next === this.active()) return;
    this.previous.set(this.active());
    this.active.set(next);
    this.mount(next, next + 1);
  }
}

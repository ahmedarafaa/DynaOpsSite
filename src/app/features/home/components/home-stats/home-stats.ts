import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import type { HomeStatsContent } from './home-stats.model';

// Figma: each testimonial holds 10s, then smart-animates to the next over 0.3s.
const HOLD_MS = 10_000;

// Pitch, link and rotating testimonial beside the three headline figures; one column below xl.
@Component({
  selector: 'app-home-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './home-stats.html',
  host: { class: 'block' },
})
export class HomeStats {
  readonly content = input.required<HomeStatsContent>();

  protected readonly active = signal(0);
  protected readonly paused = signal(false);

  private timer?: ReturnType<typeof setInterval>;

  constructor() {
    afterNextRender(() => {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) this.startAutoplay();
    });
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  protected select(index: number): void {
    this.active.set(index);
    if (this.timer) this.startAutoplay();
  }

  private startAutoplay(): void {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.paused()) this.active.set((this.active() + 1) % this.content().testimonials.length);
    }, HOLD_MS);
  }
}

import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { FeatureCapabilityPanel } from '../feature-capability-panel/feature-capability-panel';
import type { FeatureCapabilitiesContent } from './feature-capabilities.model';

// Scroll distance each capability takes, and the card's minimum gap below the sticky site header.
const SCROLL_PER_ITEM_VH = 55;
const HEADER_CLEARANCE = 96;

// "Everything your team needs" section: from xl a tall track holds the card sticky in the viewport and the
// scroll through it picks the open capability; below xl every capability is open with its own panel.
@Component({
  selector: 'app-feature-capabilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureCapabilityPanel],
  templateUrl: './feature-capabilities.html',
  styleUrl: './feature-capabilities.css',
  host: { class: 'block' },
})
export class FeatureCapabilities {
  readonly content = input.required<FeatureCapabilitiesContent>();

  protected readonly active = signal(0);
  protected readonly images = computed(() => this.content().items.map((item) => item.image));

  // Off when the screen is below xl or too short for the whole card; titles then switch on click.
  protected readonly scrollMode = signal(false);
  protected readonly stickyTop = signal(HEADER_CLEARANCE);
  private readonly cardHeight = signal(0);
  protected readonly trackHeight = computed(() =>
    this.scrollMode()
      ? `calc(${this.cardHeight()}px + ${this.content().items.length * SCROLL_PER_ITEM_VH}vh)`
      : null,
  );

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly card = viewChild.required<ElementRef<HTMLElement>>('card');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      let frame = 0;
      const onScroll = (): void => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => this.update());
      };
      const resize = new ResizeObserver(onScroll);
      resize.observe(this.card().nativeElement);
      addEventListener('scroll', onScroll, { passive: true });
      addEventListener('resize', onScroll, { passive: true });
      destroyRef.onDestroy(() => {
        cancelAnimationFrame(frame);
        resize.disconnect();
        removeEventListener('scroll', onScroll);
        removeEventListener('resize', onScroll);
      });
    });
  }

  // In scroll mode a click scrolls to that capability's slice of the track, so scroll and click never disagree.
  protected select(index: number): void {
    if (!this.scrollMode()) {
      this.active.set(index);
      return;
    }
    const track = this.track().nativeElement;
    const distance = track.offsetHeight - this.cardHeight();
    const top =
      track.getBoundingClientRect().top +
      scrollY -
      this.stickyTop() +
      (distance * (index + 0.1)) / this.content().items.length;
    scrollTo({ top, behavior: 'smooth' });
  }

  protected number(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  private update(): void {
    const card = this.card().nativeElement;
    const height = card.offsetHeight;
    if (!height) return;
    this.cardHeight.set(height);
    this.stickyTop.set(Math.max(HEADER_CLEARANCE, (innerHeight - height) / 2));
    this.scrollMode.set(height <= innerHeight - HEADER_CLEARANCE - 16);
    if (!this.scrollMode()) return;

    const track = this.track().nativeElement;
    const distance = track.offsetHeight - height;
    if (distance <= 0) return;
    const through = (this.stickyTop() - track.getBoundingClientRect().top) / distance;
    this.active.set(
      Math.floor(Math.min(0.9999, Math.max(0, through)) * this.content().items.length),
    );
  }
}

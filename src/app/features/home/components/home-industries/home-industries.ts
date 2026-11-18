import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { HomeHeading } from '../home-heading/home-heading';
import type { HomeIndustriesContent } from './home-industries.model';

// Pixels the mouse must travel before a press becomes a drag instead of a click.
const DRAG_THRESHOLD = 5;

// Industry cards: a vertical list on phones, a horizontal scroller with arrows and mouse drag from tablet up.
@Component({
  selector: 'app-home-industries',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, HomeHeading],
  templateUrl: './home-industries.html',
  styleUrl: './home-industries.css',
  host: { class: 'block', '(window:resize)': 'update()' },
})
export class HomeIndustries {
  readonly content = input.required<HomeIndustriesContent>();

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);
  protected readonly dragging = signal(false);

  private drag: { pointerId: number; startX: number; startScroll: number; moved: boolean } | null =
    null;
  private suppressClick = false;

  constructor() {
    afterNextRender(() => {
      this.update();
      // Capture phase, so a drag that ends on a card does not also follow its link.
      const el = this.track().nativeElement;
      const swallowClick = (event: MouseEvent) => {
        if (!this.suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
      };
      el.addEventListener('click', swallowClick, true);
      this.destroyRef.onDestroy(() => el.removeEventListener('click', swallowClick, true));
    });
  }

  // One card plus the gap; negative in Arabic, where the track scrolls leftwards.
  protected scroll(direction: 1 | -1): void {
    const el = this.track().nativeElement;
    const card = el.querySelector('li');
    const step = (card?.offsetWidth ?? 332) + 24;
    const rtl = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
    el.scrollBy({ left: direction * step * rtl, behavior: 'smooth' });
  }

  protected update(): void {
    const el = this.track().nativeElement;
    const offset = Math.abs(el.scrollLeft);
    this.atStart.set(offset <= 1);
    this.atEnd.set(offset + el.clientWidth >= el.scrollWidth - 1);
  }

  protected onPointerDown(event: PointerEvent): void {
    const el = this.track().nativeElement;
    // Touch already swipes natively, and phones show a stacked list with nothing to drag.
    if (event.pointerType !== 'mouse' || event.button !== 0 || el.scrollWidth <= el.clientWidth) {
      return;
    }
    this.drag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
  }

  protected onPointerMove(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const el = this.track().nativeElement;
    const dx = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.moved = true;
      this.dragging.set(true);
      el.setPointerCapture(event.pointerId);
    }
    el.scrollLeft = drag.startScroll - dx;
  }

  protected onPointerUp(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    this.drag = null;
    if (!drag.moved) return;
    this.dragging.set(false);
    // The click that follows this pointerup belongs to the drag; later clicks open cards again.
    this.suppressClick = true;
    setTimeout(() => (this.suppressClick = false));
    this.settle();
  }

  // Glides to the nearest card edge (or the end of the track), then hands back to CSS snapping.
  private settle(): void {
    const el = this.track().nativeElement;
    const style = getComputedStyle(el);
    const rtl = style.direction === 'rtl';
    const box = el.getBoundingClientRect();
    const padding = parseFloat(style.paddingInlineStart);
    const anchor = rtl ? box.right - padding : box.left + padding;
    const max = el.scrollWidth - el.clientWidth;
    const toEnd = rtl ? -max - el.scrollLeft : max - el.scrollLeft;
    const toCards = [...el.querySelectorAll('li')].map((li) => {
      const rect = li.getBoundingClientRect();
      return (rtl ? rect.right : rect.left) - anchor;
    });
    const delta = [...toCards, toEnd].reduce((a, b) => (Math.abs(b) < Math.abs(a) ? b : a));

    el.classList.add('is-settling');
    const release = () => el.classList.remove('is-settling');
    el.addEventListener('scrollend', release, { once: true });
    setTimeout(release, 700);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

import type { AboutPortfolioContent, AboutPortfolioTone } from './about-portfolio.model';

// "Part of a Growing Software Portfolio": the product cards, stacked open below xl and opening in turn from xl.
@Component({
  selector: 'app-about-portfolio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-portfolio.html',
  styleUrl: './about-portfolio.css',
  host: { class: 'block' },
})
export class AboutPortfolio {
  readonly content = input.required<AboutPortfolioContent>();

  // Card the visitor clicked; the loop stops once there is one.
  protected readonly selected = signal<number | null>(null);

  private readonly row = viewChild.required<ElementRef<HTMLElement>>('row');
  private readonly cards = viewChildren<ElementRef<HTMLElement>>('card');

  // Full class names so Tailwind's scanner sees them.
  protected readonly toneClass: Record<AboutPortfolioTone, string> = {
    dynaops: 'from-brand-500 to-brand-300',
    zatca: 'from-zatca-navy to-zatca-blue',
    restricto: 'from-brand-800 to-brand-500',
  };

  // Freezes each card where the loop left it, then lets the `.picked` transition carry it open or closed.
  protected select(index: number): void {
    const cards = this.cards().map(({ nativeElement }) => nativeElement);
    for (const card of cards) {
      card.style.setProperty('--picked', getComputedStyle(card).getPropertyValue('--open'));
    }
    const row = this.row().nativeElement;
    row.classList.add('picked');
    void row.offsetWidth;
    cards.forEach((card, i) => card.style.setProperty('--picked', i === index ? '1' : '0'));
    this.selected.set(index);
  }
}

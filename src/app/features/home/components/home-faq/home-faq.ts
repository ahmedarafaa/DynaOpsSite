import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { HomeHeading } from '../home-heading/home-heading';
import type { HomeFaqContent } from './home-faq.model';

// Category tabs over a single-open accordion of questions.
@Component({
  selector: 'app-home-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeHeading],
  templateUrl: './home-faq.html',
  host: { class: 'block' },
})
export class HomeFaq {
  readonly content = input.required<HomeFaqContent>();

  private readonly injector = inject(Injector);
  private readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private resize?: Animation;

  protected readonly categoryId = signal<string | null>(null);
  protected readonly open = signal<string | null>(null);

  protected readonly category = computed(() => {
    const categories = this.content().categories;
    return categories.find((c) => c.id === this.categoryId()) ?? categories[0];
  });

  protected selectCategory(id: string): void {
    if (id === this.category().id) return;
    const el = this.panel().nativeElement;
    const from = el.getBoundingClientRect().height;
    this.resize?.cancel();
    this.categoryId.set(id);
    this.open.set(null);
    // Glide from the old list's height to the new one once it has rendered.
    afterNextRender(
      () => {
        // An answer left open in the old tab is still collapsing; jump it to the end so the target height is final.
        el.getAnimations({ subtree: true }).forEach((a) => a !== this.resize && a.finish());
        const to = el.getBoundingClientRect().height;
        if (from === to || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        this.resize = el.animate(
          [
            { height: `${from}px`, overflow: 'hidden' },
            { height: `${to}px`, overflow: 'hidden' },
          ],
          { duration: 300, easing: 'ease-out' },
        );
      },
      { injector: this.injector },
    );
  }

  protected toggle(question: string): void {
    this.open.set(this.open() === question ? null : question);
  }
}

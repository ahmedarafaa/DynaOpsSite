import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { HomeHeadingContent, HomeHeadingSize } from './home-heading.model';

// Eyebrow and title shared by the Features, Integration, Industries and FAQ sections; the caller sets alignment.
@Component({
  selector: 'app-home-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col gap-4' },
  template: `
    <p class="flex items-center gap-2 text-label-md text-fg-brand">
      <img [src]="content().icon" alt="" width="24" height="24" class="size-6" />
      {{ content().eyebrow }}
    </p>
    <h2 class="whitespace-pre-line" [class]="titleClass()">{{ content().title }}</h2>
  `,
})
export class HomeHeading {
  readonly content = input.required<HomeHeadingContent>();
  readonly size = input<HomeHeadingSize>('display');

  protected readonly titleClass = computed(() =>
    this.size() === 'display'
      ? 'text-h2-sm md:text-h2 lg:text-display-md'
      : 'text-h2-sm md:text-h2',
  );
}

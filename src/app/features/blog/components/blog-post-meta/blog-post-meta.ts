import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import type { BlogPostMetaSize } from './blog-post-meta.model';

// Publish date and reading time of a post; the featured post adds its "New" badge through the slot.
@Component({
  selector: 'app-blog-post-meta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  host: { class: 'flex flex-wrap items-center gap-3 text-fg-secondary' },
  template: `
    <ng-content />
    <time [attr.datetime]="date()" [class]="labelClass()">{{ date() | date: 'longDate' }}</time>
    <span class="flex items-center gap-1" [class]="labelClass()">
      @if (size() === 'md') {
        <img
          src="/icons/blog/transaction-history-1-secondary.svg"
          alt=""
          width="18"
          height="18"
          class="size-4.5"
        />
      } @else {
        <img
          src="/icons/blog/transaction-history-secondary.svg"
          alt=""
          width="15"
          height="15"
          class="size-3.75"
        />
      }
      {{ readTime() }}
    </span>
  `,
})
export class BlogPostMeta {
  // ISO date, formatted for the page language.
  readonly date = input.required<string>();
  readonly readMinutes = input.required<number>();
  readonly size = input<BlogPostMetaSize>('sm');

  protected readonly readTime = computed(
    () => $localize`:@@blog.readTime:${this.readMinutes()}:minutes: min read`,
  );
  protected readonly labelClass = computed(() =>
    this.size() === 'md' ? 'text-label-md' : 'text-label-sm',
  );
}

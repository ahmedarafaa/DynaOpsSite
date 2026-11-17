import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { blogReadTime } from '../blog-post-meta/blog-read-time';
import type { BlogArticleHeroContent } from './blog-article-hero.model';

// Opener of an article: cover, title, summary and the author / date / read-time line.
@Component({
  selector: 'app-blog-article-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './blog-article-hero.html',
  host: {
    class:
      'block overflow-hidden rounded-b-xl bg-linear-to-b/srgb from-transparent to-brand-500/20',
  },
})
export class BlogArticleHero {
  readonly content = input.required<BlogArticleHeroContent>();

  protected readonly readTime = computed(() => blogReadTime(this.content().readMinutes));
}

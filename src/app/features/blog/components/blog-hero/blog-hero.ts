import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BlogPostMeta } from '../blog-post-meta/blog-post-meta';
import type { BlogHeroContent } from './blog-hero.model';

// Opener of the Blog page: the page heading over the featured post.
@Component({
  selector: 'app-blog-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, BlogPostMeta],
  templateUrl: './blog-hero.html',
  host: {
    class:
      'block overflow-hidden rounded-b-xl bg-linear-to-b/srgb from-transparent to-brand-500/20',
  },
})
export class BlogHero {
  readonly content = input.required<BlogHeroContent>();
}

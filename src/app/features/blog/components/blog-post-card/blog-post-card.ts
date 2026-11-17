import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BlogPostMeta } from '../blog-post-meta/blog-post-meta';
import type { BlogPost, BlogPostCardHeadingLevel } from './blog-post-card.model';
import { BLOG_TITLE_HOVER } from './blog-title-hover';

// Post card of the Blog grid and Related articles: stacked, a row with the cover beside the copy on tablet.
@Component({
  selector: 'app-blog-post-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, BlogPostMeta],
  templateUrl: './blog-post-card.html',
  host: { class: 'block' },
})
export class BlogPostCard {
  readonly post = input.required<BlogPost>();
  readonly headingLevel = input<BlogPostCardHeadingLevel>(2);

  protected readonly titleHover = BLOG_TITLE_HOVER;
}

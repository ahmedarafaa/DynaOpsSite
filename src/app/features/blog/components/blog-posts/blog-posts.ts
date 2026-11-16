import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';
import { BlogPostMeta } from '../blog-post-meta/blog-post-meta';
import type { BlogPostsContent } from './blog-posts.model';

// Grid of the latest posts below the featured one, revealed a page at a time.
@Component({
  selector: 'app-blog-posts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, BlogPostMeta],
  templateUrl: './blog-posts.html',
  host: { class: 'block' },
})
export class BlogPosts {
  readonly content = input.required<BlogPostsContent>();

  private readonly pages = signal(1);

  protected readonly visiblePosts = computed(() =>
    this.content().posts.slice(0, this.pages() * this.content().pageSize),
  );
  protected readonly hasMore = computed(
    () => this.visiblePosts().length < this.content().posts.length,
  );

  protected loadMore(): void {
    this.pages.update((pages) => pages + 1);
  }
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BlogPostCard } from '../blog-post-card/blog-post-card';
import type { BlogRelatedPostsContent } from './blog-related-posts.model';

// "Related articles" under an article, laid out like the Blog grid.
@Component({
  selector: 'app-blog-related-posts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BlogPostCard],
  host: { class: 'block' },
  template: `
    <div class="container-page">
      <div class="mx-auto flex w-full max-w-300 flex-col items-center gap-8 xl:gap-16">
        <h2 class="text-h2 md:text-h1">{{ content().title }}</h2>
        <ul class="grid w-full gap-8 xl:grid-cols-3">
          @for (post of content().posts; track post.title) {
            <li><app-blog-post-card [post]="post" [headingLevel]="3" /></li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class BlogRelatedPosts {
  readonly content = input.required<BlogRelatedPostsContent>();
}

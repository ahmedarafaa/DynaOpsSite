import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterCta } from '../../../../layout/footer/footer-cta.directive';
import { Button } from '../../../../shared/ui/button/button';
import { CtaContainer } from '../../../../shared/ui/cta-container/cta-container';
import { BlogArticleBody } from '../blog-article-body/blog-article-body';
import { BlogArticleHero } from '../blog-article-hero/blog-article-hero';
import { BlogRelatedPosts } from '../blog-related-posts/blog-related-posts';
import type { BlogArticlePageContent } from './blog-article-page.model';

// Layout shared by the blog articles: hero, body, related articles and the footer CTA, all from `content`.
@Component({
  selector: 'app-blog-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    BlogArticleHero,
    BlogArticleBody,
    BlogRelatedPosts,
    FooterCta,
    CtaContainer,
    Button,
  ],
  templateUrl: './blog-article-page.html',
  // Figma stacks the sections 24 / 48 / 64px apart (phone / tablet / desktop), and as far again above the footer.
  host: { class: 'flex flex-col gap-6 pb-6 md:gap-12 md:pb-12 xl:gap-16 xl:pb-16' },
})
export class BlogArticlePage {
  readonly content = input.required<BlogArticlePageContent>();
}

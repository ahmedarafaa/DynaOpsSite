import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterCta } from '../../layout/footer/footer-cta.directive';
import { Button } from '../../shared/ui/button/button';
import { CtaContainer } from '../../shared/ui/cta-container/cta-container';
import { BLOG_CONTENT } from './blog-content';
import { BlogHero } from './components/blog-hero/blog-hero';
import { BlogPosts } from './components/blog-posts/blog-posts';

// Blog index: heading with the featured post, the latest posts grid and the footer CTA.
@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, BlogHero, BlogPosts, FooterCta, CtaContainer, Button],
  templateUrl: './blog.html',
  // Figma stacks the sections 24 / 48 / 64px apart (phone / tablet / desktop), and as far again above the footer.
  host: { class: 'flex flex-col gap-6 pb-6 md:gap-12 md:pb-12 xl:gap-16 xl:pb-16' },
})
export class Blog {
  protected readonly content = BLOG_CONTENT;
}

import type { CtaContent } from '../../shared/ui/cta-container/cta-container.model';
import type { BlogHeroContent } from './components/blog-hero/blog-hero.model';
import type { BlogPostsContent } from './components/blog-posts/blog-posts.model';

// Copy and artwork of each section of the Blog page; its title and description live in blog-seo.ts.
export interface BlogContent {
  hero: BlogHeroContent;
  posts: BlogPostsContent;
  // Rendered at the top of the footer, with the device photo beside the copy.
  footerCta: CtaContent;
}

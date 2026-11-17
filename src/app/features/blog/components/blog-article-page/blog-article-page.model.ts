import type { CtaContent } from '../../../../shared/ui/cta-container/cta-container.model';
import type { BlogArticleHeroContent } from '../blog-article-hero/blog-article-hero.model';
import type { BlogArticleSection } from '../blog-article-body/blog-article-body.model';
import type { BlogRelatedPostsContent } from '../blog-related-posts/blog-related-posts.model';

// Everything an article page renders; its title and description live in the article's -seo.ts file.
export interface BlogArticlePageContent {
  hero: BlogArticleHeroContent;
  body: BlogArticleSection[];
  related: BlogRelatedPostsContent;
  footerCta: CtaContent;
}

import type { BlogPostImage } from '../blog-post-card/blog-post-card.model';

export interface BlogArticleHeroContent {
  // 838x300 cover, wider than the one on the Blog page.
  cover: BlogPostImage;
  title: string;
  description: string;
  author: string;
  // ISO date, e.g. 2026-10-17.
  date: string;
  readMinutes: number;
}

import type { BlogPost } from '../blog-post-card/blog-post-card.model';

export interface BlogRelatedPostsContent {
  title: string;
  posts: BlogPost[];
}

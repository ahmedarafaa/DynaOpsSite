import type { BlogPost } from '../blog-post-card/blog-post-card.model';

export interface BlogPostsContent {
  posts: BlogPost[];
  // Cards shown at first and added by each "Load more".
  pageSize: number;
  loadMore: string;
}

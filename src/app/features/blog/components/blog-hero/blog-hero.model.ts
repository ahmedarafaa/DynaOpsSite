import type { BlogPost } from '../blog-post-card/blog-post-card.model';

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogFeaturedPost extends BlogPost {
  author: BlogAuthor;
  // Shows the "New" badge before the date.
  isNew?: boolean;
}

export interface BlogHeroContent {
  title: string;
  description: string;
  newLabel: string;
  featured: BlogFeaturedPost;
}

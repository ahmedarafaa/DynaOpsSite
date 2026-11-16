export interface BlogPostImage {
  // 2x export of the Figma cover.
  src: string;
  width: number;
  height: number;
}

export interface BlogPost {
  title: string;
  excerpt: string;
  // ISO date, e.g. 2026-10-17.
  date: string;
  readMinutes: number;
  image: BlogPostImage;
  // Article route; posts without one render as plain cards until their pages exist.
  href?: string;
}

export interface BlogPostsContent {
  posts: BlogPost[];
  // Cards shown at first and added by each "Load more".
  pageSize: number;
  loadMore: string;
}

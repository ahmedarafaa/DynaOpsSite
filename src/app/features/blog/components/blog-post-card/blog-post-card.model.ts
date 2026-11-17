export interface BlogCoverLogo {
  src: string;
  width: number;
  height: number;
}

export interface BlogPostImage {
  // 2x export of the Figma cover; without its logo when `logo` is set.
  src: string;
  width: number;
  height: number;
  // Logo centred on the cover, kept separate so it can grow on hover.
  logo?: BlogCoverLogo;
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

// h2 on the Blog page, h3 under the "Related articles" heading.
export type BlogPostCardHeadingLevel = 2 | 3;

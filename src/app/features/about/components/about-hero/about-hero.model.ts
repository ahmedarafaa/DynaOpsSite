export interface AboutHeroArt {
  // Figma export of the isometric hub with its grid; each language has its own crop of the grid.
  src: string;
  width: number;
  height: number;
}

export interface AboutHeroSegment {
  text: string;
  // Brand-coloured bold names, or plain bold.
  tone?: 'brand' | 'strong';
}

export interface AboutHeroContent {
  // The highlight is the brand-coloured end of the headline.
  title: { lead: string; highlight: string };
  intro: AboutHeroSegment[];
  description: string;
  art: AboutHeroArt;
}

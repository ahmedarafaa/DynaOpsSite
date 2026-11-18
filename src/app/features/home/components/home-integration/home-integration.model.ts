import type { HomeHeadingContent } from '../home-heading/home-heading.model';

export interface HomeIntegrationContent {
  heading: HomeHeadingContent;
  points: string[];
  link: { label: string; href: string };
  // Isometric module map; the Arabic export carries Arabic labels.
  illustration: { src: string; width: number; height: number; alt: string };
}

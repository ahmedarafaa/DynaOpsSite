import type { HomeHeadingContent } from '../home-heading/home-heading.model';

export interface HomeIndustryCard {
  title: string;
  description: string;
  href: string;
  // Isometric artwork, about 140px tall.
  art: { src: string; width: number; height: number };
}

export interface HomeIndustriesContent {
  heading: HomeHeadingContent;
  previous: string;
  next: string;
  items: HomeIndustryCard[];
}

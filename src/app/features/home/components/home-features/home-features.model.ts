import type { HomeHeadingContent } from '../home-heading/home-heading.model';

export interface HomeFeatureItem {
  title: string;
  points: string[];
  link: { label: string; href: string };
  // App mock-up card with its shadow, exported at 2x and anchored to the panel's bottom-end corner.
  image: { src: string; width: number; height: number };
}

export interface HomeFeaturesContent {
  heading: HomeHeadingContent;
  cta: { label: string; href: string };
  items: HomeFeatureItem[];
}

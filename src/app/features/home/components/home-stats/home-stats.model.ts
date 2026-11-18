export interface HomeStatsTestimonial {
  quote: string;
  name: string;
  role: string;
  // Company logo beside the name, 31-34 x 38.
  logo: { src: string; width: number; height: number };
}

export interface HomeStat {
  // Root-relative 30px icon, already in the brand colour.
  icon: string;
  // "Up to", shown before the figure.
  prefix?: string;
  value: string;
  // Line breaks follow the Figma frame.
  caption: string;
}

export interface HomeStatsContent {
  // The emphasis is the brand-coloured word; line breaks follow the Figma frame.
  title: { before: string; emphasis: string; after: string };
  description: string;
  link: { label: string; href: string };
  testimonials: HomeStatsTestimonial[];
  testimonialsLabel: string;
  // Large figure on the brand card.
  highlight: HomeStat;
  stats: HomeStat[];
}

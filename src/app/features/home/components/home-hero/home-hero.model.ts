export interface HomeHeroImage {
  src: string;
  width: number;
  height: number;
}

export interface HomeHeroContent {
  badge: { icon: string; label: string };
  // Rendered as two lines: the lead, then the product name.
  titleLead: string;
  titleProduct: string;
  description: string;
  cta: { label: string; href: string };
  // Localized folder of the animated route map's text-bearing layers (tablet and up).
  mapDir: string;
  // Portrait crop of the same scene for phones.
  mapMobile: HomeHeroImage;
  mapAlt: string;
}

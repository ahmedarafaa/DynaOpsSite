export interface FooterLink {
  label: string;
  href: string;
  // Opens in a new tab, like every other link to the demo page.
  newTab?: boolean;
}

export interface FooterColumn {
  title: string;
  // Each inner list is a sub-column from md up; they stack into one list on mobile.
  lists: FooterLink[][];
}

export interface FooterSocial {
  id: string;
  icon: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterContent {
  logoAlt: string;
  columns: { features: FooterColumn; industries: FooterColumn; company: FooterColumn };
  social: FooterSocial[];
  tagline: string;
  copyright: (year: number) => string;
}

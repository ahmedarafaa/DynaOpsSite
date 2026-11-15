export interface AboutHeroLogo {
  // 2x export of the Figma logo pill, 267x60.
  src: string;
  alt: string;
}

export interface AboutHeroContent {
  product: AboutHeroLogo;
  // Text between the two pills: "is built by".
  link: string;
  company: AboutHeroLogo;
  title: string;
  // Line breaks follow the Figma frame.
  description: string;
}

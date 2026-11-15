export interface AboutExperienceArea {
  // Root-relative brand icon.
  icon: string;
  label: string;
}

export interface AboutExperienceCountry {
  name: string;
  // Root-relative flag, 21.5x16.
  flag: string;
  // 4x export of the whole 355x416 map region the window pans over, with this country highlighted.
  map: string;
}

export interface AboutExperienceContent {
  areasTitle: string;
  areas: AboutExperienceArea[];
  // In Figma's loop order, starting from the frame shown on the page.
  countries: AboutExperienceCountry[];
  // Arrow under the map tooltip.
  pinArrow: string;
  title: string;
  paragraphs: string[];
  // Semibold phrases inside the paragraphs.
  emphases: string[];
}

// A paragraph split around its semibold phrases.
export interface AboutExperienceSegment {
  text: string;
  strong: boolean;
}

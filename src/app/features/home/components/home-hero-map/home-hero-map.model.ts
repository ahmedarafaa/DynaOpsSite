// One image on the 1440x637 Figma stage: render-bounds position and width in design px, file size for the attributes.
export interface HeroMapLayer {
  file: string;
  x: number;
  y: number;
  w: number;
  width: number;
  height: number;
  // Shared art lives in /images/home/hero-map; text-bearing art in the localized folder.
  localized?: boolean;
  reveal?: HeroMapReveal;
}

// Fade (and optional rise) within the looping timeline, as fractions of its duration.
export interface HeroMapReveal {
  start: number;
  end: number;
  rise?: number;
}

export interface AboutWhyArt {
  // 2x export of the illustration; each language has its own file because the UI text is translated.
  src: string;
  width: number;
  height: number;
}

export interface AboutWhyChallenge {
  // Root-relative brand icon, 24px.
  icon: string;
  title: string;
  description: string;
  art: AboutWhyArt;
}

export interface AboutWhySolution {
  // Root-relative brand icon, 24px.
  icon: string;
  label: string;
  // Line breaks follow the Figma frame.
  title: string;
  description: string;
  // 2x export of the 484x259 panel, background included and 10px cropped off each side; it carries no text.
  art: AboutWhyArt;
}

export interface AboutWhyContent {
  title: string;
  challenges: AboutWhyChallenge[];
  // Arrow between the challenges and the solution.
  arrow: string;
  solution: AboutWhySolution;
}

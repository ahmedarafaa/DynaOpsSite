export interface AboutPortfolioImage {
  src: string;
  width: number;
  height: number;
}

// Each product's art keeps its own gradient, from the brand ramp or the ZATCA tokens.
export type AboutPortfolioTone = 'dynaops' | 'zatca' | 'restricto';

export interface AboutPortfolioProduct {
  name: string;
  description: string;
  tone: AboutPortfolioTone;
  // Large logo mark shown while the card is collapsed.
  mark: AboutPortfolioImage;
  // Logo lockup shown while the card is open: one image, or a mark beside a wordmark.
  lockup: AboutPortfolioImage[];
  // Brand tagline under the lockup's wordmark; it stays in English in both languages, as in Figma.
  tagline?: string;
}

export interface AboutPortfolioContent {
  // Small logos in the pill above the title.
  logos: AboutPortfolioImage[];
  title: string;
  paragraphs: string[];
  products: AboutPortfolioProduct[];
}

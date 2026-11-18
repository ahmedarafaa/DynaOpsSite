export interface HomeHeadingContent {
  // Root-relative icon path, already in the brand colour.
  icon: string;
  eyebrow: string;
  // Line breaks follow the Figma frame.
  title: string;
}

// `display` is the 44px section title; `compact` stays at 28px from tablet up (the Features title).
export type HomeHeadingSize = 'display' | 'compact';

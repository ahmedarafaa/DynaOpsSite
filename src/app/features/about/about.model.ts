import type { CtaContent } from '../../shared/ui/cta-container/cta-container.model';
import type { AboutDynamicsContent } from './components/about-dynamics/about-dynamics.model';
import type { AboutExperienceContent } from './components/about-experience/about-experience.model';
import type { AboutHeroContent } from './components/about-hero/about-hero.model';
import type { AboutPortfolioContent } from './components/about-portfolio/about-portfolio.model';
import type { AboutWhyContent } from './components/about-why/about-why.model';

// Copy and artwork of each section of the About page; its title and description live in about-seo.ts.
export interface AboutContent {
  hero: AboutHeroContent;
  why: AboutWhyContent;
  dynamics: AboutDynamicsContent;
  portfolio: AboutPortfolioContent;
  experience: AboutExperienceContent;
  // Rendered at the top of the footer, with the device photo beside the copy.
  footerCta: CtaContent;
}

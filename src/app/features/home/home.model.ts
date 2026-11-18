import type { CtaContent } from '../../shared/ui/cta-container/cta-container.model';
import type { HomeFaqContent } from './components/home-faq/home-faq.model';
import type { HomeFeaturesContent } from './components/home-features/home-features.model';
import type { HomeHeroContent } from './components/home-hero/home-hero.model';
import type { HomeIndustriesContent } from './components/home-industries/home-industries.model';
import type { HomeIntegrationContent } from './components/home-integration/home-integration.model';
import type { HomeStatsContent } from './components/home-stats/home-stats.model';

// Copy and artwork of each section of the home page; its title and description live in home-seo.ts.
export interface HomeContent {
  hero: HomeHeroContent;
  stats: HomeStatsContent;
  features: HomeFeaturesContent;
  integration: HomeIntegrationContent;
  industries: HomeIndustriesContent;
  faq: HomeFaqContent;
  // Rendered at the top of the footer, with the tablet photo beside the copy.
  footerCta: CtaContent;
}

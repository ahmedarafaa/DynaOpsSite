import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../core/i18n/language';
import { faqSchema, softwareSchema, websiteSchema } from '../../core/seo/schemas';
import { StructuredDataService } from '../../core/seo/structured-data';
import { FooterCta } from '../../layout/footer/footer-cta.directive';
import { Button } from '../../shared/ui/button/button';
import { CtaContainer } from '../../shared/ui/cta-container/cta-container';
import { HomeFaq } from './components/home-faq/home-faq';
import { HomeFeatures } from './components/home-features/home-features';
import { HomeHero } from './components/home-hero/home-hero';
import { HomeIndustries } from './components/home-industries/home-industries';
import { HomeIntegration } from './components/home-integration/home-integration';
import { HomeStats } from './components/home-stats/home-stats';
import { HOME_CONTENT } from './home-content';
import { HOME_SEO } from './home-seo';

// Landing page: hero map, headline figures, features, ERP integration, industries, FAQ, footer CTA.
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    HomeHero,
    HomeStats,
    HomeFeatures,
    HomeIntegration,
    HomeIndustries,
    HomeFaq,
    FooterCta,
    CtaContainer,
    Button,
  ],
  templateUrl: './home.html',
  // Figma stacks the sections 24 / 48 / 64px apart (phone / tablet / desktop), and as far again above the footer.
  host: { class: 'flex flex-col gap-6 pb-6 md:gap-12 md:pb-12 xl:gap-16 xl:pb-16' },
})
export class Home {
  protected readonly content = HOME_CONTENT;

  constructor() {
    const structuredData = inject(StructuredDataService);
    // Only the first FAQ tab is in the server HTML, so only its questions are marked up.
    structuredData.set('page', [
      websiteSchema(),
      softwareSchema(HOME_SEO.description, inject(LanguageService).lang),
      faqSchema(this.content.faq.categories[0].items),
    ]);
    inject(DestroyRef).onDestroy(() => structuredData.remove('page'));
  }
}

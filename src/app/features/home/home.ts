import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}

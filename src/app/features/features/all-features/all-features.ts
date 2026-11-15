import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterCta } from '../../../layout/footer/footer-cta.directive';
import { Button } from '../../../shared/ui/button/button';
import { CtaContainer } from '../../../shared/ui/cta-container/cta-container';
import { ErpIntegration } from '../../../shared/ui/erp-integration/erp-integration';
import { ALL_FEATURES_CONTENT } from './all-features-content';
import { AllFeaturesGroup } from './components/all-features-group/all-features-group';
import { AllFeaturesHero } from './components/all-features-hero/all-features-hero';

// Overview of every feature: hero carousel, all grouped feature cards, ERP integration and the footer CTA.
@Component({
  selector: 'app-all-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    AllFeaturesHero,
    AllFeaturesGroup,
    ErpIntegration,
    FooterCta,
    CtaContainer,
    Button,
  ],
  templateUrl: './all-features.html',
  // Figma stacks the sections 24 / 48 / 64px apart (phone / tablet / desktop), and as far again above the footer.
  host: { class: 'flex flex-col gap-6 pb-6 md:gap-12 md:pb-12 xl:gap-16 xl:pb-16' },
})
export class AllFeatures {
  protected readonly content = ALL_FEATURES_CONTENT;
}

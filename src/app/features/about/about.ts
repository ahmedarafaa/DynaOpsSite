import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterCta } from '../../layout/footer/footer-cta.directive';
import { Button } from '../../shared/ui/button/button';
import { CtaContainer } from '../../shared/ui/cta-container/cta-container';
import { ABOUT_CONTENT } from './about-content';
import { AboutDynamics } from './components/about-dynamics/about-dynamics';
import { AboutExperience } from './components/about-experience/about-experience';
import { AboutHero } from './components/about-hero/about-hero';
import { AboutPortfolio } from './components/about-portfolio/about-portfolio';
import { AboutWhy } from './components/about-why/about-why';

// The company behind DynaOps: hero, why it exists, its Dynamics roots, the product portfolio, the team's experience, footer CTA.
@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    AboutHero,
    AboutWhy,
    AboutDynamics,
    AboutPortfolio,
    AboutExperience,
    FooterCta,
    CtaContainer,
    Button,
  ],
  templateUrl: './about.html',
  // Figma stacks the sections 24 / 48 / 64px apart (phone / tablet / desktop), and as far again above the footer.
  host: { class: 'flex flex-col gap-6 pb-6 md:gap-12 md:pb-12 xl:gap-16 xl:pb-16' },
})
export class About {
  protected readonly content = ABOUT_CONTENT;
}

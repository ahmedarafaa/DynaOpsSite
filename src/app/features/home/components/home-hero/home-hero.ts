import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';
import { HomeHeroMap } from '../home-hero-map/home-hero-map';
import type { HomeHeroContent } from './home-hero.model';

// Opener of the home page: badge, product title and demo button over the field-team route map.
@Component({
  selector: 'app-home-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, Button, HomeHeroMap],
  templateUrl: './home-hero.html',
  // Pulled up under the sticky header (76px, 80px from xl) so the gradient shows through it, as in Figma.
  host: {
    class:
      'relative isolate -mt-19 block overflow-hidden rounded-b-xl bg-linear-30/srgb from-transparent to-brand-500/20 pt-19 xl:-mt-20 xl:pt-20',
  },
})
export class HomeHero {
  readonly content = input.required<HomeHeroContent>();
}

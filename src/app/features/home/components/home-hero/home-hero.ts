import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HERO_MOBILE_WIDTHS, responsiveSrcset } from '../../../../shared/util/responsive-srcset';
import { Button } from '../../../../shared/ui/button/button';
import { EMPTY_IMAGE, HERO_MAP_MEDIA, HomeHeroMap } from '../home-hero-map/home-hero-map';
import type { HomeHeroContent } from './home-hero.model';

// Opener of the home page: badge, product title and demo button over the field-team route map.
@Component({
  selector: 'app-home-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, HomeHeroMap],
  templateUrl: './home-hero.html',
  // Pulled up under the sticky header (76px, 80px from xl) so the gradient shows through it, as in Figma.
  host: {
    class:
      'relative isolate -mt-19 block overflow-hidden rounded-b-xl bg-linear-30/srgb from-transparent to-brand-500/20 pt-19 xl:-mt-20 xl:pt-20',
  },
})
export class HomeHero {
  readonly content = input.required<HomeHeroContent>();

  protected readonly mobileMedia = `not all and ${HERO_MAP_MEDIA}`;
  protected readonly placeholder = EMPTY_IMAGE;
  // The widest copy is the full size re-encoded smaller, so the original is left out.
  protected readonly mobileSrcset = computed(() =>
    responsiveSrcset(this.content().mapMobile.src, HERO_MOBILE_WIDTHS),
  );
}

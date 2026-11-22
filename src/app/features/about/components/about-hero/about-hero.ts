import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { AboutHeroContent } from './about-hero.model';

// Opener of the About page: headline and company statement beside the isometric hub illustration.
@Component({
  selector: 'app-about-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './about-hero.html',
  styleUrl: './about-hero.css',
  host: {
    class:
      'block overflow-hidden rounded-b-xl bg-linear-to-b/srgb from-transparent to-brand-500/20',
  },
})
export class AboutHero {
  readonly content = input.required<AboutHeroContent>();
}

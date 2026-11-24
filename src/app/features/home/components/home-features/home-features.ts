import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { HOME_FEATURE_WIDTHS, responsiveSrcset } from '../../../../shared/util/responsive-srcset';
import { Button } from '../../../../shared/ui/button/button';
import { HomeHeading } from '../home-heading/home-heading';
import type { HomeFeatureItem, HomeFeaturesContent } from './home-features.model';

// Tailwind's xl breakpoint, where the cards become an accordion.
const ACCORDION_MEDIA = '(min-width: 80rem)';

// From xl one feature is open at a time beside its mock-up; below xl every feature is a card.
@Component({
  selector: 'app-home-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, HomeHeading],
  templateUrl: './home-features.html',
  styleUrl: './home-features.css',
  host: { class: 'block bg-canvas md:bg-transparent xl:bg-canvas' },
})
export class HomeFeatures {
  readonly content = input.required<HomeFeaturesContent>();

  protected readonly active = signal(0);
  // CSS switches the layout; this only adds the toggle buttons and `inert`, so the server render needs no viewport.
  protected readonly accordion = signal(false);

  protected srcset({ src, width }: HomeFeatureItem['image']): string {
    return responsiveSrcset(src, HOME_FEATURE_WIDTHS, width);
  }

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const query = matchMedia(ACCORDION_MEDIA);
      const sync = () => this.accordion.set(query.matches);
      sync();
      query.addEventListener('change', sync);
      destroyRef.onDestroy(() => query.removeEventListener('change', sync));
    });
  }
}

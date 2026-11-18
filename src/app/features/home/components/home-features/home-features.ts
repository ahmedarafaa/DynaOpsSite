import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '../../../../shared/ui/button/button';
import { HomeHeading } from '../home-heading/home-heading';
import type { HomeFeaturesContent } from './home-features.model';

// From xl one feature is open at a time beside its mock-up; below xl every feature is a card.
@Component({
  selector: 'app-home-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink, Button, HomeHeading],
  templateUrl: './home-features.html',
  host: { class: 'block bg-canvas md:bg-transparent xl:bg-canvas' },
})
export class HomeFeatures {
  readonly content = input.required<HomeFeaturesContent>();

  protected readonly active = signal(0);
}

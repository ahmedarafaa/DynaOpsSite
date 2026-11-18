import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HomeHeading } from '../home-heading/home-heading';
import type { HomeIntegrationContent } from './home-integration.model';

// Rounded teal-tinted panel: module illustration over a diagonal grid, then the integration promises.
@Component({
  selector: 'app-home-integration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, RouterLink, HomeHeading],
  templateUrl: './home-integration.html',
  host: { class: 'block' },
})
export class HomeIntegration {
  readonly content = input.required<HomeIntegrationContent>();
}

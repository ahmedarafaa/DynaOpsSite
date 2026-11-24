import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { densitySrcset } from '../../../../shared/util/responsive-srcset';
import type { FeatureShowcaseContent } from './feature-showcase.model';

// Page-specific section of a feature page: copy beside a product illustration from xl, stacked and centred below.
@Component({
  selector: 'app-feature-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feature-showcase.html',
  host: { class: 'block' },
})
export class FeatureShowcase {
  readonly content = input.required<FeatureShowcaseContent>();

  protected readonly srcset = densitySrcset;
}

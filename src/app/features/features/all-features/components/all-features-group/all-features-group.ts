import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { FeatureCard } from '../../../../../shared/ui/feature-card/feature-card';
import type { AllFeaturesGroupContent } from './all-features-group.model';

// One feature group, separated from the next by a hairline and 40 / 48px either side (phone / tablet and up).
// From xl the intro sits beside its two-column cards.
@Component({
  selector: 'app-all-features-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureCard],
  templateUrl: './all-features-group.html',
  host: {
    class:
      'flex flex-col gap-6 border-t border-line py-10 first:border-t-0 first:pt-0 md:py-12 xl:flex-row xl:gap-12',
  },
})
export class AllFeaturesGroup {
  readonly content = input.required<AllFeaturesGroupContent>();
}

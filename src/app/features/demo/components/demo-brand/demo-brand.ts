import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import type { DemoBrandContent } from '../../demo.model';

// Brand side of the Book a Demo page: logo, headline and the feature-search mock fading out at the bottom.
@Component({
  selector: 'app-demo-brand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './demo-brand.html',
  styleUrl: './demo-brand.css',
  host: {
    class:
      'flex flex-col gap-7 overflow-hidden bg-linear-to-b/srgb from-brand-500 to-brand-300 ps-5 pt-5 md:gap-10 md:ps-10 md:pt-8 lg:min-h-0 lg:gap-14 lg:ps-12 lg:pt-14 xl:ps-20',
  },
})
export class DemoBrand {
  readonly content = input.required<DemoBrandContent>();
}

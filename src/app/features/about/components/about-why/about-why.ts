import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { AboutWhyContent } from './about-why.model';

// The two challenges side by side from xl, an arrow, then the solution card; one column below.
@Component({
  selector: 'app-about-why',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-why.html',
  styleUrl: './about-why.css',
  host: { class: 'block' },
})
export class AboutWhy {
  readonly content = input.required<AboutWhyContent>();
}

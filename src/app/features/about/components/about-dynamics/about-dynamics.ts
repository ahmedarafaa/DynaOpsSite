import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ErpStack } from '../../../../shared/ui/erp-stack/erp-stack';
import type { AboutDynamicsContent } from './about-dynamics.model';

// "Built Around Microsoft Dynamics": copy beside the animated tier stack from xl, stack first below.
@Component({
  selector: 'app-about-dynamics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ErpStack],
  templateUrl: './about-dynamics.html',
  host: {
    class:
      'block overflow-hidden rounded-xl bg-linear-15/srgb from-transparent from-23% to-accent/10 to-77%',
  },
})
export class AboutDynamics {
  readonly content = input.required<AboutDynamicsContent>();

  protected readonly paragraphParts = computed(() => {
    const { paragraphs, emphasis } = this.content();
    return paragraphs.map((paragraph) => {
      const index = paragraph.indexOf(emphasis);
      return index < 0
        ? { before: paragraph, emphasis: '', after: '' }
        : {
            before: paragraph.slice(0, index),
            emphasis,
            after: paragraph.slice(index + emphasis.length),
          };
    });
  });
}

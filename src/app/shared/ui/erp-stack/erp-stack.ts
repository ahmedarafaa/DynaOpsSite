import { NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { ErpStackContent } from './erp-stack.model';

// DynaOps-on-Dynamics artwork: the DynaOps, integration and Dynamics 365 tiers spread out, then label themselves one by one, on a loop.
@Component({
  selector: 'app-erp-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './erp-stack.html',
  styleUrl: './erp-stack.css',
  host: { class: 'block' },
})
export class ErpStack {
  readonly content = input.required<ErpStackContent>();
  // Preload the tiles when the stack is a page's hero image.
  readonly priority = input(false, { transform: booleanAttribute });
}

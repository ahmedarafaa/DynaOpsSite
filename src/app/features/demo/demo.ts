import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DemoBrand } from './components/demo-brand/demo-brand';
import { DemoForm } from './components/demo-form/demo-form';
import { DEMO_CONTENT } from './demo-content';

// Full-screen page without the site header and footer: brand panel beside the request form from lg (one screen high, no page scroll), stacked below.
@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DemoBrand, DemoForm],
  template: `
    <app-demo-brand class="lg:order-last" [content]="content.brand" />
    <app-demo-form [content]="content.form" />
  `,
  host: { class: 'grid min-h-dvh bg-surface max-lg:content-start lg:h-dvh lg:grid-cols-2' },
})
export class Demo {
  protected readonly content = DEMO_CONTENT;
}

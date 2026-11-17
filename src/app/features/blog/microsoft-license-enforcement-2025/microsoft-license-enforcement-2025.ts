import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BlogArticlePage } from '../components/blog-article-page/blog-article-page';
import { LICENSE_ENFORCEMENT_2025_CONTENT } from './microsoft-license-enforcement-2025-content';

@Component({
  selector: 'app-microsoft-license-enforcement-2025',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BlogArticlePage],
  template: `<app-blog-article-page [content]="content" />`,
  host: { class: 'block' },
})
export class MicrosoftLicenseEnforcement2025 {
  protected readonly content = LICENSE_ENFORCEMENT_2025_CONTENT;
}

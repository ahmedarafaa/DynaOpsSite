import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { BlogArticleInline, BlogArticleSection } from './blog-article-body.model';

// Article text: titled sections of paragraphs, lists, tables and quotes in a 750px column.
@Component({
  selector: 'app-blog-article-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './blog-article-body.html',
  host: { class: 'block' },
})
export class BlogArticleBody {
  readonly sections = input.required<BlogArticleSection[]>();

  protected text(run: BlogArticleInline): string {
    return typeof run === 'string' ? run : 'strong' in run ? run.strong : run.muted;
  }

  protected kind(run: BlogArticleInline): 'plain' | 'strong' | 'muted' {
    return typeof run === 'string' ? 'plain' : 'strong' in run ? 'strong' : 'muted';
  }
}

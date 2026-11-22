import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { HOME_LABEL, NAV_LABELS } from '../../layout/header/nav-labels';
import { langFromLocale } from '../i18n/language';
import { breadcrumbSchema } from './schemas';
import { SeoService } from './seo';
import type { RouteSeo } from './seo.model';
import { StructuredDataService } from './structured-data';
import type { Breadcrumb } from './structured-data.model';

// Applies each route's `title`, `data.seo` and breadcrumb trail on every navigation, including the server render.
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);
  private readonly structuredData = inject(StructuredDataService);
  private readonly lang = langFromLocale(inject(LOCALE_ID));

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const routeSeo = route.data['seo'] as RouteSeo | undefined;
    const title = this.buildTitle(snapshot);

    if (routeSeo) {
      this.seo.update({ ...routeSeo, title: routeSeo.title ?? title ?? '' });
    } else if (title) {
      this.seo.setTitle(title);
    }
    this.setBreadcrumbs(snapshot.url, title, routeSeo?.robots);
  }

  // Home > each parent that has a page > this page. Home itself and noindex pages get none.
  private setBreadcrumbs(url: string, title: string | undefined, robots: string | undefined): void {
    const path = url.split(/[?#]/)[0];
    const segments = path.split('/').filter(Boolean);
    if (!segments.length || robots?.includes('noindex')) {
      this.structuredData.remove('breadcrumb');
      return;
    }
    const trail: Breadcrumb[] = [{ name: HOME_LABEL, path: '/' }];
    segments.forEach((_, i) => {
      const step = `/${segments.slice(0, i + 1).join('/')}`;
      const name = NAV_LABELS.get(step) ?? (step === path ? title : undefined);
      if (name) {
        trail.push({ name, path: step });
      }
    });
    this.structuredData.set('breadcrumb', [breadcrumbSchema(trail, this.lang)]);
  }
}

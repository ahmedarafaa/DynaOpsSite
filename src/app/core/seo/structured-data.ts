import { DOCUMENT, inject, Injectable } from '@angular/core';

import type { JsonLd } from './structured-data.model';

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);

  /** Inserts or replaces the JSON-LD block stored under `key`, so navigations never pile blocks up. */
  set(key: string, graph: JsonLd[]): void {
    const id = `ld-${key}`;
    let script = this.document.getElementById(id);
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    const payload = { '@context': 'https://schema.org', '@graph': graph };
    // Escaping '<' keeps page copy from ever closing the script element.
    script.textContent = JSON.stringify(payload).replace(/</g, '\u003c');
  }

  remove(key: string): void {
    this.document.getElementById(`ld-${key}`)?.remove();
  }
}

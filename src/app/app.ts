import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LanguageService } from './core/i18n/language';
import { SeoService } from './core/seo/seo';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly language = inject(LanguageService);
  private readonly seo = inject(SeoService);

  // Book a Demo fills the screen and carries its own logo, so it renders without header and footer.
  protected readonly bare = computed(() => this.language.path() === '/demo');

  constructor() {
    effect(() => this.seo.setLocaleLinks(this.language.path(), this.language.lang));
  }
}

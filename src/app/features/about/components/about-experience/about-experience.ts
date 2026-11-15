import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import type { AboutExperienceContent, AboutExperienceSegment } from './about-experience.model';

// "Experience Behind the Product": areas of work and the country map beside the copy from xl, art first below.
@Component({
  selector: 'app-about-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-experience.html',
  styleUrl: './about-experience.css',
  host: { class: 'block bg-linear-to-t/srgb from-brand-500/20 to-transparent' },
})
export class AboutExperience {
  readonly content = input.required<AboutExperienceContent>();

  private readonly names = viewChild.required<ElementRef<HTMLElement>>('names');

  constructor() {
    // The map tooltip eases between the country names' widths, which only the loaded font can tell.
    afterNextRender(() => {
      void document.fonts.ready.then(() => {
        const names = this.names().nativeElement;
        [...names.children].forEach((name, i) =>
          names.style.setProperty(`--name-${i}`, `${(name as HTMLElement).offsetWidth}px`),
        );
      });
    });
  }

  protected readonly paragraphs = computed(() => {
    const { paragraphs, emphases } = this.content();
    return paragraphs.map((paragraph) => splitEmphases(paragraph, emphases));
  });
}

// Splits a paragraph at each listed phrase it contains, in reading order.
function splitEmphases(text: string, emphases: string[]): AboutExperienceSegment[] {
  const segments: AboutExperienceSegment[] = [];
  let rest = text;
  while (rest) {
    const hits = emphases
      .map((phrase) => ({ phrase, index: rest.indexOf(phrase) }))
      .filter((hit) => hit.index >= 0)
      .sort((a, b) => a.index - b.index);
    const next = hits[0];
    if (!next) {
      segments.push({ text: rest, strong: false });
      break;
    }
    if (next.index > 0) segments.push({ text: rest.slice(0, next.index), strong: false });
    segments.push({ text: next.phrase, strong: true });
    rest = rest.slice(next.index + next.phrase.length);
  }
  return segments;
}

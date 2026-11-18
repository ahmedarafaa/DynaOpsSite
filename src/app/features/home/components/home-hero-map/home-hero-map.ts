import { NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';

import type { Lang } from '../../../../core/i18n/language.model';
import { LanguageService } from '../../../../core/i18n/language';
import type { HeroMapLayer, HeroMapReveal } from './home-hero-map.model';

// Figma timeline (EN 1440 hero, nodes 10431:158240), slowed from 4.2s to 6.3s; played once and held on its last frame.
// Reveals are fractions of it, so stops still appear as the route reaches them; all share one ease-out curve.
const TIMELINE_MS = 6300;
const EASE = 'cubic-bezier(0.3, 0, 0.2, 1)';
const ROUTE: HeroMapReveal = { start: 0.03571, end: 0.7619 };
const ROUTE_EASE = 'cubic-bezier(0.35, 0, 0.65, 1)';

const STOP_1: HeroMapReveal = { start: 0.30952, end: 0.45238 };
const STOP_2: HeroMapReveal = { start: 0.46429, end: 0.60714 };
const STOP_3: HeroMapReveal = { start: 0.66667, end: 0.80952 };

// Exports are 2x rasters (render bounds, shadows included) or 1x SVGs; x/y are Figma render-bound offsets on the stage.
const raster = (
  file: string,
  x: number,
  y: number,
  width: number,
  height: number,
  reveal?: HeroMapReveal,
): HeroMapLayer => ({ file, x, y, w: width / 2, width, height, reveal });
const vector = (
  file: string,
  x: number,
  y: number,
  width: number,
  height: number,
  reveal?: HeroMapReveal,
): HeroMapLayer => ({ file, x, y, w: width, width, height, reveal });

// Text-free art, identical in both languages, in Figma paint order.
const BACK: HeroMapLayer[] = [
  raster('background.webp', 0, 0, 2880, 1274, { start: 0, end: 0.21429 }),
];

// The truck has no Figma motion; it arrives with the driver card beside it.
const DRIVER: HeroMapReveal = { start: 0.02381, end: 0.22619, rise: 9 };

const MARKERS: HeroMapLayer[] = [
  vector('marker-ring.svg', 288, 394, 48, 48, STOP_1),
  vector('marker-ring.svg', 615, 419, 48, 48, STOP_2),
  vector('marker-ring.svg', 1180, 118, 48, 48, STOP_3),
  vector('marker-1.svg', 296, 401.5, 32, 31, STOP_1),
  vector('marker-2.svg', 623, 427.5, 32, 31, STOP_2),
  vector('marker-3.svg', 1188.1, 126.5, 32, 31, STOP_3),
  vector('cursor.svg', 214.7, 126.2, 32, 32, { start: 0.02381, end: 0.16667 }),
  raster('truck.webp', 60, 25.5, 152, 144, DRIVER),
];

// Panel and tooltips carry text, so their exports (and render bounds) differ per language.
const CARD_1: HeroMapReveal = { start: 0.29762, end: 0.5, rise: 9 };
const TIME_1: HeroMapReveal = { start: 0.33333, end: 0.5119, rise: 6 };
const CARD_2: HeroMapReveal = { start: 0.45238, end: 0.65476, rise: 9 };
const TIME_2: HeroMapReveal = { start: 0.4881, end: 0.66667, rise: 6 };
const CARD_3: HeroMapReveal = { start: 0.65476, end: 0.85714, rise: 9 };
const TIME_3: HeroMapReveal = { start: 0.69048, end: 0.86905, rise: 6 };
const PANEL: HeroMapReveal = { start: 0.72619, end: 0.96429, rise: 12 };

const TEXT_LAYERS: Record<Lang, HeroMapLayer[]> = {
  en: [
    raster('panel.webp', 976, 267.5, 856, 738, PANEL),
    raster('stop-3.webp', 1067, 41.5, 560, 216, CARD_3),
    raster('stop-3-time.webp', 1226.3, 125.6, 210, 82, TIME_3),
    raster('stop-2-time.webp', 663.3, 426.6, 210, 82, TIME_2),
    raster('driver.webp', 120, 49.5, 450, 216, DRIVER),
    raster('stop-1-time.webp', 346.3, 402.6, 208, 82, TIME_1),
    raster('stop-1.webp', 162, 316.5, 608, 216, CARD_1),
    raster('stop-2.webp', 497, 342.5, 574, 216, CARD_2),
  ],
  ar: [
    raster('panel.webp', 976, 267.5, 856, 786, PANEL),
    raster('stop-3.webp', 1080, 36, 502, 216, CARD_3),
    raster('stop-3-time.webp', 1224.3, 125.1, 226, 82, TIME_3),
    raster('stop-2-time.webp', 664.3, 428.1, 226, 82, TIME_2),
    raster('driver.webp', 140, 49.5, 366, 216, DRIVER),
    raster('stop-1-time.webp', 332.3, 401.1, 222, 82, TIME_1),
    raster('stop-1.webp', 166, 314, 586, 216, CARD_1),
    raster('stop-2.webp', 486, 341, 620, 216, CARD_2),
  ],
};

// Layer art from Figma, replayed once on its timeline: the route draws itself while stops, tooltips and the users panel appear.
@Component({
  selector: 'app-home-hero-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './home-hero-map.html',
  styleUrl: './home-hero-map.css',
  host: { class: 'block' },
})
export class HomeHeroMap {
  // Localized image folder; shared art always comes from /images/home.
  readonly dir = input.required<string>();
  readonly alt = input.required<string>();

  protected readonly sharedDir = '/images/home/hero-map';
  protected readonly back = BACK;
  protected readonly front = [
    ...MARKERS,
    ...TEXT_LAYERS[inject(LanguageService).lang].map((layer) => ({ ...layer, localized: true })),
  ];

  private readonly layers = viewChildren<ElementRef<HTMLElement>>('layer');
  private readonly route = viewChild.required<ElementRef<SVGPathElement>>('route');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const timing: KeyframeAnimationOptions = { duration: TIMELINE_MS, fill: 'forwards' };
      const all = [...this.back, ...this.front];
      const animations = this.layers().flatMap((ref, i) => {
        const reveal = all[i].reveal;
        return reveal ? [ref.nativeElement.animate(revealFrames(reveal), timing)] : [];
      });
      animations.push(this.route().nativeElement.animate(routeFrames(), timing));
      destroyRef.onDestroy(() => animations.forEach((a) => a.cancel()));
    });
  }

  protected src(layer: HeroMapLayer): string {
    return `${layer.localized ? this.dir() : this.sharedDir}/${layer.file}`;
  }
}

// Hidden until `start`, then fades (and rises) in by `end` and stays there.
function revealFrames({ start, end, rise = 0 }: HeroMapReveal): Keyframe[] {
  const from = { opacity: 0, translate: `0 ${rise}px` };
  return [
    { offset: 0, ...from },
    { offset: start, ...from, easing: EASE },
    { offset: end, opacity: 1, translate: '0 0' },
    { offset: 1, opacity: 1, translate: '0 0' },
  ];
}

// Path trim on a pathLength="1" path, kept hidden while it has no length (Figma's keyframes).
function routeFrames(): Keyframe[] {
  const hidden = { strokeDasharray: '0 1', visibility: 'hidden' };
  return [
    { offset: 0, ...hidden },
    { offset: ROUTE.start, ...hidden, easing: ROUTE_EASE },
    { offset: ROUTE.end, strokeDasharray: '1 1', visibility: 'visible' },
    { offset: 1, strokeDasharray: '1 1', visibility: 'visible' },
  ];
}

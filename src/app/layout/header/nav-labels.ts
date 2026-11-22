import { HEADER_CONTENT } from './header-content';

// Short page names by route, reused as breadcrumb names so they match the menu.
export const HOME_LABEL = $localize`:@@header.home:Home`;

const { tabs, panels, cta } = HEADER_CONTENT;
const featuresPanel = panels['features'];

const links = [
  ...tabs.map(({ label, href }) => ({ label, href })),
  ...Object.values(panels).flatMap(({ items, featured }) =>
    [...items, ...(featured ? [featured] : [])].map(({ title, href }) => ({ label: title, href })),
  ),
  // The hub is named by its tab; its "View All Features" link label reads as an action.
  { label: tabs.find(({ id }) => id === 'features')?.label, href: featuresPanel.viewAll?.href },
  cta,
];

export const NAV_LABELS: ReadonlyMap<string, string> = new Map(
  links.flatMap(({ label, href }) => (label && href ? [[href, label] as const] : [])),
);

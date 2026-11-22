import { localeUrl } from '../i18n/language';
import type { Lang } from '../i18n/language.model';
import { SITE_CONFIG } from './site-config';
import type {
  ArticleSchemaInput,
  Breadcrumb,
  FaqSchemaItem,
  JsonLd,
} from './structured-data.model';

// Same ids as the Organization block in src/index.html, so every page points at one entity.
const ORGANIZATION = { '@id': `${SITE_CONFIG.origin}/#organization` };
const WEBSITE_ID = `${SITE_CONFIG.origin}/#website`;

export function pageUrl(path: string, lang: Lang): string {
  return SITE_CONFIG.origin + localeUrl(path, lang);
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_CONFIG.origin}/`,
    name: SITE_CONFIG.name,
    publisher: ORGANIZATION,
    inLanguage: ['en', 'ar'],
  };
}

// No offers or ratings: the site shows neither, and markup must match what is visible.
export function softwareSchema(description: string, lang: Lang): JsonLd {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_CONFIG.origin}/#software`,
    name: SITE_CONFIG.name,
    description,
    applicationCategory: 'BusinessApplication',
    url: pageUrl('/', lang),
    publisher: ORGANIZATION,
  };
}

export function faqSchema(items: FaqSchemaItem[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

// The last step is the current page, which carries no URL.
export function breadcrumbSchema(trail: Breadcrumb[], lang: Lang): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      ...(i < trail.length - 1 ? { item: pageUrl(path, lang) } : {}),
    })),
  };
}

export function articleSchema(article: ArticleSchemaInput, lang: Lang): JsonLd {
  const url = pageUrl(article.path, lang);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    image: [SITE_CONFIG.origin + article.image],
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: ORGANIZATION,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntityOfPage: url,
    inLanguage: lang,
  };
}

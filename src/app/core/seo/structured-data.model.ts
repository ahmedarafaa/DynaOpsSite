export type JsonLd = Record<string, unknown>;

// One step of a breadcrumb trail; `path` is relative to the base href.
export interface Breadcrumb {
  name: string;
  path: string;
}

export interface ArticleSchemaInput {
  path: string;
  title: string;
  description: string;
  // Site-relative path of the cover image.
  image: string;
  author: string;
  // ISO date, e.g. 2026-10-17.
  date: string;
}

export interface FaqSchemaItem {
  question: string;
  answer: string;
}

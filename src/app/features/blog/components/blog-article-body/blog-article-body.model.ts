// A run of text inside a paragraph or table cell; `strong` is bold, `muted` the grey source note.
export type BlogArticleInline = string | { strong: string } | { muted: string };

export interface BlogArticleParagraph {
  kind: 'paragraph';
  content: BlogArticleInline[];
}

export interface BlogArticleList {
  kind: 'list';
  items: string[];
}

// Callout with a bold lead-in, e.g. "Grace period:".
export interface BlogArticleQuote {
  kind: 'quote';
  label: string;
  text: string;
}

export interface BlogArticleTable {
  kind: 'table';
  head: string[];
  // Rows of cells; cells are medium weight, `strong` runs bold.
  rows: BlogArticleInline[][][];
}

export type BlogArticleBlock =
  BlogArticleParagraph | BlogArticleList | BlogArticleQuote | BlogArticleTable;

// Sections sit 48px apart; a section without a title holds a standalone block such as a quote.
export interface BlogArticleSection {
  title?: string;
  blocks: BlogArticleBlock[];
}

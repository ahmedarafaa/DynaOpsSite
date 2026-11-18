import type { HomeHeadingContent } from '../home-heading/home-heading.model';

export interface HomeFaqItem {
  question: string;
  answer: string;
}

export interface HomeFaqCategory {
  id: string;
  label: string;
  items: HomeFaqItem[];
}

export interface HomeFaqContent {
  heading: HomeHeadingContent;
  categoriesLabel: string;
  categories: HomeFaqCategory[];
}

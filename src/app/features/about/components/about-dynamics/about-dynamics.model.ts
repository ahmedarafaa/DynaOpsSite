import type { ErpStackContent } from '../../../../shared/ui/erp-stack/erp-stack.model';

export interface AboutDynamicsContent {
  title: string;
  paragraphs: string[];
  // Semibold phrase inside the paragraphs.
  emphasis: string;
  stack: ErpStackContent;
}

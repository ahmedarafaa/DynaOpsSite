import type { ErpStackImages } from './erp-stack.model';

// Figma's Arabic set keeps the upright logos while the English one lays them flat, so each language has its own tiles.
const dir = $localize`:@@erp-stack.imageDir:/images/integration`;

export const ERP_STACK_IMAGES: ErpStackImages = {
  tileBottom: `${dir}/tile-bottom.svg`,
  glowLower: `${dir}/glow-lower.svg`,
  tileMiddle: `${dir}/tile-middle.svg`,
  glowUpper: `${dir}/glow-upper.svg`,
  tileTop: `${dir}/tile-top.svg`,
  connector: '/images/integration/connector.svg',
};

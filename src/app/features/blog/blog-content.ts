import { CUSTOMER_MANAGEMENT_CONTENT } from '../features/customer-management/customer-management-content';
import type { BlogContent } from './blog.model';

// Copy is English here; src/locale/ar/blog.json carries the Arabic under the same ids.
// The featured cover mirrors its logos in Arabic, so their folder is localized like the copy.
const dir = '/images/blog';
const localizedDir = $localize`:@@blog.imageDir:/images/blog`;

export const BLOG_CONTENT: BlogContent = {
  hero: {
    title: $localize`:@@blog.hero.title:Insights for field sales & Dynamics 365 F&O teams`,
    description: $localize`:@@blog.hero.description:Practical ideas on field execution, ERP integration and sales management from the team building DynaOps.`,
    newLabel: $localize`:@@blog.hero.new:New`,
    featured: {
      title: $localize`:@@blog.post.license-enforcement.title:Microsoft License Enforcement 2025`,
      excerpt: $localize`:@@blog.post.license-enforcement.excerpt:Microsoft License Enforcement 2025 D365FO: Learn about the revamped licensing enforcement starting with in-app warnings on September 1, 2025 and strict access blocks beginning November 1, 2025.`,
      date: '2026-10-17',
      readMinutes: 8,
      image: {
        src: `${dir}/license-enforcement-2025-bg.webp`,
        width: 1130,
        height: 600,
        logo: { src: `${localizedDir}/logos-microsoft-dynamics.svg`, width: 441, height: 65 },
      },
      href: '/blog/microsoft-license-enforcement-2025',
      isNew: true,
      author: {
        name: $localize`:@@blog.author.ahmed-arafa.name:Ahmed Arafa`,
        role: $localize`:@@blog.author.ahmed-arafa.role:CEO of DynaSystems`,
        avatar: `${dir}/author-ahmed-arafa.webp`,
      },
    },
  },
  posts: {
    pageSize: 6,
    loadMore: $localize`:@@blog.posts.loadMore:Load more`,
    posts: [
      {
        title: $localize`:@@blog.post.compliance-handbook.title:The Ultimate Dynamics 365 License-Compliance Handbook (2025 Edition)`,
        excerpt: $localize`:@@blog.post.compliance-handbook.excerpt:This handbook explains Microsoft’s new Dynamics 365 license enforcement and the critical deadline.`,
        date: '2026-10-10',
        readMinutes: 8,
        image: {
          src: `${dir}/license-compliance-handbook-bg.webp`,
          width: 758,
          height: 400,
          logo: { src: `${dir}/logo-dynaops365.svg`, width: 241, height: 64 },
        },
      },
      {
        title: $localize`:@@blog.post.license-validation.title:Your Step-by-Step Guide to Dynamics 365 User License Validation`,
        excerpt: $localize`:@@blog.post.license-validation.excerpt:A major operational shift is underway for businesses using Dynamics 365, as Microsoft begins enforcing user license validation.`,
        date: '2026-10-01',
        readMinutes: 6,
        image: { src: `${dir}/user-license-validation.webp`, width: 758, height: 400 },
      },
      {
        title: $localize`:@@blog.post.grace-period.title:What Happens When the D365 Grace Period Ends?`,
        excerpt: $localize`:@@blog.post.grace-period.excerpt:This guide explains the Dynamics 365 license grace period and the consequences of inaction.`,
        date: '2026-09-24',
        readMinutes: 7,
        image: { src: `${dir}/grace-period-ends.webp`, width: 758, height: 400 },
      },
    ],
  },
  footerCta: {
    title: $localize`:@@blog.cta.title:See DynaOps in action`,
    description: $localize`:@@blog.cta.description:See how DynaOps connects your field sales operation with Microsoft Dynamics 365 Finance & Operations.`,
    button: { label: $localize`:@@blog.cta.button:Book a Demo`, href: '/demo' },
    // Figma uses the feature pages' device photo.
    image: CUSTOMER_MANAGEMENT_CONTENT.footerCta.image,
  },
};

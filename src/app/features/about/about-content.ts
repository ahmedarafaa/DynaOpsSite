import { ERP_STACK_IMAGES } from '../../shared/ui/erp-stack/erp-stack-content';
import type { AboutContent } from './about.model';
import type { AboutHeroSegment } from './components/about-hero/about-hero.model';

// Copy is English here; src/locale/ar/about.json carries the Arabic under the same ids.
// The challenge illustrations and the device photo carry UI text, so their folder is localized like the copy.
const dir = '/images/about-us';
const localizedDir = $localize`:@@about.imageDir:/images/about-us`;
const demo = '/demo';

// Splits one translatable sentence on its marks: [[name]] is a brand-coloured name, **text** is bold.
function segments(text: string): AboutHeroSegment[] {
  return text
    .split(/(\[\[.+?\]\]|\*\*.+?\*\*)/)
    .filter(Boolean)
    .map((part): AboutHeroSegment => {
      if (part.startsWith('[[')) return { text: part.slice(2, -2), tone: 'brand' };
      if (part.startsWith('**')) return { text: part.slice(2, -2), tone: 'strong' };
      return { text: part };
    });
}

export const ABOUT_CONTENT: AboutContent = {
  hero: {
    title: {
      lead: $localize`:@@about.hero.title.lead:Built by People Who Understand`,
      highlight: $localize`:@@about.hero.title.highlight:Microsoft Dynamics F&O`,
    },
    intro: segments(
      $localize`:@@about.hero.intro:[[DynaOps]] is built by [[Dyna Systems]], a software company focused on creating specialized business products and solutions around **Microsoft Dynamics 365 Finance & Operations.**`,
    ),
    description: $localize`:@@about.hero.description:Our experience with Dynamics environments showed us a recurring challenge: powerful ERP processes do not always translate into simple, practical experiences for teams working outside the traditional ERP interface.`,
    art: {
      src: `${localizedDir}/hero-art.svg`,
      width: Number($localize`:@@about.hero.artWidth:947`),
      height: 560,
    },
  },
  why: {
    title: $localize`:@@about.why.title:Why We Built DynaOps`,
    challenges: [
      {
        icon: '/icons/features/location-user-03-brand.svg',
        title: $localize`:@@about.why.field.title:Field sales challenge`,
        description: $localize`:@@about.why.field.description:Field sales teams need to visit customers, capture orders, collect payments, follow routes, manage approvals, and access business information wherever they work.`,
        art: { src: `${localizedDir}/challenge-field.webp`, width: 343, height: 244 },
      },
      {
        icon: '/icons/about-us/database-02-brand.svg',
        title: $localize`:@@about.why.erp.title:D365 F&O challenge`,
        description: $localize`:@@about.why.erp.description:At the same time, companies want Microsoft Dynamics 365 F&O to remain at the center of their operations.`,
        art: { src: `${localizedDir}/challenge-erp.webp`, width: 429, height: 245 },
      },
    ],
    arrow: '/icons/about-us/arrow-down-02-brand.svg',
    solution: {
      icon: '/icons/about-us/artificial-intelligence-08-brand.svg',
      label: $localize`:@@about.why.solution.label:The solution`,
      title: $localize`:@@about.why.solution.title:We built DynaOps365\nto connect these two worlds.`,
      description: $localize`:@@about.why.solution.description:It extends Microsoft Dynamics 365 F&O into field sales through a focused experience for sales representatives and managers, while keeping the ERP as the core business system.`,
      art: { src: `${dir}/solution.webp`, width: 464, height: 259 },
    },
  },
  dynamics: {
    title: $localize`:@@about.dynamics.title:Built Around Microsoft Dynamics`,
    paragraphs: [
      $localize`:@@about.dynamics.paragraph-1:DynaOps was not designed as a standalone SFA platform that happens to connect with Dynamics.`,
      $localize`:@@about.dynamics.paragraph-2:Our background includes hands-on work with Dynamics AX and Dynamics 365 Finance & Operations, integrations, business processes, and enterprise software solutions.`,
      $localize`:@@about.dynamics.paragraph-3:This experience shapes how we design DynaOps and how it fits into the environments our customers already operate.`,
    ],
    emphasis: $localize`:@@about.dynamics.emphasis:Dynamics AX and Dynamics 365 Finance & Operations`,
    stack: {
      images: ERP_STACK_IMAGES,
      labels: [
        {
          title: $localize`:@@about.dynamics.stack.sfa.title:DynaOps SFA`,
          description: $localize`:@@about.dynamics.stack.sfa.description:The features your team uses in the field: customers, orders, inventory, collections and approvals.`,
        },
        {
          title: $localize`:@@about.dynamics.stack.integration.title:Integration`,
          description: $localize`:@@about.dynamics.stack.integration.description:Direct connection through standard Microsoft APIs. No duplicate databases, no manual sync.`,
        },
        {
          title: $localize`:@@about.dynamics.stack.erp.title:Microsoft Dynamics 365 F&O`,
          description: $localize`:@@about.dynamics.stack.erp.description:The foundation of how we think about the product.`,
        },
      ],
    },
  },
  portfolio: {
    logos: [
      { src: '/icons/logo/dynaops365-mark.svg', width: 33, height: 32 },
      { src: `${dir}/zatca-mark.svg`, width: 140, height: 171 },
      { src: `${dir}/restricto-mark.svg`, width: 140, height: 165 },
    ],
    title: $localize`:@@about.portfolio.title:Part of a Growing Software Portfolio`,
    paragraphs: [
      $localize`:@@about.portfolio.paragraph-1:DynaOps is part of a broader portfolio of products and specialized solutions developed by Dyna Systems around real business requirements.`,
      $localize`:@@about.portfolio.paragraph-2:Our goal is not to build software for every problem. We focus on areas where our experience with Microsoft Dynamics 365 F&O and enterprise operations allows us to build something useful and specialized.`,
    ],
    // Product names stay in English in both languages, as in the Figma frames.
    products: [
      {
        name: 'DynaOps365',
        description: $localize`:@@about.portfolio.dynaops.description:Sales Force Automation and business operations connected with Microsoft Dynamics 365 F&O.`,
        tone: 'dynaops',
        mark: { src: '/icons/logo/dynaops365-mark.svg', width: 33, height: 32 },
        lockup: [{ src: `${dir}/dynaops-lockup.svg`, width: 401, height: 97 }],
      },
      {
        name: 'ZATCA Integration Solution',
        description: $localize`:@@about.portfolio.zatca.description:A specialized solution for electronic invoicing and ZATCA integration requirements in Saudi Arabia.`,
        tone: 'zatca',
        mark: { src: `${dir}/zatca-mark.svg`, width: 140, height: 171 },
        lockup: [
          { src: `${dir}/zatca-shield.svg`, width: 73, height: 90 },
          { src: `${dir}/zatca-wordmark.svg`, width: 308, height: 51 },
        ],
      },
      {
        name: 'Restricto',
        description: $localize`:@@about.portfolio.restricto.description:A data access control solution that helps organizations restrict user access to specific records based on defined business rules.`,
        tone: 'restricto',
        mark: { src: `${dir}/restricto-mark.svg`, width: 140, height: 165 },
        lockup: [
          { src: `${dir}/restricto-union.svg`, width: 93, height: 110 },
          { src: `${dir}/restricto-wordmark.svg`, width: 278, height: 44 },
        ],
        tagline: 'Restrict data and actions in minutes.',
      },
    ],
  },
  experience: {
    areasTitle: $localize`:@@about.experience.areas.title:Areas of work`,
    areas: [
      {
        icon: '/images/integration/dynamics-365.svg',
        label: $localize`:@@about.experience.areas.dynamics:Microsoft Dynamics development`,
      },
      {
        icon: '/icons/shared/arrow-data-transfer-horizontal-round-brand.svg',
        label: $localize`:@@about.experience.areas.integrations:enterprise integrations`,
      },
      {
        icon: '/icons/about-us/user-multiple-brand.svg',
        label: $localize`:@@about.experience.areas.hr:Human resources`,
      },
      {
        icon: '/icons/about-us/coins-dollar-brand.svg',
        label: $localize`:@@about.experience.areas.loyalty:Loyalty programs`,
      },
      {
        icon: '/icons/shared/analytics-03-brand.svg',
        label: $localize`:@@about.experience.areas.sales:sales operations`,
      },
      {
        icon: '/icons/about-us/invoice-brand.svg',
        label: $localize`:@@about.experience.areas.invoicing:e-invoicing`,
      },
      {
        icon: '/icons/about-us/money-03-brand.svg',
        label: $localize`:@@about.experience.areas.payments:payments`,
      },
      {
        icon: '/icons/shared/package-01-brand.svg',
        label: $localize`:@@about.experience.areas.logistics:logistics`,
      },
    ],
    countries: [
      {
        name: $localize`:@@about.experience.country.sa:Saudi Arabia`,
        flag: `${dir}/flag-sa.svg`,
        map: `${dir}/map-sa.webp`,
      },
      {
        name: $localize`:@@about.experience.country.ae:UAE`,
        flag: `${dir}/flag-ae.svg`,
        map: `${dir}/map-ae.webp`,
      },
      {
        name: $localize`:@@about.experience.country.eg:Egypt`,
        flag: `${dir}/flag-eg.svg`,
        map: `${dir}/map-eg.webp`,
      },
    ],
    pinArrow: `${dir}/pin-arrow.svg`,
    title: $localize`:@@about.experience.title:Experience Behind the Product`,
    paragraphs: [
      $localize`:@@about.experience.paragraph-1:Our work spans Microsoft Dynamics 365 F&O development, enterprise integrations, e-invoicing, sales operations, payments, loyalty programs, logistics, HR, and other business processes.`,
      $localize`:@@about.experience.paragraph-2:We have supported organizations across Saudi Arabia, the UAE, and Egypt, with a strong focus on solving practical operational challenges around Microsoft Dynamics.`,
    ],
    emphases: [
      $localize`:@@about.experience.emphasis-1:Saudi Arabia`,
      $localize`:@@about.experience.emphasis-2:UAE`,
      $localize`:@@about.experience.emphasis-3:Egypt`,
    ],
  },
  footerCta: {
    title: $localize`:@@about.cta.title:Meet the Team Behind DynaOps`,
    description: $localize`:@@about.cta.description:If your organization runs Microsoft Dynamics 365 F&O and you are looking for a better way to connect your field sales operations with your ERP, we would be happy to show you what we have built.`,
    button: { label: $localize`:@@about.cta.button:Book a Demo`, href: demo },
    image: { src: `${localizedDir}/footer-cta.webp`, width: 400, height: 294 },
  },
};

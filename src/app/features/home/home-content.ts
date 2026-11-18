import type { HomeFaqItem } from './components/home-faq/home-faq.model';
import type { HomeContent } from './home.model';

// Copy is English here; src/locale/ar/home.json carries the Arabic under the same ids.
// The hero maps, feature mock-ups, integration illustration and tablet photo carry UI text, so their folder is localized.
const dir = '/images/home';
const localizedDir = $localize`:@@home.imageDir:/images/home`;
const demo = '/demo';

// Mock-up cards are 588x577 in English and 576x577 in Arabic; both scale to the panel width.
const featureImage = (n: number) => ({
  src: `${localizedDir}/feature-${n}.webp`,
  width: 1176,
  height: 1154,
});

// Figma: General lists every question, Product the first four, Capabilities the last three.
const FAQ_ITEMS: HomeFaqItem[] = [
  {
    question: $localize`:@@home.faq.what.question:What is DynaOps SFA?`,
    answer: $localize`:@@home.faq.what.answer:DynaOps is a Sales Force Automation solution built for Microsoft Dynamics 365 Finance & Operations. It helps field teams manage visits, orders, collections, customer activities and sales execution from one connected platform.`,
  },
  {
    question: $localize`:@@home.faq.replace.question:Does DynaOps replace Dynamics 365 Finance & Operations?`,
    answer: $localize`:@@home.faq.replace.answer:No. Dynamics 365 F&O remains your system of record. DynaOps extends field sales operations while keeping customers, products, prices, inventory and transactions connected to your ERP.`,
  },
  {
    question: $localize`:@@home.faq.integrate.question:How does DynaOps integrate with Dynamics 365 F&O?`,
    answer: $localize`:@@home.faq.integrate.answer:DynaOps connects to Dynamics 365 F&O through standard Microsoft APIs, allowing business data and transactions to stay synchronized without maintaining a separate ERP database.`,
  },
  {
    question: $localize`:@@home.faq.mobile.question:Can sales reps use DynaOps on mobile devices?`,
    answer: $localize`:@@home.faq.mobile.answer:Yes. DynaOps is a responsive web application designed to work across desktop, tablet and mobile devices. A dedicated mobile component is used where device-level capabilities such as GPS tracking are required.`,
  },
  {
    question: $localize`:@@home.faq.reps.question:What can field sales reps do with DynaOps?`,
    answer: $localize`:@@home.faq.reps.answer:Sales reps can plan and manage visits, access customer and product information, create sales orders, record collections, capture visit activities and follow up with customers from the field.`,
  },
  {
    question: $localize`:@@home.faq.gps.question:How does GPS work with the CRM?`,
    answer: $localize`:@@home.faq.gps.answer:GPS data is connected directly to the customer record. Visits can be validated against customer coordinates, while orders, collections, notes and visit outcomes become part of the same customer timeline.`,
  },
  {
    question: $localize`:@@home.faq.customize.question:Can DynaOps be customized for our business?`,
    answer: $localize`:@@home.faq.customize.answer:Yes. DynaOps can be configured and extended to match your sales processes, approval rules, integrations and industry-specific requirements.`,
  },
];

export const HOME_CONTENT: HomeContent = {
  hero: {
    badge: {
      icon: '/images/integration/dynamics-365.svg',
      label: $localize`:@@home.hero.badge:Native Dynamics 365 F&O integration`,
    },
    titleLead: $localize`:@@home.hero.titleLead:Sales force automation built for`,
    titleProduct: $localize`:@@home.hero.titleProduct:Microsoft Dynamics 365 Finance & Operations`,
    description: $localize`:@@home.hero.description:Plan visits, take orders, collect payments, and track your field team with every transaction synced to your ERP in real time.`,
    cta: { label: $localize`:@@home.hero.cta:Book a Demo`, href: demo },
    mapDir: `${localizedDir}/hero-map`,
    mapMobile: { src: `${localizedDir}/hero-map-mobile.webp`, width: 780, height: 1284 },
    mapAlt: $localize`:@@home.hero.mapAlt:Map of a sales rep's route between customer visits, with order values and the list of active field users`,
  },
  stats: {
    title: {
      before: $localize`:@@home.stats.title.before:Smarter tools for\nfield sales `,
      emphasis: $localize`:@@home.stats.title.emphasis:success`,
      after: $localize`:@@home.stats.title.after:`,
    },
    description: $localize`:@@home.stats.description:DynaOps365 helps your team plan, sell, collect, and grow, all in one connected platform with Microsoft Dynamics 365 F&O.`,
    link: { label: $localize`:@@home.stats.link:Learn more about us`, href: '/about' },
    testimonialsLabel: $localize`:@@home.stats.testimonials:Customer testimonials`,
    testimonials: [
      {
        quote: $localize`:@@home.stats.testimonial-1.quote:DynaOps365 streamlined our sales operations, boosting field team productivity and making Dynamics 365 management effortless.`,
        name: $localize`:@@home.stats.testimonial-1.name:ENG/ Muhammad Tag`,
        role: $localize`:@@home.stats.testimonial-1.role:IT Manager at Al Raed Al Arabi`,
        logo: { src: `${dir}/testimonial-al-raed-al-arabi.svg`, width: 32, height: 38 },
      },
      {
        quote: $localize`:@@home.stats.testimonial-2.quote:DynaOps365 elevated our field sales operations with smarter planning, greater visibility, and effortless execution.`,
        name: $localize`:@@home.stats.testimonial-2.name:ENG/ Ahmed Kishta`,
        role: $localize`:@@home.stats.testimonial-2.role:IT Manager at Dar Alshai Al Arabi`,
        logo: { src: `${dir}/testimonial-dar-alshai-al-arabi.svg`, width: 34, height: 38 },
      },
    ],
    highlight: {
      icon: '/icons/landing-page/trade-up-brand.svg',
      value: '+20',
      caption: $localize`:@@home.stats.response.caption:Higher response rates`,
    },
    stats: [
      {
        icon: '/icons/shared/analytics-03-brand.svg',
        prefix: $localize`:@@home.stats.upTo:Up to`,
        value: '30',
        caption: $localize`:@@home.stats.productivity.caption:Higher sales productivity\nacross every sales team`,
      },
      {
        icon: '/icons/shared/route-02-brand.svg',
        prefix: $localize`:@@home.stats.upTo:Up to`,
        value: '30',
        caption: $localize`:@@home.stats.travel.caption:Less field travel time\nGPS & route optimization`,
      },
    ],
  },
  features: {
    heading: {
      icon: '/icons/landing-page/ai-content-generator-brand.svg',
      eyebrow: $localize`:@@home.features.eyebrow:Features`,
      title: $localize`:@@home.features.title:Everything your field team needs.\nOne app. One ERP.`,
    },
    cta: { label: $localize`:@@home.features.cta:Explore all features`, href: '/features' },
    items: [
      {
        title: $localize`:@@home.features.visits.title:Plan the day. Prove every visit.`,
        points: [
          $localize`:@@home.features.visits.point-1:Daily journey plans and optimized routes`,
          $localize`:@@home.features.visits.point-2:GPS check-in and check-out at the customer location`,
          $localize`:@@home.features.visits.point-3:Planned vs actual visit tracking for managers`,
        ],
        link: {
          label: $localize`:@@home.features.visits.link:Explore visit planning`,
          href: '/features/visit-planning',
        },
        image: featureImage(1),
      },
      {
        title: $localize`:@@home.features.orders.title:Take orders at the customer's location synced instantly to your ERP`,
        points: [
          $localize`:@@home.features.orders.point-1:Full product catalog with customer-specific pricing`,
          $localize`:@@home.features.orders.point-2:Promotions, discounts and live stock availability`,
          $localize`:@@home.features.orders.point-3:Order confirmed in the app, posted in Dynamics 365 F&O`,
        ],
        link: {
          label: $localize`:@@home.features.orders.link:Explore sales orders`,
          href: '/features/sales-order-management',
        },
        image: featureImage(2),
      },
      {
        title: $localize`:@@home.features.dashboards.title:Managers get real time visibility and act before performance slips`,
        points: [
          $localize`:@@home.features.dashboards.point-1:Track sales, visits, collections and KPIs by rep, route and region`,
          $localize`:@@home.features.dashboards.point-2:Drill down from KPIs to customers, orders, visits and collections`,
          $localize`:@@home.features.dashboards.point-3:Spot missed visits, sales drops and collection delays early`,
        ],
        link: {
          label: $localize`:@@home.features.dashboards.link:Explore dashboards & analytics`,
          href: '/features/dashboards-analytics',
        },
        image: featureImage(3),
      },
      {
        title: $localize`:@@home.features.workflow.title:A workflow engine that enforces your policy before anything posts`,
        points: [
          $localize`:@@home.features.workflow.point-1:Build workflows for orders, discounts, returns, and customer creation`,
          $localize`:@@home.features.workflow.point-2:Sequential, parallel, any-one or all-must-approve with unlimited levels`,
          $localize`:@@home.features.workflow.point-3:Nothing reaches the ERP until every required approval is complete`,
        ],
        link: {
          label: $localize`:@@home.features.workflow.link:Explore the workflow engine`,
          href: '/features/workflow-approvals',
        },
        image: featureImage(4),
      },
      {
        title: $localize`:@@home.features.crm.title:Connect field location with the complete customer journey`,
        points: [
          $localize`:@@home.features.crm.point-1:Validate visits against customer coordinates`,
          $localize`:@@home.features.crm.point-2:Link orders, collections and notes to each visit`,
          $localize`:@@home.features.crm.point-3:Keep the full customer history in one timeline`,
        ],
        link: {
          label: $localize`:@@home.features.crm.link:Explore CRM & activities`,
          href: '/features/crm-activity-management',
        },
        image: featureImage(5),
      },
    ],
  },
  integration: {
    heading: {
      icon: '/icons/shared/arrow-data-transfer-horizontal-round-brand.svg',
      eyebrow: $localize`:@@home.integration.eyebrow:Integration`,
      title: $localize`:@@home.integration.title:Transform your field sales operations`,
    },
    points: [
      $localize`:@@home.integration.point-1:Native D365 F&O integration via standard Microsoft APIs`,
      $localize`:@@home.integration.point-2:No duplicate databases, no manual synchronization`,
      $localize`:@@home.integration.point-3:Customers, prices, inventory and orders always in sync`,
      $localize`:@@home.integration.point-4:Fast deployment on your existing environment`,
    ],
    link: {
      label: $localize`:@@home.integration.link:Explore the integration`,
      href: '/integration',
    },
    illustration: {
      src: `${localizedDir}/integration.webp`,
      width: 2400,
      height: 1324,
      alt: $localize`:@@home.integration.alt:DynaOps365 modules for sales orders, dashboards, visit planning, CRM and workflows, all connected to Dynamics 365`,
    },
  },
  industries: {
    heading: {
      icon: '/icons/landing-page/package-brand.svg',
      eyebrow: $localize`:@@home.industries.eyebrow:Industries`,
      title: $localize`:@@home.industries.title:Built for distribution driven industries`,
    },
    previous: $localize`:@@home.industries.previous:Previous industries`,
    next: $localize`:@@home.industries.next:Next industries`,
    items: [
      {
        title: $localize`:@@home.industries.fmcg.title:FMCG`,
        description: $localize`:@@home.industries.fmcg.description:Route execution, van sales, outlet coverage, promotions`,
        href: '/industries/fmcg',
        art: { src: `${dir}/industries/fmcg.svg`, width: 144, height: 140 },
      },
      {
        title: $localize`:@@home.industries.food-beverage.title:Food & Beverage`,
        description: $localize`:@@home.industries.food-beverage.description:Daily distribution, freshness, frequent orders, inventory visibility`,
        href: '/industries/food-beverage',
        art: { src: `${dir}/industries/food-beverage.svg`, width: 144, height: 141 },
      },
      {
        title: $localize`:@@home.industries.wholesale.title:Wholesale Distribution`,
        description: $localize`:@@home.industries.wholesale.description:Large orders, customer pricing, credit limits, collections`,
        href: '/industries/wholesale-distribution',
        art: { src: `${dir}/industries/wholesale-distribution.svg`, width: 113, height: 142 },
      },
      {
        title: $localize`:@@home.industries.retail.title:Retail Distribution`,
        description: $localize`:@@home.industries.retail.description:Store execution, merchandising, promotions, visit coverage`,
        href: '/industries/retail-distribution',
        art: { src: `${dir}/industries/retail-distribution.svg`, width: 144, height: 103 },
      },
      {
        title: $localize`:@@home.industries.manufacturing.title:Manufacturing`,
        description: $localize`:@@home.industries.manufacturing.description:Field sales connected to ERP inventory, pricing and fulfillment`,
        href: '/industries/manufacturing',
        art: { src: `${dir}/industries/manufacturing.svg`, width: 145, height: 130 },
      },
      {
        title: $localize`:@@home.industries.pharmaceuticals.title:Pharmaceuticals`,
        description: $localize`:@@home.industries.pharmaceuticals.description:Structured visits, customer history, order capture, territory management`,
        href: '/industries/pharmaceuticals',
        art: { src: `${dir}/industries/pharmaceuticals.svg`, width: 138, height: 141 },
      },
      {
        title: $localize`:@@home.industries.consumer-goods.title:Consumer Goods`,
        description: $localize`:@@home.industries.consumer-goods.description:Large product portfolios, dealer, store coverage, promotions`,
        href: '/industries/consumer-goods',
        art: { src: `${dir}/industries/consumer-goods.svg`, width: 144, height: 140 },
      },
      {
        title: $localize`:@@home.industries.building-materials.title:Building Materials`,
        description: $localize`:@@home.industries.building-materials.description:Site, customer visits, quotations, pricing, approvals`,
        href: '/industries/building-materials',
        art: { src: `${dir}/industries/building-materials.svg`, width: 145, height: 117 },
      },
      {
        title: $localize`:@@home.industries.industrial-supplies.title:Industrial Supplies`,
        description: $localize`:@@home.industries.industrial-supplies.description:Complex catalogs, customer-specific pricing, quotations and workflows`,
        href: '/industries/industrial-supplies',
        art: { src: `${dir}/industries/industrial-supplies.svg`, width: 145, height: 127 },
      },
    ],
  },
  faq: {
    heading: {
      icon: '/icons/landing-page/chat-spark-01-brand.svg',
      eyebrow: $localize`:@@home.faq.eyebrow:FAQ`,
      title: $localize`:@@home.faq.title:Frequently asked questions`,
    },
    categoriesLabel: $localize`:@@home.faq.categories:Question categories`,
    categories: [
      { id: 'general', label: $localize`:@@home.faq.general:General`, items: FAQ_ITEMS },
      {
        id: 'product',
        label: $localize`:@@home.faq.product:Product`,
        items: FAQ_ITEMS.slice(0, 4),
      },
      {
        id: 'capabilities',
        label: $localize`:@@home.faq.capabilities:Capabilities`,
        items: FAQ_ITEMS.slice(4),
      },
    ],
  },
  footerCta: {
    title: $localize`:@@home.footerCta.title:See DynaOps in action`,
    description: $localize`:@@home.footerCta.description:See how DynaOps connects your field sales operation with Microsoft Dynamics 365 Finance & Operations.`,
    button: { label: $localize`:@@home.footerCta.button:Book a Demo`, href: demo },
    image: { src: `${localizedDir}/footer-cta.webp`, width: 800, height: 600 },
  },
};

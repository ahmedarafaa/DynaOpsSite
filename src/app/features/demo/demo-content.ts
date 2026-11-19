import type { DemoContent } from './demo.model';

// Copy is English here; src/locale/ar/demo.json carries the Arabic under the same ids.
export const DEMO_CONTENT: DemoContent = {
  form: {
    title: $localize`:@@demo.form.title:Request a demo`,
    description: $localize`:@@demo.form.description:Share a few details and our team will contact you within one business day.`,
    fields: [
      {
        id: 'name',
        label: $localize`:@@demo.form.name.label:Full name`,
        placeholder: $localize`:@@demo.form.name.placeholder:Enter your full name`,
        type: 'text',
        autocomplete: 'name',
        required: true,
        error: $localize`:@@demo.form.name.error:Please enter your full name`,
      },
      {
        id: 'email',
        label: $localize`:@@demo.form.email.label:Email`,
        placeholder: 'name@company.com',
        type: 'email',
        autocomplete: 'email',
        required: true,
        error: $localize`:@@demo.form.email.error:Please enter a valid email address`,
        half: true,
        ltr: true,
      },
      {
        id: 'phone',
        label: $localize`:@@demo.form.phone.label:Phone number`,
        placeholder: $localize`:@@demo.form.phone.placeholder:Enter your phone number`,
        type: 'tel',
        autocomplete: 'tel',
        required: true,
        error: $localize`:@@demo.form.phone.error:Please enter a valid phone number`,
        half: true,
        ltr: true,
      },
      {
        id: 'company',
        label: $localize`:@@demo.form.company.label:Company`,
        placeholder: $localize`:@@demo.form.company.placeholder:Company name`,
        type: 'text',
        autocomplete: 'organization',
        required: true,
        error: $localize`:@@demo.form.company.error:Please enter your company name`,
      },
      {
        id: 'message',
        label: $localize`:@@demo.form.message.label:Message`,
        placeholder: $localize`:@@demo.form.message.placeholder:How can we help you?`,
        type: 'textarea',
        autocomplete: 'off',
        required: false,
        error: $localize`:@@demo.form.message.error:Message must be under 1,000 characters`,
      },
    ],
    submit: $localize`:@@demo.form.submit:Book a Demo`,
    sending: $localize`:@@demo.form.sending:Sending…`,
    consent: $localize`:@@demo.form.consent:By submitting this form, you agree to our Privacy Policy.`,
    failed: $localize`:@@demo.form.error.failed:We could not send your request. Please try again.`,
    success: {
      title: $localize`:@@demo.form.success.title:Thanks, your request is in!`,
      description: $localize`:@@demo.form.success.description:Our team will contact you within one business day to schedule your demo.`,
      back: $localize`:@@demo.form.success.back:Back to website`,
    },
  },
  brand: {
    logoAlt: $localize`:@@header.logoAlt:DynaOps365 – Dynamics 365 Ops, in your hands`,
    title: $localize`:@@demo.brand.title:See DynaOps365 in action.`,
    art: {
      prompt: $localize`:@@demo.art.prompt:Ask DynaOps AI or search features…`,
      label: $localize`:@@demo.art.label:Or, jump into a feature`,
      columns: [
        [
          {
            icon: '/icons/features/ai-user.svg',
            label: $localize`:@@demo.art.customer-management:Customer Management`,
          },
          {
            icon: '/icons/features/workflow-square-05.svg',
            label: $localize`:@@demo.art.workflow-approvals:Workflow & Approvals`,
          },
          {
            icon: '/icons/features/shipment-tracking.svg',
            label: $localize`:@@demo.art.gps-tracking:GPS Tracking`,
          },
          {
            icon: '/icons/features/trade.svg',
            label: $localize`:@@demo.art.trade-promotions:Trade Promotions`,
          },
          {
            icon: '/icons/shared/package-01.svg',
            label: $localize`:@@demo.art.sales-order-management:Sales Order Management`,
          },
          {
            icon: '/icons/shared/route-02.svg',
            label: $localize`:@@demo.art.route-optimization:Route Optimization`,
          },
          {
            icon: '/icons/features/warehouse.svg',
            label: $localize`:@@demo.art.inventory-visibility:Inventory Visibility`,
          },
        ],
        [
          {
            icon: '/icons/features/target-dollar.svg',
            label: $localize`:@@demo.art.sales-targets-kpis:Sales Targets & KPIs`,
          },
          {
            icon: '/icons/features/payment-01.svg',
            label: $localize`:@@demo.art.collections-management:Collections Management`,
          },
          {
            icon: '/icons/features/chart-relationship.svg',
            label: $localize`:@@demo.art.crm-activity:CRM & Activity`,
          },
          {
            icon: '/icons/features/location-user-03.svg',
            label: $localize`:@@demo.art.visit-planning:Visit Planning`,
          },
          {
            icon: '/icons/shared/analytics-03.svg',
            label: $localize`:@@demo.art.dashboards-analytics:Dashboards & Analytics`,
          },
          {
            icon: '/icons/features/delivery-truck-01.svg',
            label: $localize`:@@demo.art.van-sales:Van Sales & Van Stock`,
          },
          {
            icon: '/icons/features/no-internet.svg',
            label: $localize`:@@demo.art.offline-mode:Offline Mode`,
          },
        ],
      ],
    },
  },
};

import { BLOG_CONTENT } from '../blog-content';
import type { BlogArticlePageContent } from '../components/blog-article-page/blog-article-page.model';

// Copy is English here; src/locale/ar/blog.json carries the Arabic under the same ids.
// Title, summary, date and author come from the Blog page's featured post so the two stay in sync.
const post = BLOG_CONTENT.hero.featured;

export const LICENSE_ENFORCEMENT_2025_CONTENT: BlogArticlePageContent = {
  hero: {
    cover: { src: '/images/blog/license-enforcement-2025-cover.webp', width: 1676, height: 600 },
    title: post.title,
    description: post.excerpt,
    author: post.author.name,
    date: post.date,
    readMinutes: post.readMinutes,
  },
  body: [
    {
      title: post.title,
      blocks: [
        {
          kind: 'paragraph',
          content: [
            $localize`:@@blog.license-enforcement.intro-1:Also referred to as the “hard block” for Dynamics 365, it marks the end of the long-standing honor system for user licensing in Finance & Operations (F&O) apps. Beginning in FY25 Microsoft will actively validate every user’s subscription against their security roles and will block access if a valid license is missing. The roadmap was first detailed in an official FAQ / roadmap update dated 7 July 2025 and further amplified in Microsoft’s March 28 blog post “Simplifying License Management for Dynamics 365 Finance and Operations.” (Microsoft)`,
          ],
        },
        {
          kind: 'paragraph',
          content: [
            $localize`:@@blog.license-enforcement.intro-2:This article breaks down the 2025 Dynamics 365 licensing changes, key milestones, affected workloads, enforcement mechanics, and best-practice actions so your organisation stays compliant—and avoids disruption—well before the deadline.`,
          ],
        },
      ],
    },
    {
      title: $localize`:@@blog.license-enforcement.timeline.title:1. Key Dates & Timeline`,
      blocks: [
        {
          kind: 'table',
          head: [
            $localize`:@@blog.license-enforcement.timeline.milestone:Milestone`,
            $localize`:@@blog.license-enforcement.timeline.date:Date`,
            $localize`:@@blog.license-enforcement.timeline.what:What Happens`,
          ],
          rows: [
            [
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.reporting:Enhanced License Reporting`,
                },
                $localize`:@@blog.license-enforcement.timeline.reporting-tools: (Power Platform Admin Center & Lifecycle Services)`,
              ],
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.reporting-date:April 30 / May 15 2025`,
                },
              ],
              [
                $localize`:@@blog.license-enforcement.timeline.reporting-what:Admins gain seat-usage and role-to-license reports, but no enforcement yet.`,
              ],
            ],
            [
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.soft:Soft Enforcement (“in-product notifications”)`,
                },
              ],
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.soft-date:1 September 2025`,
                },
              ],
              [
                $localize`:@@blog.license-enforcement.timeline.soft-what:Unlicensed users see warning banners; admins receive e-mail alerts and can identify gaps in PPAC/LCS.`,
              ],
            ],
            [
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.hard:Hard Enforcement (“hard block”)`,
                },
              ],
              [
                {
                  strong: $localize`:@@blog.license-enforcement.timeline.hard-date:1 November 2025`,
                },
              ],
              [
                $localize`:@@blog.license-enforcement.timeline.hard-what:Users without a correctly assigned license are denied login to all production F&O apps. (`,
                { muted: 'LicenseQ' },
                ')',
              ],
            ],
          ],
        },
      ],
    },
    {
      blocks: [
        {
          kind: 'quote',
          label: $localize`:@@blog.license-enforcement.grace.label:Grace period:`,
          text: $localize`:@@blog.license-enforcement.grace.text:If your subscription renews in FY25 Q4 or FY26 Q1, a 12-month grace window lets you operate while fixing gaps—but it does not waive your licensing obligation, and Microsoft can back-bill for unlicensed usage.`,
        },
      ],
    },
    {
      title: $localize`:@@blog.license-enforcement.changes.title:2. What’s Changing & Why It Matters`,
      blocks: [
        {
          kind: 'paragraph',
          content: [
            $localize`:@@blog.license-enforcement.changes.p1-before:Historically, F&O relied on the honor-based model: admins mapped security roles to license types, but Microsoft did not technically stop unlicensed users. From November 2025, license checks become an `,
            {
              strong: $localize`:@@blog.license-enforcement.changes.p1-emphasis:automated runtime validation`,
            },
            $localize`:@@blog.license-enforcement.changes.p1-after:. Microsoft’s rationale, per its blog post, is to:`,
          ],
        },
        {
          kind: 'list',
          items: [
            $localize`:@@blog.license-enforcement.changes.reason-1:Simplify license management across Microsoft 365, Power Platform, and Dynamics.`,
            $localize`:@@blog.license-enforcement.changes.reason-2:Ensure parity with other Dynamics 365 workloads that already enforce per-user licensing.`,
            $localize`:@@blog.license-enforcement.changes.reason-3:Protect customers from unforeseen audit exposure by providing advance tooling and notifications. (Microsoft)`,
          ],
        },
        {
          kind: 'paragraph',
          content: [
            $localize`:@@blog.license-enforcement.changes.p2-before:For customers, the shift means `,
            {
              strong: $localize`:@@blog.license-enforcement.changes.p2-emphasis:operational risk migrates from “audit after the fact” to “instant loss of access.”`,
            },
            $localize`:@@blog.license-enforcement.changes.p2-after: Organisations must therefore treat license compliance as a critical path item in 2025.`,
          ],
        },
      ],
    },
  ],
  related: {
    title: $localize`:@@blog.related.title:Related articles`,
    posts: BLOG_CONTENT.posts.posts,
  },
  footerCta: BLOG_CONTENT.footerCta,
};

import type { FaqItem } from "@/content/faq";
import { CONTACT_EMAIL, HUB_URL, SITE_NAME, SITE_ORIGIN, absUrl } from "@/content/contact";

const OG_IMAGE = absUrl("/og.jpg");

function socialMeta(title: string, description: string, url: string) {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: SITE_NAME },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

const publisher = {
  "@type": "Organization",
  name: "Ultimatum",
  email: CONTACT_EMAIL,
  url: HUB_URL,
  sameAs: [HUB_URL],
};

type JsonLdOpts = {
  appName: string;
  path: string;
  description: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
};

export function jsonLdScripts(opts: JsonLdOpts) {
  const url = absUrl(opts.path);
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    description:
      "Resize photos for Instagram, YouTube and X in the browser. Exact pixels, social presets, batch ZIP. No upload, no signup, no watermark.",
    inLanguage: "en",
    publisher,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Fit",
        item: `${SITE_ORIGIN}/`,
      },
      ...(opts.path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: opts.appName,
              item: url,
            },
          ]
        : []),
    ],
  };
  const scripts: { type: string; children: string }[] = [
    { type: "application/ld+json", children: JSON.stringify(website) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
  ];
  if (opts.includeApp !== false) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: opts.appName,
        url,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Image bytes stay in this tab.",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: opts.description,
        featureList: [
          "Exact width × height",
          "Instagram YouTube X presets",
          "Fill Fit Stretch",
          "Print size × DPI",
          "Batch ZIP",
          "No upload",
        ],
        publisher,
        screenshot: OG_IMAGE,
      }),
    });
  }
  if (opts.faqs?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }),
    });
  }
  if (opts.howToName && opts.howToSteps?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: opts.howToName,
        description: opts.description,
        step: opts.howToSteps.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }),
    });
  }
  return scripts;
}

function withCanonical(
  title: string,
  description: string,
  path: string,
  extra?: {
    appName: string;
    faqs?: readonly FaqItem[];
    howToName?: string;
    howToSteps?: string[];
    includeApp?: boolean;
  },
) {
  const url = absUrl(path);
  const fullTitle = title.includes(" | Fit") || title.startsWith("Fit") ? title : `${title} | Fit`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      ...socialMeta(fullTitle, description, url),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: extra
      ? jsonLdScripts({
          appName: extra.appName,
          path,
          description,
          faqs: extra.faqs,
          howToName: extra.howToName,
          howToSteps: extra.howToSteps,
          includeApp: extra.includeApp,
        })
      : [],
  };
}

export function toolHead(opts: {
  title: string;
  description: string;
  path: string;
  appName: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
}) {
  return withCanonical(opts.title, opts.description, opts.path, {
    appName: opts.appName,
    faqs: opts.faqs,
    howToName: opts.howToName,
    howToSteps: opts.howToSteps,
    includeApp: true,
  });
}

export function articleHead(opts: {
  title: string;
  description: string;
  path: string;
  appName: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
}) {
  return withCanonical(opts.title, opts.description, opts.path, {
    appName: opts.appName,
    faqs: opts.faqs,
    howToName: opts.howToName,
    howToSteps: opts.howToSteps,
    includeApp: opts.includeApp ?? false,
  });
}

export function legalHead(opts: { title: string; description: string; path: string }) {
  return withCanonical(opts.title, opts.description, opts.path);
}

export function pageHead(title: string, description: string, path: string) {
  return articleHead({ title, description, path, appName: title, includeApp: false });
}

import { FAQ } from "@/content/faq";
import { CONTACT_EMAIL, SITE_ORIGIN, STUDIO_NAME } from "@/content/contact";

export function JsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Fit",
    url: SITE_ORIGIN,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Resize photos for Instagram, YouTube and X in the browser. Exact pixels, social presets, batch ZIP. No upload, no signup, no watermark.",
    creator: {
      "@type": "Organization",
      name: STUDIO_NAME,
      email: CONTACT_EMAIL,
      url: SITE_ORIGIN,
    },
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fit",
    url: SITE_ORIGIN,
    inLanguage: "en",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { FAQ } from "@/content/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Fit FAQ — Private Image Resizer" },
      {
        name: "description",
        content:
          "Answers about Fill vs Fit vs Stretch, uploads, Instagram sizes, HEIC, ZIP, quality, iPhone, and EXIF. Fit resizes in the browser.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <Article
      kicker="FAQ"
      title="Questions people actually ask about Fit"
      lede="These answers are about this resizer — not a copied PDF-toolkit FAQ."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "FAQ" },
      ]}
    >
      {FAQ.map((item) => (
        <section key={item.q} className="border-t border-line pt-4">
          <h2 className="font-display text-lg text-fg">{item.q}</h2>
          <p className="mt-2 text-pretty">{item.a}</p>
        </section>
      ))}
      <p className="pt-4">
        Still stuck?{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/contact">
          Email Ultimatum
        </a>
        . Do not attach the photos you wanted resized — run them on the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          homepage
        </a>
        .
      </p>
    </Article>
  );
}

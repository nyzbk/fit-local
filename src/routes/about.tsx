import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { CONTACT_EMAIL, STUDIO_NAME } from "@/content/contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Fit — Private Image Resizer" },
      {
        name: "description",
        content:
          "Fit is a free, private image resizer from Ultimatum. Exact pixels and social presets in the browser. No upload, no account, no watermark.",
      },
    ],
  }),
  component: AboutPage,
});

const TOOLS = [
  { href: "https://heic-local.vercel.app", name: "HEIC Local", job: "HEIC to JPG/PNG in the browser" },
  { href: "https://folio-pdf-toolkit.vercel.app", name: "Folio", job: "Merge, split, compress PDFs" },
  { href: "https://nota-invoice-mu.vercel.app", name: "Nota", job: "Invoice PDF generator" },
  { href: "https://crush-local.vercel.app", name: "Crush", job: "Batch image compressor" },
  { href: "https://shift-local.vercel.app", name: "Shift", job: "WebP / AVIF converter" },
  { href: "https://strip-local.vercel.app", name: "Strip", job: "EXIF / GPS metadata stripper" },
];

function AboutPage() {
  return (
    <Article
      kicker="Studio"
      title="About Fit"
      lede="A crop-and-resize studio tool that happens to live in a URL. Not a file-hosting company."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "About" },
      ]}
    >
      <p>
        Fit is a free image resizer for exact pixels and social presets. Most pages in this category take a copy of
        your photo. This one does not. Processing uses createImageBitmap, Canvas, toBlob, and JSZip in the tab you
        already opened.
      </p>
      <p>
        The visual language is a dark Swiss studio — crop frames, mint marks, tight type — because the job is
        framing, not “another paper mock invoice.” OLED black is a studio wall. It is not a default theme applied to
        every sibling tool.
      </p>
      <p>
        Fit is made by {STUDIO_NAME}, a brand-marketing studio. The free tools exist so people can finish a small job
        without an account. Paid work is different: brand systems and $10k websites. Using Fit does not create a
        client contract.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Other private tools in this family</h2>
      <p>
        Each URL is a different job. Do not treat them as duplicate sites with the same article pasted over a new
        dropzone.
      </p>
      <ul className="list-disc space-y-2 pl-5">
        {TOOLS.map((tool) => (
          <li key={tool.href}>
            <a className="text-accent underline-offset-4 hover:underline" href={tool.href} rel="noopener noreferrer">
              {tool.name}
            </a>
            <span className="text-muted"> — {tool.job}</span>
          </li>
        ))}
      </ul>
      <p>
        Contact:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        or the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/contact">
          contact page
        </a>
        .
      </p>
    </Article>
  );
}

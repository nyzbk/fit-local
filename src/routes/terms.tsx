import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { CONTACT_EMAIL } from "@/content/contact";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Fit" },
      {
        name: "description",
        content:
          "Fit is a free browser image resizer provided as-is. Canvas resample is not AI upscale. Lawful use only.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Article
      kicker="Legal"
      title="Terms"
      lede="Last updated: 28 August 2026"
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Terms" },
      ]}
    >
      <p>
        Fit is a free browser-based image resizer. The service is provided <strong className="text-fg">as is</strong>,
        without warranty of any kind.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">How resizing works</h2>
      <p>
        Output is a <strong className="text-fg">Canvas resample</strong>. It is not a lossless JPEG transcode and not
        an AI upscaler. Enlarging interpolates new pixels and is labeled Upscaled. Quality depends on your device and
        browser. We do not guarantee a specific visual result, a maximum file size, or compatibility with every
        future platform spec.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Acceptable use</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Use the tool for lawful purposes only.</li>
        <li>Do not process content you are not allowed to process.</li>
        <li>Do not abuse advertising systems, including invalid clicks on any ads shown on this site.</li>
        <li>Do not attempt to overload the page with files intended to crash other visitors’ browsers; this is a local tool, but the site still has to stay available.</li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">Liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from
        use of the tool, including lost files that existed only in your tab. Links to studio services are optional
        offers; using Fit does not create a client contract.
      </p>
      <p>
        Questions:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </Article>
  );
}

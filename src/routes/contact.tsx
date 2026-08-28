import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { CONTACT_EMAIL, STUDIO_NAME } from "@/content/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Fit — Ultimatum" },
      {
        name: "description",
        content: `Contact the studio behind Fit at ${CONTACT_EMAIL}. The resizer itself runs in your browser — we cannot recover files we never received.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Article
      kicker="Contact"
      title="Talk to the studio behind Fit"
      lede="A real inbox. Not a ticket bot. Not a form that uploads your photos."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Contact" },
      ]}
    >
      <p>
        Fit is operated by {STUDIO_NAME}. For questions about this resizer, privacy, or the other private browser
        tools, email:
      </p>
      <p className="font-display text-xl">
        <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What we can help with</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>The tool failed on a specific browser or device (tell us the browser, OS, and file type — not the file).</li>
        <li>A preset looks wrong for a platform change you can document.</li>
        <li>Privacy or terms questions.</li>
        <li>Custom websites and brand systems — that is the studio’s paid work, not the free resizer.</li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">What we cannot do</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Recover or retrieve a photo you resized here. It never reached us.</li>
        <li>Process files you email as attachments “because the page was slow.” Use the homepage instead.</li>
        <li>Unlock a daily quota — there is no quota.</li>
        <li>Turn Fit into a HEIC decoder, PDF merger, or watermark remover. Those are other products, or not offered.</li>
      </ul>
      <p>
        Legal pages:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/privacy">
          Privacy
        </a>{" "}
        and{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/terms">
          Terms
        </a>
        . Studio context:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/about">
          About
        </a>
        .
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Fit",
            url: "https://fit-local-six.vercel.app/contact",
            mainEntity: {
              "@type": "Organization",
              name: STUDIO_NAME,
              email: CONTACT_EMAIL,
              url: "https://fit-local-six.vercel.app",
            },
          }),
        }}
      />
    </Article>
  );
}

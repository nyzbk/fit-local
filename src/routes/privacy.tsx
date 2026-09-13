import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { CONTACT_EMAIL } from "@/content/contact";
import { legalHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    legalHead({
      title: "Privacy Policy — Fit",
      description:
        "Fit resizes images in your browser. Photos are not uploaded. No account. Hosting logs and optional AdSense cookies are described here.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Article
      kicker="Legal"
      title="Privacy"
      lede="Last updated: 13 September 2026"
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Privacy" },
      ]}
    >
      <p>
        Fit resizes images <strong className="text-fg">entirely in your browser</strong>. Photos you choose are not
        uploaded to our servers. There is no conversion API, no object storage bucket, and no account required to
        download.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What we process</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Files you select stay on the device. Resize uses createImageBitmap, Canvas, toBlob, and JSZip in this tab.
        </li>
        <li>
          Hosting and CDN (Vercel) may log IP address, user-agent, referrer, and request paths for the HTML, CSS, and
          JavaScript of this site. Those logs are not the image bytes.
        </li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">Advertising partners (e.g. Google AdSense)</h2>
      <p>
        This site may show Google AdSense ads after the publisher account is approved. Google and its partners use
        cookies and similar technology to serve ads, including ads based on visits to this site and other sites on the
        internet. Ads are not placed on the Choose, Resize, or Download controls. Image bytes you resize never leave
        this tab and are not sent to advertisers.
      </p>
      <p>
        Read how Google uses data in advertising at{" "}
        <a
          className="text-accent underline-offset-4 hover:underline"
          href="https://policies.google.com/technologies/ads"
          rel="noopener noreferrer"
        >
          policies.google.com/technologies/ads
        </a>
        . You can opt out of personalized Google ads at{" "}
        <a
          className="text-accent underline-offset-4 hover:underline"
          href="https://adssettings.google.com"
          rel="noopener noreferrer"
        >
          adssettings.google.com
        </a>
        . Until ads are live, slots on this origin render as empty placeholders.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What we do not do</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>We do not receive, store, train on, or sell your photos.</li>
        <li>We do not require signup or email before download.</li>
        <li>We cannot restore a file from our side, because we never had it.</li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">Contact</h2>
      <p>
        Privacy questions:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        . We may update this page; the date above will change when we do.
      </p>
    </Article>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { CONTACT_EMAIL } from "@/content/contact";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Fit" },
      {
        name: "description",
        content:
          "Fit resizes images in your browser. Photos are not uploaded. No account. Hosting logs and optional AdSense cookies are described here.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Article
      kicker="Legal"
      title="Privacy"
      lede="Last updated: 28 August 2026"
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
        <li>
          If Google AdSense is enabled on this site, Google may use cookies and similar technology as described in
          Google’s advertising policies. Ads are not placed on the Choose, Resize, or Download controls.
        </li>
      </ul>
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

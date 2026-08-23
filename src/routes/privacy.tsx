import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl">Privacy</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-pretty text-sm leading-relaxed">
          <p>
            Fit resizes images <strong className="text-fg">entirely in your browser</strong>. Photos you choose are not
            uploaded to our servers. There is no conversion API, no storage bucket, and no account required.
          </p>
          <h2 className="font-display text-xl text-fg">What we process</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Files you select stay on the device. Resize uses createImageBitmap, Canvas, toBlob, and JSZip in this tab.</li>
            <li>Hosting / CDN may log IP, user-agent, and request paths for the HTML/JS of this site — not the image bytes.</li>
            <li>If Google AdSense is enabled, Google may use cookies as described in Google’s policies.</li>
          </ul>
          <h2 className="font-display text-xl text-fg">What we do not do</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>We do not receive, store, or sell your photos.</li>
            <li>We do not require signup or email before download.</li>
            <li>We do not use your files to train models.</li>
          </ul>
          <p>
            Contact via the studio link in the footer. We may update this page; the date above will change when we do.
          </p>
        </div>
      </main>
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Legal</p>
        <h1 className="mt-2 font-display text-4xl">Terms</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <div className="mt-8 space-y-4 text-pretty text-sm leading-relaxed">
          <p>
            Fit is a free browser-based image resizer. The service is provided <strong className="text-fg">as is</strong>.
          </p>
          <h2 className="font-display text-xl text-fg">How resizing works</h2>
          <p>
            Output is a <strong className="text-fg">Canvas resample</strong>. It is not a lossless JPEG transcode and not
            an AI upscaler. Enlarging interpolates new pixels and is labeled Upscaled. Quality depends on your device and
            browser. We do not guarantee a specific visual result.
          </p>
          <h2 className="font-display text-xl text-fg">Acceptable use</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Use the tool for lawful purposes only.</li>
            <li>Do not process content you are not allowed to process.</li>
            <li>Do not abuse advertising systems, including invalid clicks.</li>
          </ul>
          <p>
            To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from
            use of the tool. Links to studio services are optional offers; using Fit does not create a client contract.
          </p>
        </div>
      </main>
    </AppShell>
  );
}

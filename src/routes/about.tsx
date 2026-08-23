import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/about")({ component: About });

const TOOLS = [
  { href: "https://heic-local.vercel.app", name: "HEIC Local", job: "HEIC to JPG/PNG in the browser" },
  { href: "https://folio-pdf-toolkit.vercel.app", name: "Folio", job: "Merge, split, compress PDFs" },
  { href: "https://nota-invoice-mu.vercel.app", name: "Nota", job: "Free invoice PDF generator" },
  { href: "https://crush-local.vercel.app", name: "Crush", job: "Batch image compressor" },
  { href: "https://shift-local.vercel.app", name: "Shift", job: "WebP / AVIF converter" },
  { href: "https://strip-local.vercel.app", name: "Strip", job: "EXIF / GPS metadata stripper" },
];

function About() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">Studio</p>
        <h1 className="mt-2 font-display text-4xl">About Fit</h1>
        <p className="mt-6 text-pretty">
          Fit is a free, private image resizer for exact pixels and social presets. Most “free” resizers upload your
          photos. This one does not.
        </p>
        <p className="mt-4 text-pretty text-muted">
          It is made by Ultimatum, a brand-marketing studio. Other private tools in this family:
        </p>
        <ul className="mt-4 space-y-3">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <a className="text-accent underline-offset-4 hover:underline" href={tool.href}>
                {tool.name}
              </a>
              <span className="text-muted"> — {tool.job}</span>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
}

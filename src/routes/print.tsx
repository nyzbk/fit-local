import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PrintApp } from "@/components/fit/PrintApp";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { AdUnit } from "@/components/ads/AdUnit";
import { toolHead } from "@/lib/seo";

const FAQ_PRINT = [
  {
    q: "Is 4×6 inches at 300 DPI really 1200×1800 pixels?",
    a: "Yes. Inches × DPI = pixels. 4 × 300 = 1200, 6 × 300 = 1800. Centimetres divide by 2.54 first: 10×15 cm at 300 DPI is 1181×1772. Fit then runs the same Canvas resample as the homepage at those integers.",
  },
  {
    q: "Does this print the photo on paper?",
    a: "No. There is no printer dialog, no ICC profile, no bleed, and no PDF page. You get a raster at lab pixel count. Send that file to a lab or to your OS print dialog yourself.",
  },
  {
    q: "Why not type 1200×1800 on the homepage?",
    a: "You can. The homepage already has exact width × height. This page exists for people who think in paper and DPI, not in pixels. The encoder is the same function. There is no second /exact route on purpose — that would duplicate the root tool.",
  },
];

export const Route = createFileRoute("/print")({
  head: () =>
    toolHead({
      title: "From paper size to pixels — print DPI resizer | Fit",
      description:
        "Convert 4×6 inch, 10×15 cm, A6, passport 2×2, or A4 plus DPI into pixels, then resize in this browser. Same Canvas as Fit. Not a PDF printer.",
      path: "/print",
      appName: "Fit print size",
      faqs: FAQ_PRINT,
      howToName: "How to resize a photo for print size",
      howToSteps: [
        "Pick a paper preset or type inches or centimetres.",
        "Set DPI (300 for a lab print). The page shows integer pixels.",
        "Drop the photo, choose Fill, Fit or Stretch, then resize.",
        "Download the raster. This tab does not talk to a printer.",
      ],
    }),
  component: PrintPage,
});

function PrintPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
          <ol className="flex flex-wrap gap-1">
            <li>
              <a href="/" className="hover:text-fg">
                Fit
              </a>
            </li>
            <li className="flex items-center gap-1">
              <span aria-hidden="true">/</span>
              <span className="text-fg">Print size</span>
            </li>
          </ol>
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Paper · DPI · pixels</p>
        <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] leading-[1.15] font-semibold tracking-tight sm:text-5xl">
          From paper size to pixels
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-muted">
          Labs talk in inches and DPI. Screens talk in pixels. Type the paper, pick 300 DPI (or another), get the
          integer frame, then resize here. Files stay in this tab.
        </p>
        <div className="mt-8">
          <PrintApp />
        </div>
      </main>
      <AdUnit slot="mid" className="mx-auto max-w-6xl px-4" />
      <section className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
        <h2 className="font-display text-2xl">Why a paper page is not the homepage</h2>
        <p className="mt-4 text-pretty">
          The homepage already lets you type 1200×1800. Repeating that box on a second URL would be the same tool with
          a different title. This route starts one step earlier: physical size × dots per inch. A 4×6″ print at 300 DPI
          is 1200×1800. The same 4×6″ at 150 DPI is 600×900 — a draft, not a lab file. Instagram does not care about
          DPI. A photo lab does.
        </p>
        <p className="mt-4 text-pretty">
          After the integers exist, Fit calls the same <code>resizeImage</code> the homepage uses. Fill still
          center-crops. Fit still pads. Stretch still distorts. There is no second encoder, no pica, no print driver.
        </p>
        <h2 className="mt-10 font-display text-2xl">What this page will not do</h2>
        <p className="mt-4 text-pretty">
          It will not assemble a PDF, impose crop marks, or talk to a printer. That is Folio or your OS. It will not
          lay out a QR sheet. It will not invent pixels a small phone photo does not have — an Upscaled badge still
          means interpolation. Long edge still caps at 8192, scaled as a pair so A4 does not warp if you punch DPI too
          high.
        </p>
        <p className="mt-4 text-pretty">
          Social frames live on the{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/">
            homepage
          </a>{" "}
          and the{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/presets">
            preset table
          </a>
          . How to click the resizer:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/guide">
            guide
          </a>
          .
        </p>
      </section>
      <FaqSection items={FAQ_PRINT} />
      <SoftAgencyCta />
    </AppShell>
  );
}

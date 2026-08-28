import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FitApp } from "@/components/fit/FitApp";
import { HowItWorks } from "@/components/site/HowItWorks";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { AdUnit } from "@/components/ads/AdUnit";
import { JsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <JsonLd />
      <noscript>
        <p>
          Fit resizes photos for Instagram, YouTube and X entirely in this browser. Files never leave the device. Use
          Fill, Fit or Stretch, pick a social preset or type exact pixels, then download a file or a ZIP.
        </p>
      </noscript>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Private · in this tab</p>
        <h1 className="mt-3 max-w-3xl font-display text-[1.85rem] leading-[1.15] font-semibold tracking-tight sm:text-5xl">
          Resize photos for Instagram, YouTube & X — free, private, no upload
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-muted">
          Exact pixels or social presets. Fill, Fit or Stretch. Batch download a ZIP. Files never leave the device.
          Canvas resample — not AI upscale.
        </p>
        <div className="mt-8">
          <FitApp />
        </div>
      </main>
      <HowItWorks />
      <AdUnit slot="mid" className="mx-auto max-w-6xl px-4" />
      <section className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
        <h2 className="font-display text-2xl">A resizer that stays on the device</h2>
        <p className="mt-4 text-pretty">
          Most “free image resizer” pages ask you to upload a photo, wait on a spinner, then download a file that has
          already crossed a data center. Fit does not do that. You choose JPG, PNG, WebP, BMP or GIF files on this
          computer or phone. The browser decodes them with createImageBitmap, draws them onto a Canvas at the size you
          asked for, and encodes a new blob. Download is a local save. The ZIP, if you asked for one, is packed with
          JSZip in the same tab. There is no conversion API hiding behind the button.
        </p>
        <p className="mt-4 text-pretty">
          That matters for two kinds of people. First: anyone who should not send a face, a document scan, a product
          unboxing, or a child’s photo to a random converter. Second: anyone who is tired of daily limits, watermarks,
          and “create an account to download.” Fit has none of those. The only limit is the memory of the device you
          already have.
        </p>
        <h2 className="mt-10 font-display text-2xl">Exact pixels beat “make it smaller”</h2>
        <p className="mt-4 text-pretty">
          Compressors shrink bytes. Converters change codecs. Fit’s job is geometry. Instagram’s feed still expects a
          1080×1080 square. A Story or Reel is 1080×1920. A YouTube thumbnail is 1280×720. An X (Twitter) post image
          that fills the timeline well is 1600×900; a profile header is 1500×500. LinkedIn and Facebook link cards sit
          around 1200×627 and 1200×630. Pinterest still likes a tall 1000×1500 pin. You can type any custom width and
          height up to 8192 on the long edge. The output filename includes those numbers so you can see what you
          actually exported.
        </p>
        <p className="mt-4 text-pretty">
          If you only needed a smaller file and the pixel count already matches the platform, use Crush. If you needed
          WebP or AVIF, use Shift. If you needed GPS gone, use Strip. Fit is the one you open when the platform
          rejected the upload for the wrong dimensions, or when a client brief says “exactly 1920 by 1080.”
        </p>
        <h2 className="mt-10 font-display text-2xl">Fill, Fit, Stretch — pick the crop, not a surprise</h2>
        <p className="mt-4 text-pretty">
          A 2000×1000 landscape dropped into a 1080×1080 Instagram square cannot keep every pixel. Fill (the default)
          covers the frame and center-crops the overflow. That is the same idea as CSS background-size: cover. Fit
          contains the whole photo and pads the leftover with black or white. Stretch distorts. The live preview shows
          a checkerboard, a rule-of-thirds overlay, and an Upscaled badge if you asked for more pixels than the source
          has. Enlarging interpolates. Fit will still give you the number you typed; it will not pretend those new
          pixels came from a camera.
        </p>
        <p className="mt-4 text-pretty">
          Quality 0.92 is the default for JPG and WebP. PNG is lossless from the canvas. HEIC from iPhone is rejected
          on purpose — convert it first in HEIC Local, then come back. iOS Safari is a supported path: Choose files,
          resize, Download. Read the{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/guide">
            step-by-step guide
          </a>
          , the{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/presets">
            preset table
          </a>
          , and the{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/modes">
            mode comparison
          </a>{" "}
          if you want the long version before you drop a batch.
        </p>
        <p className="mt-4 text-pretty">
          Fit is a free tool from Ultimatum. There is no signup. Ads, when the site is approved, sit after success, in
          the mid band, and in the footer — never on top of Choose, Resize, or Download. Questions:{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/contact">
            contact
          </a>
          .
        </p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          <li>
            <a href="/guide" className="text-accent underline-offset-4 hover:underline">
              How to resize images in the browser
            </a>
          </li>
          <li>
            <a href="/presets" className="text-accent underline-offset-4 hover:underline">
              Instagram, YouTube, X sizes
            </a>
          </li>
          <li>
            <a href="/modes" className="text-accent underline-offset-4 hover:underline">
              Fill vs Fit vs Stretch
            </a>
          </li>
          <li>
            <a href="/use-cases" className="text-accent underline-offset-4 hover:underline">
              Who uses a private resizer
            </a>
          </li>
        </ul>
      </section>
      <FaqSection />
      <SoftAgencyCta />
    </AppShell>
  );
}

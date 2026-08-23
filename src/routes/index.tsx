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
      <FaqSection />
      <SoftAgencyCta />
    </AppShell>
  );
}

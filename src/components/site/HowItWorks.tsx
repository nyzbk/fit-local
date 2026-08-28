const STEPS = [
  { n: "01", title: "Choose", body: "Drop JPG, PNG, WebP, BMP or GIF. They stay in this tab." },
  { n: "02", title: "Pick size", body: "A social preset or exact width × height. Lock aspect if you need it." },
  { n: "03", title: "Resize", body: "Fill, Fit or Stretch. Canvas resample on this device." },
  { n: "04", title: "Download", body: "One file or a ZIP. Named {stem}-{W}x{H}." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">How it works</p>
      <h2 className="mt-2 font-display text-2xl">Four steps. No upload.</h2>
      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.n} className="rounded-lg border border-line bg-surface p-4">
            <p className="font-mono text-xs text-accent">{step.n}</p>
            <h3 className="mt-2 font-display text-lg">{step.title}</h3>
            <p className="mt-1 text-sm text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
        Full walkthrough:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/guide">
          how to resize images without uploading
        </a>
        . Size table:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/presets">
          Instagram, YouTube, X presets
        </a>
        .
      </p>
    </section>

  );
}

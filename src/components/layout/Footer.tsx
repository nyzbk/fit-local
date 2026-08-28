import { AdUnit } from "@/components/ads/AdUnit";
import { CONTACT_EMAIL } from "@/content/contact";

const COLS = [
  {
    title: "Tool",
    links: [
      { href: "/", label: "Resize now" },
      { href: "/guide", label: "How to resize" },
      { href: "/presets", label: "Social presets" },
      { href: "/modes", label: "Fill, Fit, Stretch" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/use-cases", label: "Use cases" },
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About Fit" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold">Fit</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              Private image resizer. Exact pixels and social presets. Files never leave this device.
            </p>
            <p className="mt-3 text-sm">
              <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{col.title}</p>
              <ul className="mt-3 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm text-muted hover:text-fg"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs tracking-wide text-muted">
          Fit · files stay on this device · Canvas resample, not AI upscale
        </p>
      </div>
    </footer>
  );
}

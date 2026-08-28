import { Link } from "@tanstack/react-router";
import { CropMark } from "@/components/fit/CropMark";

const NAV = [
  { href: "/guide", label: "Guide" },
  { href: "/presets", label: "Presets" },
  { href: "/modes", label: "Modes" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md border border-line bg-elevated">
            <CropMark size={18} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">Fit</span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Free image resizer</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="flex min-h-11 flex-wrap items-center gap-1">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center px-2 text-sm text-muted hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

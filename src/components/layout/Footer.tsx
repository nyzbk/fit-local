import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdUnit slot="footer" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p className="font-mono text-xs tracking-wide">Fit · files stay on this device</p>
          <nav className="flex flex-wrap gap-4">
            <Link to="/privacy" className="inline-flex min-h-11 items-center hover:text-fg">
              Privacy
            </Link>
            <Link to="/terms" className="inline-flex min-h-11 items-center hover:text-fg">
              Terms
            </Link>
            <Link to="/about" className="inline-flex min-h-11 items-center hover:text-fg">
              About
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

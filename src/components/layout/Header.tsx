import { Link } from "@tanstack/react-router";
import { CropMark } from "@/components/fit/CropMark";

export function Header() {
  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-md border border-line bg-elevated">
            <CropMark size={18} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">Fit</span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Free image resizer</span>
          </span>
        </Link>
        <p className="max-w-[52%] text-right text-[11px] uppercase leading-snug tracking-[0.12em] text-muted">
          No upload. No signup. No watermark.
        </p>
      </div>
    </header>
  );
}

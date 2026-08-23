import { useEffect, useRef } from "react";
import type { FitItem, Mode, PadColor } from "@/lib/fit/types";
import { decodeBitmap, drawResized, scaleKind } from "@/lib/fit/resize";
import { cn } from "@/lib/utils";

type Props = {
  item: FitItem | null;
  width: number;
  height: number;
  mode: Mode;
  pad: PadColor;
};

export function PreviewStage({ item, width, height, mode, pad }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const origW = item?.origW ?? 0;
  const origH = item?.origH ?? 0;
  const kind = origW && origH ? scaleKind(mode, origW, origH, width, height) : "same";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    async function paint() {
      const el = canvasRef.current;
      if (!el) return;
      const maxCss = 360;
      const scale = Math.min(maxCss / width, maxCss / height, 1);
      const cssW = Math.max(1, Math.round(width * scale));
      const cssH = Math.max(1, Math.round(height * scale));
      const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
      el.style.width = `${cssW}px`;
      el.style.height = `${cssH}px`;
      el.width = Math.round(cssW * dpr);
      el.height = Math.round(cssH * dpr);
      const ctx = el.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!item || item.error) {
        ctx.fillStyle = pad === "#ffffff" ? "#eef2f6" : "#0b0f14";
        ctx.fillRect(0, 0, cssW, cssH);
        return;
      }

      try {
        const bmp = await decodeBitmap(item.file);
        if (cancelled) {
          bmp.close();
          return;
        }
        drawResized(ctx, bmp, cssW, cssH, mode, pad, false);
        bmp.close();
      } catch {
        if (!cancelled) {
          ctx.fillStyle = "#1b2330";
          ctx.fillRect(0, 0, cssW, cssH);
        }
      }
    }

    void paint();
    return () => {
      cancelled = true;
    };
  }, [item, width, height, mode, pad]);

  const caption =
    mode === "fill" ? "Fill crops the overflow to cover the frame" : mode === "fit" ? "Fit pads the unused frame" : "Stretch distorts to the frame";

  return (
    <section className="rounded-lg border border-line bg-surface p-3 sm:p-4">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Preview</p>
          <p className="mt-1 font-mono text-xs tabular-nums text-fg">
            {origW && origH ? (
              <>
                {origW}×{origH}
                <span className="mx-1.5 text-muted">→</span>
                {width}×{height}
              </>
            ) : (
              <>
                target {width}×{height}
              </>
            )}
          </p>
        </div>
        {kind !== "same" && origW > 0 && (
          <span
            className={cn(
              "rounded-md px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider",
              kind === "up" ? "bg-warn/15 text-warn" : "bg-accent/15 text-accent",
            )}
          >
            {kind === "up" ? "Upscaled" : "Downscaled"}
          </span>
        )}
      </div>

      <div className="checkerboard relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-md border border-line">
        <div className="relative">
            {item && !item.error ? (
              <canvas ref={canvasRef} className="block max-h-[360px] max-w-full" />
            ) : (
              <div
                className="bg-elevated/40"
                style={{
                  width: `${Math.min(280, 280 * (width / height))}px`,
                  height: `${Math.min(280, 280 * (height / width))}px`,
                  maxWidth: "100%",
                }}
              />
            )}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-y-0 left-1/3 w-px bg-fg/25" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-fg/25" />
            <div className="absolute inset-x-0 top-1/3 h-px bg-fg/25" />
            <div className="absolute inset-x-0 top-2/3 h-px bg-fg/25" />
            <span className="absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-accent" />
            <span className="absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-accent" />
            <span className="absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-accent" />
            <span className="absolute right-1 bottom-1 h-3 w-3 border-r-2 border-b-2 border-accent" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted">{caption}. Canvas resample — not lossless JPEG, not AI upscale.</p>
    </section>
  );
}

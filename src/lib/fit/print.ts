import { MAX_EDGE, clampEdge } from "@/lib/fit/resize";

export type PaperUnit = "in" | "cm";

export type PaperPreset = {
  id: string;
  label: string;
  unit: PaperUnit;
  width: number;
  height: number;
};

/** Photo-lab and document paper sizes. Not social pixel presets. */
export const PAPER_PRESETS: PaperPreset[] = [
  { id: "4x6", label: "4×6″", unit: "in", width: 4, height: 6 },
  { id: "10x15", label: "10×15 cm", unit: "cm", width: 10, height: 15 },
  { id: "a6", label: "A6", unit: "cm", width: 10.5, height: 14.8 },
  { id: "passport", label: "Passport 2×2″", unit: "in", width: 2, height: 2 },
  { id: "a4", label: "A4", unit: "cm", width: 21, height: 29.7 },
];

export const DPI_PRESETS = [72, 150, 300, 600] as const;

export const DEFAULT_DPI = 300;

export function toInches(value: number, unit: PaperUnit): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return unit === "in" ? value : value / 2.54;
}

export function convertPaper(value: number, from: PaperUnit, to: PaperUnit): number {
  if (from === to) return value;
  if (from === "in" && to === "cm") return value * 2.54;
  return value / 2.54;
}

export function clampDpi(n: number): number {
  if (!Number.isFinite(n) || n <= 0) return DEFAULT_DPI;
  return Math.min(1200, Math.max(36, Math.round(n)));
}

/**
 * Paper size × DPI → integer pixels.
 * If the long edge would exceed MAX_EDGE (8192), scale both sides so the
 * paper aspect stays intact. Independent clamp per side would warp A4.
 */
export function paperToPixels(
  width: number,
  height: number,
  unit: PaperUnit,
  dpi: number,
): { width: number; height: number; clamped: boolean } {
  const d = clampDpi(dpi);
  let pxW = toInches(width, unit) * d;
  let pxH = toInches(height, unit) * d;
  if (!Number.isFinite(pxW) || pxW <= 0) pxW = 1;
  if (!Number.isFinite(pxH) || pxH <= 0) pxH = 1;
  const long = Math.max(pxW, pxH);
  let clamped = false;
  if (long > MAX_EDGE) {
    const scale = MAX_EDGE / long;
    pxW *= scale;
    pxH *= scale;
    clamped = true;
  }
  return {
    width: clampEdge(pxW),
    height: clampEdge(pxH),
    clamped,
  };
}

export function formatPaper(width: number, height: number, unit: PaperUnit): string {
  const mark = unit === "in" ? "″" : " cm";
  const digits = unit === "in" ? 2 : 1;
  const w = Number.isInteger(width) ? String(width) : width.toFixed(digits);
  const h = Number.isInteger(height) ? String(height) : height.toFixed(digits);
  return `${w}×${h}${mark}`;
}

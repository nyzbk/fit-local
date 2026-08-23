import type { AspectShortcut, Preset } from "./types";

export const MAX_EDGE = 8192;

function clampEdge(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_EDGE, Math.max(1, Math.round(n)));
}

export const PRESETS: Preset[] = [
  { id: "ig-post", label: "IG Post 1080×1080", width: 1080, height: 1080 },
  { id: "ig-portrait", label: "IG Portrait 1080×1350", width: 1080, height: 1350 },
  { id: "ig-story", label: "IG Story/Reel 1080×1920", width: 1080, height: 1920 },
  { id: "yt-thumb", label: "YouTube Thumb 1280×720", width: 1280, height: 720 },
  { id: "x-post", label: "X Post 1600×900", width: 1600, height: 900 },
  { id: "x-header", label: "X Header 1500×500", width: 1500, height: 500 },
  { id: "tiktok", label: "TikTok 1080×1920", width: 1080, height: 1920 },
  { id: "linkedin", label: "LinkedIn 1200×627", width: 1200, height: 627 },
  { id: "facebook", label: "Facebook 1200×630", width: 1200, height: 630 },
  { id: "pinterest", label: "Pinterest 1000×1500", width: 1000, height: 1500 },
];

export const ASPECTS: AspectShortcut[] = [
  { id: "original", label: "Original", ratio: "original" },
  { id: "1-1", label: "1:1", ratio: [1, 1] },
  { id: "4-5", label: "4:5", ratio: [4, 5] },
  { id: "9-16", label: "9:16", ratio: [9, 16] },
  { id: "16-9", label: "16:9", ratio: [16, 9] },
  { id: "4-3", label: "4:3", ratio: [4, 3] },
  { id: "3-2", label: "3:2", ratio: [3, 2] },
];

export function sizeFromAspect(
  ratio: [number, number],
  currentW: number,
  currentH: number,
): { width: number; height: number } {
  const long = Math.max(currentW, currentH, 1);
  const [rw, rh] = ratio;
  if (rw >= rh) {
    return { width: clampEdge(long), height: clampEdge(long * (rh / rw)) };
  }
  return { width: clampEdge(long * (rw / rh)), height: clampEdge(long) };
}

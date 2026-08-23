import { stemName } from "@/lib/utils";
import { MAX_EDGE } from "./presets";
import type { Mode, OutputChoice, OutputType, PadColor, ResizeOptions } from "./types";

export { MAX_EDGE };

const EXT: Record<OutputType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export function clampEdge(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_EDGE, Math.max(1, Math.round(n)));
}

export function outputExt(type: OutputType): string {
  return EXT[type];
}

export function mimeFromFile(file: File): OutputType {
  const type = file.type.toLowerCase();
  if (type === "image/jpeg" || type === "image/jpg") return "image/jpeg";
  if (type === "image/webp") return "image/webp";
  if (type === "image/png") return "image/png";
  const name = file.name.toLowerCase();
  if (/\.jpe?g$/.test(name)) return "image/jpeg";
  if (/\.webp$/.test(name)) return "image/webp";
  return "image/png";
}

export function resolveOutput(file: File, choice: OutputChoice): OutputType {
  if (choice === "keep") return mimeFromFile(file);
  return choice;
}

export function isLossy(type: OutputType): boolean {
  return type === "image/jpeg" || type === "image/webp";
}

export function scaleKind(mode: Mode, srcW: number, srcH: number, destW: number, destH: number): "up" | "down" | "same" {
  let scale: number;
  if (mode === "fill") scale = Math.max(destW / srcW, destH / srcH);
  else if (mode === "fit") scale = Math.min(destW / srcW, destH / srcH);
  else scale = Math.max(destW / srcW, destH / srcH);
  if (scale > 1.001) return "up";
  if (scale < 0.999) return "down";
  return "same";
}

async function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode this image on this device."));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

export async function supportsWebp(): Promise<boolean> {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  try {
    const blob = await toBlob(canvas, "image/webp", 0.8);
    return blob.type === "image/webp" && blob.size > 0;
  } catch {
    return false;
  }
}

function memoryError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);
  if (/memory|allocation|source image is too large/i.test(message)) {
    return new Error("This image is too large for this device’s memory. Try a smaller photo.");
  }
  return new Error("Could not read this image in the browser.");
}

export async function decodeBitmap(file: File): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch (first) {
    try {
      return await createImageBitmap(file);
    } catch (second) {
      throw memoryError(second ?? first);
    }
  }
}

export function drawResized(
  ctx: CanvasRenderingContext2D,
  source: ImageBitmap | HTMLImageElement | HTMLCanvasElement,
  destW: number,
  destH: number,
  mode: Mode,
  pad: PadColor,
  jpeg: boolean,
): void {
  const srcW = "width" in source ? source.width : destW;
  const srcH = "height" in source ? source.height : destH;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if (jpeg || mode === "fit") {
    ctx.fillStyle = mode === "fit" ? pad : "#ffffff";
    ctx.fillRect(0, 0, destW, destH);
  } else {
    ctx.clearRect(0, 0, destW, destH);
  }

  if (mode === "stretch") {
    ctx.drawImage(source, 0, 0, destW, destH);
    return;
  }

  if (mode === "fill") {
    const scale = Math.max(destW / srcW, destH / srcH);
    const dw = srcW * scale;
    const dh = srcH * scale;
    const dx = (destW - dw) / 2;
    const dy = (destH - dh) / 2;
    ctx.drawImage(source, dx, dy, dw, dh);
    return;
  }

  const scale = Math.min(destW / srcW, destH / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  const dx = (destW - dw) / 2;
  const dy = (destH - dh) / 2;
  ctx.drawImage(source, dx, dy, dw, dh);
}

export async function resizeImage(
  file: File,
  origW: number,
  origH: number,
  opts: ResizeOptions,
): Promise<{
  blob: Blob;
  width: number;
  height: number;
  filename: string;
  originalSize: number;
  newSize: number;
  origW: number;
  origH: number;
  upscaled: boolean;
}> {
  const width = clampEdge(opts.width);
  const height = clampEdge(opts.height);
  let outputType = resolveOutput(file, opts.output);
  if (outputType === "image/webp") {
    const ok = await supportsWebp();
    if (!ok) outputType = "image/jpeg";
  }
  const quality = Math.min(1, Math.max(0.7, opts.quality));

  const bitmap = await decodeBitmap(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: outputType !== "image/jpeg" });
    if (!ctx) throw new Error("Canvas is not available in this browser.");

    drawResized(ctx, bitmap, width, height, opts.mode, opts.pad, outputType === "image/jpeg");

    const blob = await toBlob(canvas, outputType, isLossy(outputType) ? quality : 1);
    canvas.width = 0;
    canvas.height = 0;

    const stem = stemName(file.name);
    const upscaled = scaleKind(opts.mode, origW || bitmap.width, origH || bitmap.height, width, height) === "up";

    return {
      blob,
      width,
      height,
      filename: `${stem}-${width}x${height}.${EXT[outputType]}`,
      originalSize: file.size,
      newSize: blob.size,
      origW: origW || bitmap.width,
      origH: origH || bitmap.height,
      upscaled,
    };
  } finally {
    bitmap.close();
  }
}

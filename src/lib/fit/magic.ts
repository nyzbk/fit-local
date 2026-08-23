export const WARN_FILE_BYTES = 25 * 1024 * 1024;
export const MAX_FILE_BYTES = 80 * 1024 * 1024;

const HEIC_BRANDS = new Set(["heic", "heix", "heif", "heis", "heim", "mif1", "msf1"]);

function ascii(bytes: Uint8Array, start: number, len: number): string {
  return String.fromCharCode(...bytes.slice(start, start + len));
}

export function isHeicFile(file: File, head: Uint8Array): boolean {
  const name = file.name.toLowerCase();
  if (/\.(heic|heif|hif)$/.test(name)) return true;
  const type = file.type.toLowerCase();
  if (type.includes("heic") || type.includes("heif")) return true;
  if (head.length >= 12 && ascii(head, 4, 4) === "ftyp") {
    const brand = ascii(head, 8, 4).toLowerCase();
    if (HEIC_BRANDS.has(brand)) return true;
  }
  return false;
}

export function looksLikeImage(head: Uint8Array): boolean {
  if (head.length < 4) return false;
  if (head[0] === 0xff && head[1] === 0xd8) return true;
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return true;
  if (head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46) return true;
  if (head[0] === 0x42 && head[1] === 0x4d) return true;
  if (
    head[0] === 0x52 &&
    head[1] === 0x49 &&
    head[2] === 0x46 &&
    head[3] === 0x46 &&
    head.length >= 12 &&
    head[8] === 0x57 &&
    head[9] === 0x45 &&
    head[10] === 0x42 &&
    head[11] === 0x50
  ) {
    return true;
  }
  return false;
}

export function isAcceptedExtOrMime(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  const typeOk =
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/webp" ||
    type === "image/bmp" ||
    type === "image/gif";
  const extOk = /\.(jpe?g|png|webp|bmp|gif)$/.test(name);
  return typeOk || extOk;
}

export const HEIC_MESSAGE = "Convert in HEIC Local first, then Fit";

export async function inspectFile(file: File): Promise<{ ok: true } | { ok: false; error: string }> {
  if (file.size <= 0) return { ok: false, error: "This file is empty." };
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "This file is too large for this device’s memory. Try a smaller image." };
  }
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (isHeicFile(file, head)) {
    return { ok: false, error: HEIC_MESSAGE };
  }
  if (!isAcceptedExtOrMime(file) && !looksLikeImage(head)) {
    return { ok: false, error: "Only JPG, PNG, WebP, BMP, or GIF files are accepted." };
  }
  if (!looksLikeImage(head)) {
    return { ok: false, error: "This file does not look like a valid image." };
  }
  return { ok: true };
}

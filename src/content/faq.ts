export const FAQ = [
  {
    q: "What is the difference between Fill, Fit, and Stretch?",
    a: "Fill (default) covers the target frame and center-crops overflow — like CSS background-size: cover. Fit contains the whole photo and pads the leftover with black or white. Stretch distorts the image to the exact width and height. Fill is what Instagram-style crops usually need.",
  },
  {
    q: "How is Fit different from Crush?",
    a: "Crush compresses file size (quality / max edge). Fit resizes to exact pixels or social presets. Use Crush to shrink bytes; use Fit to hit 1080×1080, 1280×720, 1600×900, and the rest. Shift converts formats (WebP/AVIF). Strip removes EXIF/GPS. They do not replace each other.",
  },
  {
    q: "What Instagram, YouTube, and X sizes do you include?",
    a: "IG Post 1080×1080, IG Portrait 1080×1350, IG Story/Reel 1080×1920, YouTube Thumb 1280×720, X Post 1600×900, X Header 1500×500, plus TikTok 1080×1920, LinkedIn 1200×627, Facebook 1200×630, and Pinterest 1000×1500. Custom width × height is always available, max edge 8192.",
  },
  {
    q: "Can I resize HEIC photos from iPhone?",
    a: "Not in this tab. HEIC is rejected on purpose with “Convert in HEIC Local first, then Fit”. Convert to JPG or PNG at heic-local.vercel.app, then drop the result here. That keeps Fit a pure Canvas resizer.",
  },
  {
    q: "Does Download ZIP upload my photos?",
    a: "No. The ZIP is built in the browser with JSZip from the Canvas blobs already in memory. The file is named fit-{n}-images.zip. Nothing is posted to a server.",
  },
  {
    q: "What does Quality do? Is JPEG lossless?",
    a: "Quality 0.70–1.00 (default 0.92) applies only to JPG and WebP. PNG is lossless pixels-in-pixels-out from the canvas, but the resize itself is still a Canvas resample — not a lossless JPEG transcode and not an AI upscaler. Enlarging shows an Upscaled badge because new pixels are interpolated.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, login, or email wall before download. There is no watermark and no daily quota. Soft memory limits are the only cap — very large files may fail on the device, not because of an artificial product limit.",
  },
  {
    q: "Who made Fit?",
    a: "Ultimatum, a brand-marketing studio. Other private browser tools: Crush (compress), Shift (WebP/AVIF), Strip (EXIF/GPS), HEIC Local, Folio (PDF), and Nota (invoices).",
  },
  {
    q: "Do my images leave this device?",
    a: "No. Choose, decode (createImageBitmap), resize (Canvas), encode (toBlob), and zip all happen in this tab. There is no upload endpoint. Standard hosting logs may record the page request itself, never the photo bytes.",
  },
  {
    q: "Will upscaling make my photo sharp?",
    a: "No. Enlarging interpolates pixels. Fit will still produce the exact target size you asked for, and it will label the result Upscaled so the limitation is visible. For a smaller social frame, prefer Fill or Fit downward.",
  },
];

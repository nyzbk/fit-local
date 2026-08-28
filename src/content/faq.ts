export const FAQ = [
  {
    q: "What is the difference between Fill, Fit, and Stretch?",
    a: "Fill (default) covers the target frame and center-crops overflow — the same idea as CSS background-size: cover. Fit contains the whole photo and pads leftover space with black or white. Stretch distorts the image to the exact width and height. For Instagram feed squares, Fill is usually what you want. For a full product shot that must not be cropped, use Fit. Stretch is for banners where you already accept distortion or the source already matches the ratio.",
  },
  {
    q: "Does Fit upload my photos to a server?",
    a: "No. Choose, decode (createImageBitmap), resize (Canvas 2D), encode (toBlob), and zip (JSZip) all happen in this browser tab. There is no conversion API and no storage bucket. Hosting logs may record that you loaded the page; they do not receive the image bytes.",
  },
  {
    q: "What Instagram, YouTube, and X sizes are built in?",
    a: "IG Post 1080×1080, IG Portrait 1080×1350, IG Story/Reel 1080×1920, YouTube Thumb 1280×720, X Post 1600×900, X Header 1500×500, plus TikTok 1080×1920, LinkedIn 1200×627, Facebook 1200×630, and Pinterest 1000×1500. Custom width × height is always available. The longest edge is capped at 8192 pixels so a phone tab does not run out of memory.",
  },
  {
    q: "Can I resize HEIC photos from iPhone?",
    a: "Not in this tab. HEIC is rejected on purpose. Convert to JPG or PNG first at HEIC Local (heic-local.vercel.app), then drop the result here. Keeping Fit a pure Canvas resizer avoids a heavy decoder and keeps the job of this tool honest: exact pixels, not format conversion.",
  },
  {
    q: "Does Download ZIP upload my photos?",
    a: "No. The ZIP is built in the browser from Canvas blobs already in memory. The archive is named fit-{n}-images.zip. Each file inside is named {stem}-{width}x{height}.{ext}. Nothing is posted to a server to assemble the archive.",
  },
  {
    q: "What does Quality do? Is JPEG lossless?",
    a: "Quality 0.70–1.00 (default 0.92) applies only to JPG and WebP. PNG is lossless pixels-from-canvas. The resize itself is still a Canvas resample — not a lossless JPEG transcode and not an AI upscaler. Enlarging a photo shows an Upscaled badge because new pixels are interpolated.",
  },
  {
    q: "Do I need an account?",
    a: "No. There is no signup, login, or email wall before download. There is no watermark and no daily quota. The only cap is your device: very large files or hundreds of 4K frames may fail because the tab ran out of RAM, not because of an artificial product limit.",
  },
  {
    q: "Will upscaling make a small photo look sharp?",
    a: "No. Enlarging interpolates. Fit still writes the exact target size you asked for, and it labels the result Upscaled so that limitation is visible. For a smaller social frame, prefer Fill or Fit downward from a larger original.",
  },
  {
    q: "Which file types can I drop?",
    a: "JPG, JPEG, PNG, WebP, BMP, and static GIF. Animated GIF is treated as a still (first frame the browser gives Canvas). HEIC/HEIF is rejected with a pointer to HEIC Local. PDF is not an image — use Folio if you need pages, not Fit.",
  },
  {
    q: "Does Fit strip EXIF or GPS?",
    a: "Canvas re-encode typically drops most EXIF because the output is a new bitmap, not a patched JPEG. That is a side effect, not a forensic wipe. If your job is “remove GPS and camera tags and keep the original pixels,” use Strip. If your job is “hit 1080×1080,” use Fit.",
  },
  {
    q: "How is Fit different from Crush, Shift, or Strip?",
    a: "Crush compresses bytes (quality / max edge). Shift changes codec (WebP / AVIF). Strip removes metadata. Fit changes geometry: exact width × height or a social preset, with Fill / Fit / Stretch. Use them in sequence if you need more than one job — they do not replace each other.",
  },
  {
    q: "Does it work on iPhone and iPad?",
    a: "Yes. iOS Safari is a supported path. Use Choose files, pick photos from the library, then Download. If the share sheet is available, you can hand the blob to Files or another app. Very large panoramas may need a lower target size on older phones.",
  },
  {
    q: "Why is my output slightly softer than the original?",
    a: "Resampling is not a lossless crop of JPEG MCU blocks. Fit draws into a Canvas and encodes again. Downscaling is usually fine at quality 0.92. If you only needed to crop without changing pixel count, a dedicated cropper would preserve more of the original encode. Fit’s contract is the target frame, not bit-identical bytes.",
  },
  {
    q: "Who made Fit and how do I contact you?",
    a: "Fit is a free browser tool from Ultimatum, a brand-marketing studio. For the resizer itself, open the Contact page and email ultaultimatum@gmail.com. Do not email photos you need resized — run them in this tab instead. We do not offer recovery of files that never left your device, because we never received them.",
  },
];

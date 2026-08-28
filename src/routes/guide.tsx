import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "How to Resize Images in the Browser — Fit Guide" },
      {
        name: "description",
        content:
          "Step-by-step: resize JPG, PNG and WebP to Instagram, YouTube and X sizes without uploading. Fill, Fit, Stretch, batch ZIP, iPhone notes.",
      },
    ],
  }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <Article
      kicker="Guide"
      title="How to resize images online without uploading them"
      lede="A practical walkthrough of Fit: files, presets, crop modes, quality, ZIP, and what to do with iPhone HEIC."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Guide" },
      ]}
    >
      <p>
        Fit is a browser tab that changes the width and height of photos. It is not a cloud service. If a tutorial
        tells you to “upload to our servers,” that is a different product. Here the file stays in memory until you
        download the result or close the tab.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">1. Choose files</h2>
      <p>
        Use the dropzone or the Choose files button. You can add several images at once. Supported types: JPG, JPEG,
        PNG, WebP, BMP, and static GIF. Each row in the list shows the original name and size. Remove a file with the
        trash control, or clear the whole batch. HEIC from iPhone Camera will be refused with a short message pointing
        you to HEIC Local. Convert there, then drop the JPG or PNG into Fit. That split is intentional: this tool
        resizes, it does not decode every camera container.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">2. Pick a target size</h2>
      <p>
        Tap a preset chip if you already know the platform: IG Post 1080×1080, IG Portrait 1080×1350, Story/Reel
        1080×1920, YouTube Thumb 1280×720, X Post 1600×900, X Header 1500×500, TikTok 1080×1920, LinkedIn 1200×627,
        Facebook 1200×630, Pinterest 1000×1500. Or type width and height. Lock aspect if you want the second number to
        follow the first. Aspect shortcuts (1:1, 4:5, 9:16, 16:9, 4:3, 3:2) adjust the pair without changing the
        longest edge more than they have to. The long edge cannot exceed 8192 pixels. That cap exists so a phone tab
        does not try to allocate a 200 megapixel canvas.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">3. Choose Fill, Fit, or Stretch</h2>
      <p>
        Fill covers the frame and center-crops overflow. Use it for feed squares and thumbnails where a tight crop is
        expected. Fit letterboxes: the whole photo is visible, empty bands are black or white. Use it when a product
        must not lose its edges. Stretch maps the photo onto the rectangle and will look wrong if the ratios differ a
        lot. The preview updates as you change the mode. Rule-of-thirds lines help you see where a face will sit after
        a Fill crop. If the target is larger than the source, the Upscaled badge appears. That is a warning, not a
        promise of extra detail.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">4. Output format and quality</h2>
      <p>
        Keep the original type, or force JPG, PNG, or WebP. Quality 0.70–1.00 (default 0.92) applies to JPG and WebP
        only. PNG ignores the slider because the canvas is written losslessly. Remember: even PNG output is a resample
        of the bitmap, not a bit-identical crop of the original file. If you needed compression without a size change,
        Crush is the other tool. If you needed a codec change without a size change, Shift is the other tool.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">5. Resize, then download</h2>
      <p>
        The Resize button is the primary action. Progress is per file. After success you get one download per image
        and a Download ZIP if there is more than one. Names look like stem-1080x1080.png. On iPhone, if the share
        sheet is available, you can send the blob to Files or Photos. Nothing is posted to a server to finish the
        job.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Mistakes this guide is trying to prevent</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>Uploading a portrait into a landscape preset with Stretch and wondering why faces look wide. Use Fill or Fit.</li>
        <li>Expecting a 400-pixel source to become a sharp 4K print. Fit will emit 4K if you ask; the extra pixels are interpolated.</li>
        <li>Dropping HEIC and thinking the tool is broken. Convert first.</li>
        <li>Using Fit when you only wanted a smaller file at the same pixel count. That is Crush.</li>
        <li>Leaving lock-aspect on and then typing a YouTube 1280×720 that cannot satisfy the lock. Unlock, then type both numbers.</li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">iPhone and iPad notes</h2>
      <p>
        Safari on iOS can pick multiple photos from the library. After Resize, use Download. If the share sheet
        appears, send the file to Files rather than trying to “upload it somewhere to finish.” Very large panoramas
        may fail on older phones — drop the target size or do fewer files at once. HEIC is still rejected here; that
        is not an iOS bug. Convert, then resize. Landscape lock in Control Center does not change the pixel math,
        only how the preview sits on screen.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">If Resize does nothing</h2>
      <p>
        Check that at least one file is in the list and is not marked as an error. A 200 megabyte TIFF-disguised-as-JPG
        can stall the tab; close other apps and try a smaller original. Private mode, content blockers, and low-power
        mode rarely block Canvas, but they can block the download click if a blocker treats blob URLs as tracking.
        Allow downloads for this origin. Still stuck? Email from the contact page with the browser version, not the
        photo.
      </p>
      <p>
        More detail:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/presets">
          social presets
        </a>
        ,{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/modes">
          crop modes
        </a>
        ,{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/faq">
          FAQ
        </a>
        . To run the tool, go back to the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          homepage
        </a>
        .
      </p>
    </Article>
  );
}

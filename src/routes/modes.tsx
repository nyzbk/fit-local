import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";

export const Route = createFileRoute("/modes")({
  head: () => ({
    meta: [
      { title: "Fill vs Fit vs Stretch — Image Resize Modes | Fit" },
      {
        name: "description",
        content:
          "How Fit’s three resize modes crop or pad a photo. Fill is cover + center crop. Fit is contain + pad. Stretch distorts to the exact frame.",
      },
    ],
  }),
  component: ModesPage,
});

function ModesPage() {
  return (
    <Article
      kicker="Modes"
      title="Fill, Fit, Stretch: three ways to hit a frame"
      lede="A 2000×1000 landscape cannot become 1080×1080 without a decision. Fit makes you pick the decision."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Modes" },
      ]}
    >
      <h2 className="font-display text-xl text-fg">Fill (default)</h2>
      <p>
        Fill scales the photo until the target rectangle is completely covered, then crops the overflow from the
        center. It is the same math as CSS background-size: cover. A wide photo into a square loses left and right. A
        tall photo into a square loses top and bottom. Use Fill for Instagram squares, YouTube thumbs, and any place
        the platform will crop you anyway. The preview’s rule-of-thirds overlay is there so you can see whether a
        face survives the crop before you commit.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Fit (contain + pad)</h2>
      <p>
        Fit scales the photo until it is fully visible inside the rectangle. Leftover bands are filled with black or
        white. Nothing is cropped. The result may look like a letterboxed film still. Use Fit for product shots,
        diagrams, screenshots with UI chrome you cannot lose, and any legal or medical image where cropping would
        change meaning. Padding is honest: you see the empty space instead of discovering it after upload.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Stretch</h2>
      <p>
        Stretch maps every source pixel onto the target grid. If the ratios match, you will not notice. If they do
        not, circles become ovals. Use Stretch only when you already accept distortion, or when the source is already
        the same ratio and you just need a different pixel count. It is the least common choice. It exists because
        some banners and email headers were designed to be slammed into a slot.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Worked example</h2>
      <p>
        Source 2000×1000 (2:1). Target IG Post 1080×1080 (1:1). Fill draws a 1080×1080 crop from the center of the
        scaled image — you keep the middle 1000 pixels of width after scale, not the full panorama. Fit draws the
        whole 2:1 photo inside the square with pads above and below (or you switch pad color). Stretch produces
        1080×1080 with people twice as tall as they were. Fit the product (this site) will label an enlarge as
        Upscaled if you asked for more pixels than you had. Downscales do not get that badge.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What Canvas actually does</h2>
      <p>
        After the crop rectangle is known, Fit draws with Canvas 2D and encodes with toBlob. That is a resample, not
        a lossless JPEG recrop. Fine text can soften. If you only needed to trim pixels without a resample, a
        dedicated lossless cropper would be a different tool. Fit’s contract is “this width, this height, this mode.”
        Quality 0.92 is the default encode for JPG/WebP after that draw.
      </p>
      <p>
        Next:{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/guide">
          the full how-to
        </a>{" "}
        or{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          resize a file now
        </a>
        .
      </p>
    </Article>
  );
}

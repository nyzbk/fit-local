import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { PRESETS } from "@/lib/fit/presets";

export const Route = createFileRoute("/presets")({
  head: () => ({
    meta: [
      { title: "Instagram, YouTube, X Image Sizes — Fit Presets" },
      {
        name: "description",
        content:
          "Current pixel sizes for Instagram posts, stories, YouTube thumbnails, X posts and headers, TikTok, LinkedIn, Facebook and Pinterest. Resize them privately in Fit.",
      },
    ],
  }),
  component: PresetsPage,
});

function PresetsPage() {
  return (
    <Article
      kicker="Presets"
      title="Social image sizes Fit actually ships"
      lede="These are the chips on the homepage. They are not decorative — each one writes that exact width and height."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Presets" },
      ]}
    >
      <p>
        Platforms change recommended sizes without a press release. The table below is what Fit encodes today. If a
        network asks for a different frame next year, type custom pixels. The resizer does not call an API to “look up
        the latest spec.”
      </p>
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="bg-elevated text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Preset</th>
              <th className="px-3 py-2 font-medium">Width</th>
              <th className="px-3 py-2 font-medium">Height</th>
              <th className="px-3 py-2 font-medium">Typical use</th>
            </tr>
          </thead>
          <tbody>
            {PRESETS.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="px-3 py-2">{p.label.replace(/ \d.+$/, "")}</td>
                <td className="px-3 py-2 font-mono">{p.width}</td>
                <td className="px-3 py-2 font-mono">{p.height}</td>
                <td className="px-3 py-2 text-muted">
                  {p.id === "ig-post" && "Feed square"}
                  {p.id === "ig-portrait" && "4:5 feed"}
                  {p.id === "ig-story" && "Full-bleed story / reel cover"}
                  {p.id === "yt-thumb" && "16:9 video cover"}
                  {p.id === "x-post" && "Timeline photo"}
                  {p.id === "x-header" && "Profile banner"}
                  {p.id === "tiktok" && "Vertical video cover"}
                  {p.id === "linkedin" && "Link unfurl"}
                  {p.id === "facebook" && "Link unfurl"}
                  {p.id === "pinterest" && "Tall pin"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="pt-6 font-display text-xl text-fg">Instagram</h2>
      <p>
        A square 1080×1080 still reads as a classic post. 1080×1350 (4:5) takes more vertical space in the feed without
        becoming a story. Stories and Reels share 1080×1920. If your camera file is 4:3, Fill will crop top and
        bottom (or sides) to hit those frames. If you cannot lose product edges, Fit and accept padding, then crop
        later in the app if you must.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">YouTube</h2>
      <p>
        Thumbnails are 1280×720. YouTube will letterbox other ratios. Text in the lower third gets covered by
        timestamps, so keep titles in the upper two-thirds. Fit’s Fill mode on a 16:9 still is the usual path. Do not
        upscale a 640×360 screenshot and expect a crisp result; the Upscaled badge is there for that case.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">X (Twitter)</h2>
      <p>
        1600×900 is a wide post that fills the timeline without becoming a tall crop. 1500×500 is the profile header;
        important faces should sit in the middle third because the avatar and UI cover the corners. Custom sizes are
        fine if you are matching an existing brand kit.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Everything else in the chip row</h2>
      <p>
        TikTok 1080×1920 matches Reels. LinkedIn 1200×627 and Facebook 1200×630 are the unfurl cards for shared links.
        Pinterest 1000×1500 is a 2:3 pin that still looks like a pin, not a square leftover from Instagram. None of
        these pages upload the photo. They only set the numbers the canvas will draw.
      </p>
      <p>
        Run the tool on the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          homepage
        </a>
        . Crop behaviour is explained on{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/modes">
          Fill vs Fit vs Stretch
        </a>
        .
      </p>
    </Article>
  );
}

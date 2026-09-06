import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";

const FAQ_YT = [
  {
    q: "Does a 1280×720 export become the video file?",
    a: "No. This tool resizes a still. YouTube thumbnails are images. The encode of the actual video happens in YouTube Studio or your editor. Fit does not mux audio or write an MP4.",
  },
  {
    q: "Why did YouTube pad my thumbnail with black bars?",
    a: "The image was not 16:9, or the subject sat outside the safe area and the UI cropped it. Export 1280×720 and keep titles out of the lower-right timestamp zone.",
  },
  {
    q: "Will a 3840×2160 thumbnail rank better?",
    a: "YouTube downscales the still. Extra pixels do not buy a ranking slot. They can blur text if you scale a small title up. Start at 1280×720 with readable type.",
  },
];

export const Route = createFileRoute("/youtube")({
  head: () => ({
    meta: [
      { title: "YouTube thumbnail size in the browser — Fit" },
      {
        name: "description",
        content:
          "Resize a still to 1280×720 for YouTube thumbnails on this tab. Safe zone and 16:9 frame. Fit does not encode the video.",
      },
    ],
  }),
  component: YoutubePage,
});

function YoutubePage() {
  return (
    <Article
      kicker="Destination"
      title="YouTube wants a 16:9 still. This is not a video encoder."
      lede="1280×720 is the thumbnail box. The film file is a different pipeline. Mix those two jobs and the page becomes a lie."
      crumbs={[
        { href: "/", label: "Fit" },
        { href: "/presets", label: "Presets" },
        { label: "YouTube" },
      ]}
    >
      <p>
        Search results, suggested rows and the watch page all draw a 16:9 card. If you upload a square
        poster, Studio letterboxes it. If you upload a 9:16 story frame, faces sit in a postage stamp.
        Fit exists here so the still already matches the card before you touch Studio.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">The box</h2>
      <p>
        Use 1280×720. That is the documented thumbnail size. A 1920×1080 still also fits 16:9; YouTube
        will scale it. Do not send 1080×1080 and hope. Keep the title and the face inside a centre-safe
        area. The duration badge and the Watch later icon sit on the lower right of the card. Text there
        dies.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What Fit does</h2>
      <p>
        On the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          homepage
        </a>{" "}
        choose the YouTube preset or type 1280 and 720. Fill if the photo can lose edges. Fit-mode if the
        whole poster must stay visible and you accept side bands — then paint those bands in your editor,
        not with Stretch. Download the still. Upload that file in Studio → thumbnail. The video upload is
        a separate button.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">The ceiling this page exists for</h2>
      <p>
        Fit will not write an .mp4, will not set bitrate, will not burn subtitles, will not pass YouTube’s
        thumbnail review if the still is spam or a huge red arrow on a stolen frame. It will not stop
        Studio from recompressing the JPEG. A sharp 1280×720 with large type beats a 4K export of a blurry
        phone snap.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">End screen and chapter art are not this page</h2>
      <p>
        End screens use different safe margins. Chapter images in some layouts are closer to 16:9 cards
        again, but they are not the official custom thumbnail. Do one job: the custom thumbnail still.
        Channel art / banner is a wider strip. Do not reuse the 1280×720 file as a banner.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">If the title looks thin after upload</h2>
      <p>
        You scaled a 400-pixel graphic up. Fit will emit 1280×720 from a small source. The extra pixels
        are invented. Draw type at the target size in a real editor, then only use Fit if you need a
        final pixel snap. Modes are on{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/modes">
          modes
        </a>
        . Instagram frames are on{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/instagram">
          Instagram
        </a>
        .
      </p>
      <FaqSection items={FAQ_YT} />
    </Article>
  );
}

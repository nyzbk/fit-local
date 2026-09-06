import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";

const FAQ_IG = [
  {
    q: "If I export 1080×1080 here, will Instagram keep that file?",
    a: "No. Instagram runs its own encode after upload. Fit only gives you the frame size before that encode. The feed copy you download is not the bytes that sit on their CDN.",
  },
  {
    q: "Why does my story look zoomed after I upload a 1080×1920 export?",
    a: "Stories use a 9:16 frame and then UI chrome eats the edges. If the subject sits on the rim, the app looks zoomed. Leave a quiet margin. Fit cannot see Instagram’s UI crop.",
  },
  {
    q: "Can Fit stop Instagram from softening the photo?",
    a: "No. That is their recompress. Raising JPEG quality here does not lock their quality slider.",
  },
];

export const Route = createFileRoute("/instagram")({
  head: () => ({
    meta: [
      { title: "Instagram photo sizes in the browser — Fit" },
      {
        name: "description",
        content:
          "Resize to Instagram feed, story and reel-cover frames on this tab. Fit sets pixels before upload. It does not turn off Instagram’s own recompress.",
      },
    ],
  }),
  component: InstagramPage,
});

function InstagramPage() {
  return (
    <Article
      kicker="Destination"
      title="Instagram still recompresses the file. Fit only sets the frame."
      lede="Feed, story and reel cover use different boxes. This page is about those boxes — not about beating Instagram’s encoder."
      crumbs={[
        { href: "/", label: "Fit" },
        { href: "/presets", label: "Presets" },
        { label: "Instagram" },
      ]}
    >
      <p>
        People open a resizer because a portrait looks cropped on the grid or a story cuts off a forehead.
        They then expect the downloaded file to look identical after Post. That second hope is not a Fit
        setting. Instagram encodes again. The only job here is to pick the frame so the subject is still
        in the box when their app crops.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Three boxes that are not interchangeable</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Feed still treats a square 1080×1080 as the safe default. A 4:5 portrait (1080×1350) fills more
          of the phone, but neighbours on the grid will letterbox it.
        </li>
        <li>
          Stories and Reels want 1080×1920. The visible subject should sit in the middle third. Stickers,
          captions and the reply bar sit on the top and bottom.
        </li>
        <li>
          A reel cover is not the reel file. It is a still that also gets letterboxed in places. Do not
          send a 1920×1080 landscape and hope the app “understands cinema.”
        </li>
      </ul>
      <h2 className="pt-4 font-display text-xl text-fg">What Fit does on this origin</h2>
      <p>
        On the{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/">
          homepage
        </a>{" "}
        pick the Instagram preset, or type the two numbers. Fill keeps the crop tight. Fit (the mode, not
        the product name) letterboxes. Stretch warps faces — leave it alone for portraits. Batch ZIP if
        you have a week of posts. Nothing leaves the tab.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">The ceiling this page exists for</h2>
      <p>
        After you tap Share in Instagram, their pipeline decides quality, sharpening and sometimes a second
        crop. Fit cannot disable that. A 4K export does not become a 4K grid tile. If the original is 800
        pixels wide, stretching it to 1080 does not invent detail — it only matches the box.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Practical sequence</h2>
      <ol className="list-decimal space-y-2 pl-5">
        <li>Decide feed vs story vs cover first. Do not reuse one export for all three.</li>
        <li>
          Open{" "}
          <a className="text-accent underline-offset-4 hover:underline" href="/presets">
            presets
          </a>{" "}
          if you want the pixel list, then come back here for the crop warning.
        </li>
        <li>
          Use Fill when the background is disposable. Use Fit-mode when you must keep the whole prop in
          frame and can stand a quiet edge.
        </li>
        <li>Download, then upload. If the live tile still looks soft, that is Instagram, not a broken slider.</li>
      </ol>
      <h2 className="pt-4 font-display text-xl text-fg">What this page will not claim</h2>
      <p>
        It will not claim a hidden “Instagram quality lock.” It will not decode HEIC. It will not schedule
        posts. For YouTube covers use{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/youtube">
          the YouTube page
        </a>
        . For circular profile cuts use{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/avatar">
          avatar
        </a>
        . Crop modes are explained on{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/modes">
          modes
        </a>
        .
      </p>
      <FaqSection items={FAQ_IG} />
    </Article>
  );
}

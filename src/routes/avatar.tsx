import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";
import { FaqSection } from "@/components/site/FaqSection";

const FAQ_AV = [
  {
    q: "I exported a square. Why is the ear missing on X?",
    a: "X draws a circle on top of the square. Corners disappear. Put the face in the centre and leave cheek room. Fit does not draw the circle for you.",
  },
  {
    q: "Is 400×400 enough for LinkedIn?",
    a: "LinkedIn asks for a square and then masks it. 400×400 is a common minimum. A larger square is fine if the face stays centred. A 16:9 banner is a different file.",
  },
  {
    q: "Can Fit preview the circular mask?",
    a: "Not as a live platform UI. Use Fill on a square preset and keep the subject off the corners. If you need a pixel-perfect circle, do that in an editor that shows the mask.",
  },
];

export const Route = createFileRoute("/avatar")({
  head: () => ({
    meta: [
      { title: "Square avatar crop for X and LinkedIn — Fit" },
      {
        name: "description",
        content:
          "Resize a profile photo to a square in the browser so circular masks on X and LinkedIn do not clip the face. Fit does not apply their circle for you.",
      },
    ],
  }),
  component: AvatarPage,
});

function AvatarPage() {
  return (
    <Article
      kicker="Destination"
      title="The platform draws a circle. Your file is still a square."
      lede="Avatars fail when the face sits in a corner that the circle deletes. This is a crop problem, not a megapixel problem."
      crumbs={[
        { href: "/", label: "Fit" },
        { href: "/presets", label: "Presets" },
        { label: "Avatar" },
      ]}
    >
      <p>
        X, LinkedIn, Slack and a dozen comment widgets take a square, then paint a circle. If you send a
        16:9 selfie, the crop eats a shoulder or a hairline. If you send a square with the face on the
        left third, the circle eats the ear. Fit can emit the square. It cannot log into those sites and
        preview their CSS.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">The box</h2>
      <p>
        Start with a square. 400×400 is a workable floor. 800×800 or 1080×1080 is safer if the source
        has the pixels. Do not upscale a 120-pixel icon and expect skin texture. Keep both eyes inside
        the middle 70 percent. Hats, mics and tall hair need more headroom than you think.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">What Fit does</h2>
      <p>
        Homepage → square preset or type equal width and height. Fill is the usual mode: it crops the
        long side. Nudge the crop so the nose sits near centre — the tool’s crop frame is a rectangle,
        not a circle, so imagine the circle inside that rectangle. Download. Upload on the site. Check
        the live circle. If an ear is gone, come back and shift the crop. That loop is the product.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">The ceiling this page exists for</h2>
      <p>
        Fit will not apply X’s circle, LinkedIn’s circle, or Discord’s squircle. It will not remove a
        background. It will not generate a face. Banner / cover photos are wide rectangles; they are not
        avatars. A YouTube thumbnail is 16:9 — use{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/youtube">
          YouTube
        </a>
        . An Instagram grid tile is a different social box — use{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/instagram">
          Instagram
        </a>
        .
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">LinkedIn banner vs avatar</h2>
      <p>
        People paste one landscape into both slots. The banner wants a wide strip with the subject offset
        because the avatar overlaps it. The avatar wants a tight square. Two exports. Two presets. Modes
        explained on{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/modes">
          modes
        </a>
        .
      </p>
      <FaqSection items={FAQ_AV} />
    </Article>
  );
}

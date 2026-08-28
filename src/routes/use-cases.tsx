import { createFileRoute } from "@tanstack/react-router";
import { Article } from "@/components/site/Article";

export const Route = createFileRoute("/use-cases")({
  head: () => ({
    meta: [
      { title: "When to Use a Private Image Resizer | Fit" },
      {
        name: "description",
        content:
          "Use cases for Fit: social teams, shops, newsletters, listings, and anyone who should not upload photos to a random converter.",
      },
    ],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  return (
    <Article
      kicker="Use cases"
      title="Who actually needs a resizer that does not upload"
      lede="Fit is a small tool. These are the jobs it is built for — not a generic ‘everyone should convert files’ page."
      crumbs={[
        { href: "/", label: "Fit" },
        { label: "Use cases" },
      ]}
    >
      <h2 className="font-display text-xl text-fg">Social and short-form video</h2>
      <p>
        A creator with a folder of stills from a shoot should not have to push every frame through a website that
        keeps copies. Drop the batch, hit IG Portrait or Story, Fill crop, ZIP. YouTube thumbs are a separate pass at
        1280×720. The filenames carry the size so an editor can see 1080x1920 versus 1280x720 without opening each
        file.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Shops and catalogues</h2>
      <p>
        Marketplaces reject images that are too small, too large, or the wrong ratio. Fit lets a shop owner hit a
        square packshot without sending product photos — sometimes unpublished — to a third-party converter. Fit mode
        (contain + pad) keeps the whole SKU in frame when a crop would cut a label.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Newsletters and unfurl cards</h2>
      <p>
        LinkedIn 1200×627 and Facebook 1200×630 exist as chips because link previews look amateur when a 4:3 camera
        file is auto-cropped by the network. Resize once, attach the result, and the card is the crop you approved.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Listings and flyers</h2>
      <p>
        Property photos, event posters, and menu specials often start as a phone panorama. Fill into the slot the
        listing site documents. If the site is picky about megabytes after the pixel count is right, run Crush next.
        Fit does not replace a compressor; it sets the frame.
      </p>
      <h2 className="pt-4 font-display text-xl text-fg">Anyone under a policy or a contract</h2>
      <p>
        Schools, clinics, legal teams, and journalists regularly have photos they are allowed to process locally and
        not allowed to park on a random SaaS. Fit has no account and no upload endpoint. We cannot recover a file you
        resized, because we never received it. That is the point. See{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/privacy">
          Privacy
        </a>{" "}
        and{" "}
        <a className="text-accent underline-offset-4 hover:underline" href="/contact">
          Contact
        </a>
        .
      </p>
      <p>
        Fit is the wrong tool if you need PDF merge (Folio), HEIC decode (HEIC Local), metadata wipe as the primary
        job (Strip), or format conversion (Shift). Use those instead of stretching this resizer into a suite it is
        not.
      </p>
    </Article>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CONTENT_LASTMOD, SITE_ORIGIN } from "@/content/contact";

const PATHS = [
  "/",
  "/guide",
  "/print",
  "/presets",
  "/instagram",
  "/youtube",
  "/avatar",
  "/modes",
  "/use-cases",
  "/faq",
  "/contact",
  "/about",
  "/privacy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = SITE_ORIGIN;
        const lastmod = CONTENT_LASTMOD;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((path) => {
  const loc = path === "/" ? `${origin}/` : `${origin}${path}`;
  const priority =
    path === "/"
      ? "1.0"
      : ["/guide", "/print", "/presets", "/instagram", "/youtube", "/avatar"].includes(path)
        ? "0.9"
        : "0.8";
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

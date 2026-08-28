import { createFileRoute } from "@tanstack/react-router";

const PATHS = [
  "/",
  "/guide",
  "/presets",
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
      GET: async ({ request }: { request: Request }) => {
        const origin = new URL(request.url).origin;
        const lastmod = new Date().toISOString().slice(0, 10);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map((path) => {
  const loc = `${origin}${path === "/" ? "" : path}`;
  const priority = path === "/" ? "1.0" : path === "/guide" || path === "/presets" ? "0.9" : "0.8";
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

import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { AdUnit } from "@/components/ads/AdUnit";

type Crumb = { href?: string; label: string };

export function Article({
  kicker,
  title,
  lede,
  crumbs,
  children,
}: {
  kicker: string;
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  children: ReactNode;
}) {
  return (
    <AppShell>
      <main className="mx-auto max-w-3xl px-4 py-12">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap gap-1">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 ? <span aria-hidden="true">/</span> : null}
                  {c.href ? (
                    <a href={c.href} className="hover:text-fg">
                      {c.label}
                    </a>
                  ) : (
                    <span className="text-fg">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{kicker}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">{title}</h1>
        {lede ? <p className="mt-4 text-pretty text-lg text-muted">{lede}</p> : null}
        <div className="article-prose mt-8 space-y-4 text-sm leading-relaxed text-fg/90">{children}</div>
      </main>
      <AdUnit slot="mid" className="mx-auto max-w-3xl px-4" />
      <SoftAgencyCta />
    </AppShell>
  );
}

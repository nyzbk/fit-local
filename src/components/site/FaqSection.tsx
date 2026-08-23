import { FAQ } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">FAQ</p>
      <h2 className="mt-2 font-display text-2xl">Straight answers</h2>
      <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface">
        {FAQ.map((item) => (
          <details key={item.q} className="group px-4 py-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-3 text-left text-sm font-medium">
              {item.q}
              <span className="text-muted transition-transform duration-150 group-open:rotate-45">+</span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

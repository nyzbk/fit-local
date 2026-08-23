import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function SoftAgencyCta({ className }: Props) {
  const url = (import.meta.env.VITE_AGENCY_URL as string | undefined) || "#";
  const name = (import.meta.env.VITE_AGENCY_NAME as string | undefined) || "Ultimatum";

  return (
    <section className={cn("mx-auto max-w-5xl px-4 py-10", className)}>
      <p className="max-w-xl text-sm leading-relaxed text-muted">
        Built by {name} — $10k websites, brand systems, and private browser tools.{" "}
        <a href={url} className="font-medium text-accent underline-offset-4 hover:underline" rel="noopener noreferrer">
          See the studio
        </a>
        . This is not an ad.
      </p>
    </section>
  );
}

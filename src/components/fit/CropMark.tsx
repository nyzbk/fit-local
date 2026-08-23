import { cn } from "@/lib/utils";

export function CropMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      className={cn("text-accent", className)}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12V6h6M20 6h6v6M26 20v6h-6M12 26H6v-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

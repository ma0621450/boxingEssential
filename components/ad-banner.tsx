import { cn } from "@/lib/utils";

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <div className={cn("my-8 flex items-center justify-center", className)}>
      <div className="w-full max-w-[728px] h-[90px] bg-secondary/20 rounded-lg border border-dashed border-border/60 flex items-center justify-center text-muted-foreground/50 text-xs uppercase tracking-wider">
        Advertisement
      </div>
    </div>
  );
}

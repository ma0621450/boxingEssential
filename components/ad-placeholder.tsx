export function AdPlaceholder({ location, className = "" }: { location: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-secondary/20 border border-border/20 rounded-md text-muted-foreground/40 text-xs ${className}`}
      aria-hidden="true"
    >
      Ad: {location}
    </div>
  );
}

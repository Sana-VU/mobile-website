import { cn } from "@/lib/utils";

// Simple pulse skeleton that inherits rounded corners from utilities
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Rounded pill badge used for quick highlights
const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/90 text-primary-foreground shadow hover:bg-primary",
        secondary:
          "border-transparent bg-secondary/20 text-secondary-foreground hover:bg-secondary/30",
        destructive:
          "border-transparent bg-destructive/90 text-primary-foreground shadow hover:bg-destructive",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
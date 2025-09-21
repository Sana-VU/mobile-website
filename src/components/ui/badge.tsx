import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Rounded pill badge used for chips and highlights - Secondary #7C3AED for accents
const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-semibold transition-smooth",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-soft hover:bg-primary-hover",
        secondary:
          "border-transparent bg-secondary/15 text-secondary hover:bg-secondary/25 shadow-soft",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-soft hover:bg-red-600",
        outline:
          "border-border text-foreground hover:bg-accent transition-smooth",
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

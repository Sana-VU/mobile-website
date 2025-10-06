import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-slate-900 text-white dark:bg-white dark:text-slate-900",
        outline: "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300",
        success: "border-transparent bg-emerald-500/15 text-emerald-600",
        warning: "border-transparent bg-amber-400/15 text-amber-600"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

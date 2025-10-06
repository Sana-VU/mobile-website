import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-soft backdrop-blur transition hover:border-slate-300 hover:shadow-lg dark:border-slate-800/60 dark:bg-slate-900/70",
        className
      )}
      {...props}
    />
  );
}

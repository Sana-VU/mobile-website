// Accessible Select component (shadcn/ui style)
import * as React from "react";
import { cn } from "@/lib/utils";

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "rounded-2xl border border-border bg-surface px-3 py-2 text-sm shadow-soft focus:outline-none focus:ring-2 focus:ring-primary",
        props.className
      )}
    >
      {children}
    </select>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export function SelectItem({
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props}>{children}</option>;
}
export function SelectTrigger({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
export function SelectValue({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
}

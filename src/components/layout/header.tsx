import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background pt-safe-top",
        className
      )}
    >
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center">
          <span className="font-bold text-xl mr-2">WhatMobile</span>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
}

export function Header({ className, onMenuClick }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 pb-2 pt-safe-top shadow-soft backdrop-blur-lg",
        className
      )}
    >
      <div className="container flex flex-col gap-3 px-4">
        <div className="flex items-center gap-3 pt-3">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open navigation"
              onClick={onMenuClick}
              className="rounded-2xl"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              WhatMobile
            </span>
            <span className="hidden text-sm text-text-muted sm:inline">
              Discover. Compare. Decide.
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
        <SearchBar className="w-full" />
      </div>
    </header>
  );
}
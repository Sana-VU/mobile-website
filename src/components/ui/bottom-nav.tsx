"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LayoutGrid,
  GitCompare,
  Newspaper,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  pathname: string;
}

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/brands", label: "Brands", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/blog", label: "Blog", icon: Newspaper },
];

export function BottomNav({ pathname }: BottomNavProps) {
  const activeHref = useMemo(() => {
    const active = navItems.find((item) =>
      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
    );
    return active?.href ?? "/";
  }, [pathname]);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 block border-t border-border/80 bg-surface/80 pb-safe-bottom shadow-soft backdrop-blur-lg md:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-xl items-center justify-between gap-1 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeHref === item.href;
          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex w-full flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium transition-all duration-soft ease-soft-spring",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-text-subtle hover:bg-accent/60 hover:text-accent-foreground"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "mb-1 h-5 w-5",
                    isActive ? "text-primary" : "text-text-muted"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
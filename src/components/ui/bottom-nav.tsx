"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LayoutGrid,
  GitCompare,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  pathname: string;
}

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/phones", label: "Phones", icon: Smartphone },
  { href: "/brands", label: "Brands", icon: LayoutGrid },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/search", label: "Search", icon: SearchIcon },
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
      className="fixed inset-x-0 bottom-0 z-50 block border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:bg-neutral-950/60 md:hidden safe-area-bottom"
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
                  "flex w-full flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-medium transition-all",
                  isActive
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "mb-1 h-5 w-5",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-neutral-600 dark:text-neutral-400"
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

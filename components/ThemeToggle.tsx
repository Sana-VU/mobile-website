"use client";

import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/50 bg-white/60 text-slate-700 shadow backdrop-blur transition hover:bg-white dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}

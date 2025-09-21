"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("", className)} {...props}>
        <Button variant="outline" size="icon" disabled>
          <div className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Loading theme</span>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("", className)} {...props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative h-9 w-9 border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className={cn(
              "cursor-pointer flex items-center gap-2 px-3 py-2",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "text-gray-900 dark:text-gray-100",
              theme === "light" &&
                "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            )}
          >
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className={cn(
              "cursor-pointer flex items-center gap-2 px-3 py-2",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "text-gray-900 dark:text-gray-100",
              theme === "dark" &&
                "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            )}
          >
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className={cn(
              "cursor-pointer flex items-center gap-2 px-3 py-2",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "text-gray-900 dark:text-gray-100",
              theme === "system" &&
                "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
            )}
          >
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

"use client";
import Link from "next/link";
import { Home, Grid, GitCompare, Search, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/brands", label: "Brands", icon: Grid },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/search", label: "Search", icon: Search },
  { href: "/blog", label: "Blog", icon: FileText },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/50 shadow-lg md:hidden pb-safe-bottom">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[3.5rem] flex-1 px-2 py-1 rounded-xl transition-all duration-200 group ${
                active 
                  ? "text-primary bg-primary/10 scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              <div className={`relative mb-1 ${active ? "animate-pulse" : ""}`}>
                <Icon
                  className={`w-5 h-5 transition-all duration-200 ${
                    active 
                      ? "text-primary drop-shadow-sm" 
                      : "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
                  }`}
                />
                {active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </div>
              <span
                className={`text-xs font-medium transition-all duration-200 ${
                  active 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

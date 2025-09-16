"use client";
import Link from "next/link";
import { Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container flex items-center justify-between py-3 px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 group"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <span className="hidden sm:block font-bold text-xl bg-gradient-to-r from-primary via-blue-600 to-violet-500 bg-clip-text text-transparent">
            WhatMobile
          </span>
        </Link>
        
        {/* Search Bar - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-1 justify-center px-6 lg:px-8">
          <div className="relative w-full max-w-lg group">
            <input
              type="text"
              placeholder="Search phones, brands..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-surface/80 border border-border/30 text-foreground placeholder:text-muted-foreground shadow-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-300 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
          </div>
        </div>
        
        {/* Right Side - Theme Toggle + Mobile Search */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-accent transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-accent hover:scale-105 transition-all duration-200"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

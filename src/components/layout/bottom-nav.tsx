import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Icons for navigation
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const BrandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const CompareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

interface BottomNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const BottomNavItem = ({ href, icon, label, isActive }: BottomNavItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex flex-col items-center justify-center space-y-1 text-xs flex-1 py-3",
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground transition-colors"
    )}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export function BottomNav({ pathname }: { pathname: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background pb-safe-bottom z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <BottomNavItem
          href="/"
          icon={<HomeIcon />}
          label="Home"
          isActive={pathname === "/"}
        />
        <BottomNavItem
          href="/brands"
          icon={<BrandIcon />}
          label="Brands"
          isActive={pathname === "/brands"}
        />
        <BottomNavItem
          href="/compare"
          icon={<CompareIcon />}
          label="Compare"
          isActive={pathname === "/compare"}
        />
        <BottomNavItem
          href="/search"
          icon={<SearchIcon />}
          label="Search"
          isActive={pathname === "/search"}
        />
      </div>
    </div>
  );
}

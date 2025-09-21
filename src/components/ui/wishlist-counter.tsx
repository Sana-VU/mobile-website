"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/contexts/WishlistContext";

interface WishlistCounterProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * WishlistCounter - Shows wishlist count with heart icon
 * Perfect for navigation bars and quick access
 *
 * Features:
 * - Real-time count updates
 * - Animated badge for count changes
 * - Links to wishlist page
 * - Multiple size variants
 * - Loading state handling
 */
export function WishlistCounter({
  showText = false,
  size = "md",
  className = "",
}: WishlistCounterProps) {
  const { wishlistCount, isLoading } = useWishlist();

  // Size variants
  const sizeStyles = {
    sm: {
      container: "h-8",
      icon: "w-4 h-4",
      text: "text-sm",
      badge: "text-xs min-w-[16px] h-4",
    },
    md: {
      container: "h-10",
      icon: "w-5 h-5",
      text: "text-base",
      badge: "text-xs min-w-[18px] h-5",
    },
    lg: {
      container: "h-12",
      icon: "w-6 h-6",
      text: "text-lg",
      badge: "text-sm min-w-[20px] h-6",
    },
  };

  const currentSize = sizeStyles[size];

  // Heart icon component
  const HeartIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`${currentSize.icon} stroke-current fill-none`}
      strokeWidth={2}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`${currentSize.container} flex items-center ${className}`}
      >
        <div className="animate-pulse">
          <div className={`${currentSize.icon} bg-muted rounded`}></div>
        </div>
      </div>
    );
  }

  // With text layout
  if (showText) {
    return (
      <Link
        href="/wishlist"
        className={`
          inline-flex items-center gap-2 px-3 py-2 
          text-muted-foreground hover:text-foreground
          hover:bg-muted/50 rounded-lg transition-colors
          ${currentSize.text}
          ${className}
        `}
        title={`${wishlistCount} items in wishlist`}
      >
        <div className="relative">
          <HeartIcon />
          {wishlistCount > 0 && (
            <span
              className={`
              absolute -top-2 -right-2 
              ${currentSize.badge}
              bg-red-500 text-white 
              rounded-full flex items-center justify-center
              font-medium leading-none px-1
              animate-in slide-in-from-top-1 duration-200
            `}
            >
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </Link>
    );
  }

  // Icon-only layout
  return (
    <Link
      href="/wishlist"
      className={`
        ${currentSize.container}
        relative inline-flex items-center justify-center
        text-muted-foreground hover:text-foreground
        hover:bg-muted/50 rounded-lg transition-colors
        px-2
        ${className}
      `}
      title={`${wishlistCount} items in wishlist`}
    >
      <HeartIcon />
      {wishlistCount > 0 && (
        <span
          className={`
          absolute -top-1 -right-1 
          ${currentSize.badge}
          bg-red-500 text-white 
          rounded-full flex items-center justify-center
          font-medium leading-none px-1
          animate-in slide-in-from-top-1 duration-200
        `}
        >
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </span>
      )}
    </Link>
  );
}

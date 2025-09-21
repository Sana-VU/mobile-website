"use client";

import React, { useState } from "react";
import { useWishlist, type WishlistPhone } from "@/contexts/WishlistContext";

interface WishlistButtonProps {
  phone: Omit<WishlistPhone, "addedAt">;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal";
  showText?: boolean;
  className?: string;
  disabled?: boolean;
}

/**
 * WishlistButton - Interactive heart button for wishlist management
 *
 * Features:
 * - Animated heart icon with fill/unfill states
 * - Optimistic UI updates for better UX
 * - Multiple sizes and variants
 * - Optional text labels
 * - Loading states and error handling
 */
export function WishlistButton({
  phone,
  size = "md",
  variant = "default",
  showText = false,
  className = "",
  disabled = false,
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoading } =
    useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const inWishlist = isInWishlist(phone.id);

  // Handle wishlist toggle with animation
  const handleToggle = async () => {
    if (disabled || isLoading) return;

    // Start animation
    setIsAnimating(true);

    try {
      if (inWishlist) {
        removeFromWishlist(phone.id);
      } else {
        addToWishlist(phone);
      }
    } catch (error) {
      console.warn("Wishlist operation failed:", error);
    }

    // Reset animation after completion
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Size variants
  const sizeStyles = {
    sm: {
      button: "h-8 w-8 text-sm",
      icon: "w-4 h-4",
      text: "text-sm",
    },
    md: {
      button: "h-10 w-10 text-base",
      icon: "w-5 h-5",
      text: "text-base",
    },
    lg: {
      button: "h-12 w-12 text-lg",
      icon: "w-6 h-6",
      text: "text-lg",
    },
  };

  // Variant styles
  const variantStyles = {
    default: {
      base: "bg-background border border-border hover:bg-muted/50",
      active: "bg-red-50 border-red-200 text-red-600",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    minimal: {
      base: "bg-transparent border-none hover:bg-muted/50",
      active: "text-red-600",
      inactive: "text-muted-foreground hover:text-foreground",
    },
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  // Heart icon SVG with animation classes
  const HeartIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className={`
        ${currentSize.icon} 
        transition-all duration-300 ease-in-out
        ${isAnimating ? "scale-125" : "scale-100"}
        ${inWishlist ? "fill-current" : "fill-none stroke-current"}
      `}
      strokeWidth={2}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );

  // Button with text layout
  if (showText) {
    return (
      <button
        onClick={handleToggle}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-xl
          font-medium transition-all duration-200 ease-in-out
          ${currentVariant.base}
          ${inWishlist ? currentVariant.active : currentVariant.inactive}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
          ${className}
        `}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <HeartIcon />
        <span className={currentSize.text}>
          {inWishlist ? "Saved" : "Save"}
        </span>
      </button>
    );
  }

  // Icon-only button
  return (
    <button
      onClick={handleToggle}
      disabled={disabled || isLoading}
      className={`
        ${currentSize.button}
        inline-flex items-center justify-center rounded-xl
        transition-all duration-200 ease-in-out
        ${currentVariant.base}
        ${inWishlist ? currentVariant.active : currentVariant.inactive}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        ${className}
      `}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <HeartIcon />
    </button>
  );
}

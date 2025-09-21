"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Types for wishlist functionality
export interface WishlistPhone {
  id: number;
  name: string;
  brand: string;
  image?: string;
  price?: number;
  addedAt: string; // ISO date string
}

interface WishlistContextType {
  // State
  wishlist: WishlistPhone[];
  isLoading: boolean;

  // Actions
  addToWishlist: (phone: Omit<WishlistPhone, "addedAt">) => void;
  removeFromWishlist: (phoneId: number) => void;
  isInWishlist: (phoneId: number) => boolean;
  clearWishlist: () => void;

  // Utilities
  wishlistCount: number;
}

// Create context with default values
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Storage key for localStorage/sessionStorage
const WISHLIST_STORAGE_KEY = "whatmobile_wishlist";

// Default storage type (can be configured)
const STORAGE_TYPE: "localStorage" | "sessionStorage" = "localStorage";

/**
 * WishlistProvider - Manages wishlist state with persistent storage
 *
 * Features:
 * - Persists wishlist to localStorage/sessionStorage
 * - Handles storage availability gracefully
 * - Provides CRUD operations for wishlist items
 * - Includes loading states for better UX
 */
export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistPhone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize wishlist from storage on mount
  useEffect(() => {
    const initializeWishlist = () => {
      try {
        const storage =
          STORAGE_TYPE === "localStorage" ? localStorage : sessionStorage;
        const storedWishlist = storage.getItem(WISHLIST_STORAGE_KEY);

        if (storedWishlist) {
          const parsedWishlist = JSON.parse(storedWishlist) as WishlistPhone[];
          setWishlist(parsedWishlist);
        }
      } catch (error) {
        console.warn("Failed to load wishlist from storage:", error);
        // Initialize with empty wishlist if storage fails
        setWishlist([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to avoid hydration mismatch
    const timer = setTimeout(initializeWishlist, 100);
    return () => clearTimeout(timer);
  }, []);

  // Persist wishlist to storage whenever it changes
  useEffect(() => {
    if (isLoading) return; // Don't persist during initial load

    try {
      const storage =
        STORAGE_TYPE === "localStorage" ? localStorage : sessionStorage;
      storage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.warn("Failed to save wishlist to storage:", error);
    }
  }, [wishlist, isLoading]);

  // Add phone to wishlist
  const addToWishlist = (phone: Omit<WishlistPhone, "addedAt">) => {
    const existingIndex = wishlist.findIndex((item) => item.id === phone.id);

    if (existingIndex === -1) {
      const newPhone: WishlistPhone = {
        ...phone,
        addedAt: new Date().toISOString(),
      };

      setWishlist((prev) => [newPhone, ...prev]); // Add to beginning for newest first
    }
  };

  // Remove phone from wishlist
  const removeFromWishlist = (phoneId: number) => {
    setWishlist((prev) => prev.filter((phone) => phone.id !== phoneId));
  };

  // Check if phone is in wishlist
  const isInWishlist = (phoneId: number): boolean => {
    return wishlist.some((phone) => phone.id === phoneId);
  };

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Context value
  const value: WishlistContextType = {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

/**
 * useWishlist - Custom hook to access wishlist context
 *
 * @returns WishlistContextType with all wishlist operations
 * @throws Error if used outside WishlistProvider
 */
export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
}

/**
 * withWishlist - HOC to provide wishlist functionality to components
 * Useful for class components or when context injection is needed
 */
export function withWishlist<P extends object>(
  Component: React.ComponentType<P & WishlistContextType>
) {
  return function WithWishlistComponent(props: P) {
    const wishlistContext = useWishlist();
    return <Component {...props} {...wishlistContext} />;
  };
}

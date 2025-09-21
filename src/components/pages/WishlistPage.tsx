"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { useWishlist } from "@/contexts/WishlistContext";
import { WishlistButton } from "@/components/ui/wishlist-button";

/**
 * WishlistPage - Complete wishlist management interface
 *
 * Features:
 * - Display all saved phones in grid layout
 * - Sort options (newest, oldest, alphabetical)
 * - Remove items individually or clear all
 * - Empty state with helpful CTA
 * - Responsive design for mobile/desktop
 * - Share wishlist functionality
 */
export function WishlistPage() {
  const { wishlist, clearWishlist, wishlistCount, isLoading } = useWishlist();

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-4"></div>
            <div className="h-4 bg-muted rounded w-32 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-card rounded-card border border-border p-4"
                >
                  <div className="h-48 bg-muted rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-24"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (wishlistCount === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              Save phones you&apos;re interested in for easy comparison
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center text-4xl">
              💝
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start building your wishlist by clicking the heart icon on any
              phone you&apos;re interested in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/phones"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Browse Phones
              </Link>
              <Link
                href="/brands"
                className="inline-flex items-center justify-center px-6 py-3 bg-background border border-border text-foreground rounded-xl font-medium hover:bg-muted/50 transition-colors"
              >
                Shop by Brand
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlistCount} phone{wishlistCount !== 1 ? "s" : ""} saved
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to clear your entire wishlist?"
                  )
                ) {
                  clearWishlist();
                }
              }}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "My Phone Wishlist",
                    text: `Check out my ${wishlistCount} saved phones on WhatMobile`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Wishlist link copied to clipboard!");
                }
              }}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Share
            </button>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((phone) => (
            <div
              key={phone.id}
              className="bg-card rounded-card border border-border overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Phone Image */}
              <div className="aspect-[4/3] relative bg-muted">
                {phone.image ? (
                  <Image
                    src={phone.image}
                    alt={phone.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-6xl">
                    📱
                  </div>
                )}

                {/* Wishlist Button Overlay */}
                <div className="absolute top-3 right-3">
                  <WishlistButton
                    phone={phone}
                    variant="minimal"
                    className="bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>

              {/* Phone Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    <Link
                      href={`/phones/${phone.id}`}
                      className="hover:text-primary transition-colors"
                    >
                      {phone.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">{phone.brand}</p>
                </div>

                {/* Price */}
                {phone.price && (
                  <div className="mb-3">
                    <p className="text-lg font-bold text-foreground">
                      PKR {phone.price.toLocaleString()}
                    </p>
                  </div>
                )}

                {/* Added Date */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Added {format(new Date(phone.addedAt), "MMM dd, yyyy")}
                  </span>
                  <Link
                    href={`/phones/${phone.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <Link
            href="/phones"
            className="inline-flex items-center justify-center px-6 py-3 bg-background border border-border text-foreground rounded-xl font-medium hover:bg-muted/50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

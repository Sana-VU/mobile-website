"use client";

import React from "react";

interface VendorInfo {
  name: string;
  available: boolean;
  price?: number;
  url?: string;
  inStock?: boolean;
  shippingInfo?: string;
}

interface VendorBadgeProps {
  vendors: VendorInfo[];
  variant?: "default" | "compact" | "detailed";
  maxVisible?: number;
  className?: string;
  showPrices?: boolean;
  showLinks?: boolean;
}

/**
 * VendorBadge - Display vendor availability and pricing information
 *
 * Features:
 * - Show availability across multiple vendors
 * - Price comparison between vendors
 * - Direct links to vendor pages
 * - Stock status indicators
 * - Compact and detailed view modes
 * - Responsive design for mobile/desktop
 */
export function VendorBadge({
  vendors,
  variant = "default",
  maxVisible = 4,
  className = "",
  showPrices = true,
  showLinks = true,
}: VendorBadgeProps) {
  // Filter available vendors and sort by price (lowest first)
  const availableVendors = vendors
    .filter((vendor) => vendor.available)
    .sort((a, b) => {
      if (!a.price || !b.price) return 0;
      return a.price - b.price;
    });

  const unavailableVendors = vendors.filter((vendor) => !vendor.available);

  // Vendor styling configuration
  const getVendorStyle = (vendorName: string, isAvailable: boolean) => {
    const baseStyles = "text-xs font-medium px-2 py-1 rounded-md border";

    const vendorColors = {
      Daraz: isAvailable
        ? "bg-orange-50 text-orange-700 border-orange-200"
        : "bg-gray-50 text-gray-400 border-gray-200",
      PriceOye: isAvailable
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-gray-50 text-gray-400 border-gray-200",
      Homeshopping: isAvailable
        ? "bg-green-50 text-green-700 border-green-200"
        : "bg-gray-50 text-gray-400 border-gray-200",
      OLX: isAvailable
        ? "bg-purple-50 text-purple-700 border-purple-200"
        : "bg-gray-50 text-gray-400 border-gray-200",
      WhatMobile: isAvailable
        ? "bg-primary/10 text-primary border-primary/20"
        : "bg-gray-50 text-gray-400 border-gray-200",
      "Mega.pk": isAvailable
        ? "bg-red-50 text-red-700 border-red-200"
        : "bg-gray-50 text-gray-400 border-gray-200",
    };

    return `${baseStyles} ${
      vendorColors[vendorName as keyof typeof vendorColors] ||
      (isAvailable
        ? "bg-gray-50 text-gray-700 border-gray-200"
        : "bg-gray-50 text-gray-400 border-gray-200")
    }`;
  };

  // Get vendor icon/emoji
  const getVendorIcon = (vendorName: string) => {
    const icons: Record<string, string> = {
      Daraz: "🛒",
      PriceOye: "📱",
      Homeshopping: "🏠",
      OLX: "🔄",
      WhatMobile: "📱",
      "Mega.pk": "🛍️",
    };
    return icons[vendorName] || "🏪";
  };

  // Get lowest price
  const lowestPrice =
    availableVendors.length > 0
      ? Math.min(
          ...availableVendors.filter((v) => v.price).map((v) => v.price!)
        )
      : null;

  // Compact variant - just count and lowest price
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 text-sm ${className}`}>
        {availableVendors.length > 0 ? (
          <>
            <span className="text-green-600 font-medium">
              ✓ {availableVendors.length} store
              {availableVendors.length !== 1 ? "s" : ""}
            </span>
            {lowestPrice && showPrices && (
              <span className="text-muted-foreground">
                from PKR {lowestPrice.toLocaleString()}
              </span>
            )}
          </>
        ) : (
          <span className="text-muted-foreground">Not available</span>
        )}
      </div>
    );
  }

  // No vendors available
  if (availableVendors.length === 0 && unavailableVendors.length === 0) {
    return (
      <div className={`text-sm text-muted-foreground ${className}`}>
        Vendor information not available
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Available Vendors */}
      {availableVendors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="text-sm font-medium text-foreground">
              Available at:
            </h4>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              {availableVendors.length} store
              {availableVendors.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableVendors.slice(0, maxVisible).map((vendor, index) => (
              <div
                key={`${vendor.name}-${index}`}
                className={getVendorStyle(vendor.name, true)}
              >
                <div className="flex items-center gap-1.5">
                  <span>{getVendorIcon(vendor.name)}</span>

                  {showLinks && vendor.url ? (
                    <a
                      href={vendor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {vendor.name}
                    </a>
                  ) : (
                    <span>{vendor.name}</span>
                  )}

                  {vendor.price && showPrices && (
                    <span className="ml-1 font-semibold">
                      PKR {vendor.price.toLocaleString()}
                      {vendor.price === lowestPrice && (
                        <span className="ml-1 text-green-600">↓</span>
                      )}
                    </span>
                  )}
                </div>

                {/* Stock and shipping info */}
                {variant === "detailed" && (
                  <div className="mt-1 flex items-center gap-2 text-xs opacity-75">
                    {vendor.inStock !== undefined && (
                      <span
                        className={
                          vendor.inStock ? "text-green-600" : "text-red-600"
                        }
                      >
                        {vendor.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                      </span>
                    )}
                    {vendor.shippingInfo && (
                      <span>• {vendor.shippingInfo}</span>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Show more indicator */}
            {availableVendors.length > maxVisible && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                +{availableVendors.length - maxVisible} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Unavailable Vendors */}
      {unavailableVendors.length > 0 && variant === "detailed" && (
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Not available at:
          </h4>
          <div className="flex flex-wrap gap-2">
            {unavailableVendors.slice(0, 3).map((vendor, index) => (
              <div
                key={`unavailable-${vendor.name}-${index}`}
                className={getVendorStyle(vendor.name, false)}
              >
                <div className="flex items-center gap-1.5">
                  <span className="opacity-50">
                    {getVendorIcon(vendor.name)}
                  </span>
                  <span>{vendor.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price comparison note */}
      {availableVendors.length > 1 && showPrices && lowestPrice && (
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
          💡 Best price: PKR {lowestPrice.toLocaleString()}
          {availableVendors.find((v) => v.price === lowestPrice)?.name && (
            <span>
              {" "}
              at {availableVendors.find((v) => v.price === lowestPrice)?.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

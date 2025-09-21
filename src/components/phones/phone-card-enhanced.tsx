"use client";

import { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HardDrive,
  Camera,
  Battery,
  Monitor,
  Heart,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCardProps {
  phone: {
    id: number;
    name: string;
    slug: string;
    ramGB: number;
    storageGB: number;
    fiveG: boolean;
    batteryMAh: number;
    displayInch: number;
    releaseYear: number;
    chipset?: string | null;
    mainCamera?: string | null;
    ptaApproved: boolean;
    brand: {
      name: string;
      slug?: string;
    };
    vendorPrices: Array<{
      pricePKR: number;
      vendor: {
        name: string;
      };
    }>;
  };
  viewMode?: "grid" | "list";
  priority?: boolean;
}

export const PhoneCard = memo(function PhoneCard({
  phone,
  viewMode = "grid",
  priority = false,
}: PhoneCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate pricing info
  const sortedPrices = phone.vendorPrices
    .slice()
    .sort((a, b) => a.pricePKR - b.pricePKR);

  const minPrice = sortedPrices[0]?.pricePKR;
  const maxPrice = sortedPrices[sortedPrices.length - 1]?.pricePKR;
  const primaryVendor = sortedPrices[0]?.vendor?.name;
  const priceRange = sortedPrices.length > 1 && minPrice !== maxPrice;

  // Generate optimized image URL with fallback
  const getOptimizedImageUrl = () => {
    if (imageError) {
      return `/api/placeholder/400/300?text=${encodeURIComponent(phone.brand.name)}`;
    }

    // Use WebP format with fallback
    const baseUrl = `/images/phones/${phone.slug}`;
    return `${baseUrl}.webp`;
  };

  const imageUrl = getOptimizedImageUrl();

  // Specs for quick display
  const specs = [
    {
      icon: HardDrive,
      value: `${phone.ramGB}/${phone.storageGB}GB`,
      label: "RAM/Storage",
    },
    { icon: Monitor, value: `${phone.displayInch}"`, label: "Display" },
    { icon: Battery, value: `${phone.batteryMAh}mAh`, label: "Battery" },
    { icon: Camera, value: phone.mainCamera || "N/A", label: "Camera" },
  ];

  if (viewMode === "list") {
    return (
      <Card className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg">
        <Link href={`/phones/${phone.slug}`} className="block">
          <div className="flex">
            {/* Image Section */}
            <div className="relative w-48 h-36 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
              <Image
                src={imageUrl}
                alt={`${phone.brand.name} ${phone.name}`}
                fill
                className={cn(
                  "object-cover transition-transform duration-300 group-hover:scale-105",
                  imageError && "object-contain p-4"
                )}
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                sizes="192px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                onError={() => setImageError(true)}
              />
              {phone.fiveG && (
                <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                  5G
                </Badge>
              )}
              {phone.ptaApproved && (
                <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                  PTA
                </Badge>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                    {phone.brand.name} {phone.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {phone.chipset || "Chipset info not available"}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsWishlisted(!isWishlisted);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isWishlisted && "fill-current text-red-500"
                    )}
                  />
                </Button>
              </div>

              {/* Specs Strip */}
              <div className="flex flex-wrap gap-3 mb-3">
                {specs.slice(0, 3).map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300"
                  >
                    <spec.icon className="h-3 w-3" />
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div>
                  {minPrice ? (
                    <div>
                      <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        ₨{minPrice.toLocaleString()}
                        {priceRange && (
                          <span className="text-sm font-normal text-gray-500">
                            {" "}
                            - ₨{maxPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        from {primaryVendor}{" "}
                        {sortedPrices.length > 1 &&
                          `+${sortedPrices.length - 1} more`}
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                      Price not available
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Compare
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  // Grid View
  return (
    <Card className="group overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/phones/${phone.slug}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${phone.brand.name} ${phone.name}`}
            fill
            className={cn(
              "object-cover transition-transform duration-300 group-hover:scale-105",
              imageError && "object-contain p-4"
            )}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 300px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            onError={() => setImageError(true)}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {phone.fiveG && (
              <Badge className="bg-blue-600 text-white text-xs">5G</Badge>
            )}
            {phone.ptaApproved && (
              <Badge className="bg-green-600 text-white text-xs">PTA</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                isWishlisted && "fill-current text-red-500"
              )}
            />
          </Button>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 leading-tight">
              {phone.brand.name} {phone.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {phone.chipset || "Chipset info not available"}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            {specs.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300"
              >
                <spec.icon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Price Section */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-3">
            {minPrice ? (
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  ₨{minPrice.toLocaleString()}
                  {priceRange && (
                    <span className="text-sm font-normal text-gray-500">+</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                  <span>from {primaryVendor}</span>
                  {sortedPrices.length > 1 && (
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {sortedPrices.length} vendors
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-2">
                Price not available
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
});

PhoneCard.displayName = "PhoneCard";

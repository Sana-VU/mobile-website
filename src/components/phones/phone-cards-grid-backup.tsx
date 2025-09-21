"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  Smartphone,
  Cpu,
  HardDrive,
  Battery,
  Plus,
  Check,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCompare } from "@/contexts/compare-context";
import { QuickView } from "./quick-view";

interface Phone {
  id: number;
  name: string;
  slug?: string;
  imageUrl?: string;
  brand: {
    name: string;
    slug: string;
  };
  displaySize?: number;
  displaySizeText?: string;
  chipset?: string;
  ram?: number;
  storage?: number;
  batteryCapacity?: number;
  rating?: number;
  msrp?: number; // Manufacturer's suggested retail price
  mainCamera?: string;
  frontCamera?: string;
  os?: string;
  fiveG?: boolean;
  ptaApproved?: boolean;
  vendorPrices: {
    id: number;
    vendor: string;
    pricePKR: number;
    availability: string;
  }[];
}

interface PhoneCardProps {
  phone: Phone;
  viewMode?: "grid" | "list";
}

interface PhoneCardsGridProps {
  phones: Phone[];
  viewMode?: "grid" | "list";
}

// Optimized placeholder component for better CLS prevention
const ImagePlaceholder = memo(function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-muted ${className}`}>
      <Smartphone className="h-12 w-12 text-muted-foreground opacity-50" />
    </div>
  );
});

const PhoneCard = memo(function PhoneCard({ phone, viewMode = "grid" }: PhoneCardProps) {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();

  // Memoize expensive calculations
  const phoneData = useMemo(() => {
    // Generate phone slug
    const phoneSlug =
      phone.slug ||
      `${phone.brand.name.toLowerCase()}-${phone.name.toLowerCase().replace(/\s+/g, "-")}-${phone.id}`;

    // Get lowest price
    const lowestPrice =
      phone.vendorPrices.length > 0
        ? Math.min(...phone.vendorPrices.map((p) => p.pricePKR))
        : null;

    // Calculate discount percentage if MSRP is available
    const discountPercentage =
      phone.msrp && lowestPrice && lowestPrice < phone.msrp
        ? Math.round(((phone.msrp - lowestPrice) / phone.msrp) * 100)
        : null;

    // Get available vendors
    const availableVendors = phone.vendorPrices
      .filter(
        (p) => p.availability === "in-stock" || p.availability === "available"
      )
      .slice(0, 3); // Show max 3 vendor badges

    const specs = [
      phone.displaySizeText ||
        (phone.displaySize ? `${phone.displaySize}"` : null),
      phone.chipset,
      phone.ram && phone.storage ? `${phone.ram}/${phone.storage}GB` : null,
      phone.batteryCapacity ? `${phone.batteryCapacity}mAh` : null,
    ].filter(Boolean);

    return {
      phoneSlug,
      lowestPrice,
      discountPercentage,
      availableVendors,
      specs,
    };
  }, [phone]);

  const handleCompareClick = useMemo(() => (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to phone page
    e.stopPropagation();

    const phoneForCompare = {
      id: phone.id,
      name: phone.name,
      slug: phoneData.phoneSlug,
      brand: { name: phone.brand.name },
    };

    if (isInCompare(phone.id)) {
      removeFromCompare(phone.id);
    } else {
      addToCompare(phoneForCompare);
    }
  }, [phone.id, phone.name, phoneData.phoneSlug, phone.brand.name, isInCompare, removeFromCompare, addToCompare]);

  const inCompare = isInCompare(phone.id);
  const { phoneSlug, lowestPrice, discountPercentage, availableVendors, specs } = phoneData;

  if (viewMode === "list") {
    return (
      <Link
        href={`/phones/${phoneSlug}`}
        prefetch={false} // Disable prefetch for performance
        className="group block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-card rounded-lg border p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex gap-4">
            {/* Image with fixed aspect ratio container */}
            <div className="flex-shrink-0 w-20 h-20 relative bg-muted rounded-lg overflow-hidden">
              {phone.imageUrl ? (
                <Image
                  src={phone.imageUrl}
                  alt={`${phone.brand.name} ${phone.name}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              ) : (
                <ImagePlaceholder />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Name and Rating */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors">
                    {phone.brand.name} {phone.name}
                  </h3>
                  {specs.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {specs.join(" • ")}
                    </p>
                  )}
                </div>
                {phone.rating && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 shrink-0"
                  >
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-xs">{phone.rating}</span>
                  </Badge>
                )}
              </div>

              {/* Price and Vendors */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {availableVendors.map((vendor) => (
                    <Badge
                      key={vendor.id}
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {vendor.vendor}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={inCompare ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={handleCompareClick}
                  >
                    {inCompare ? (
                      <>
                        <Check className="h-3 w-3 mr-1" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3 mr-1" />
                        Compare
                      </>
                    )}
                  </Button>
                  {lowestPrice && (
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-foreground">
                          {formatPrice(lowestPrice)}
                        </p>
                        {discountPercentage && (
                          <Badge
                            variant="default"
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-1.5 py-0.5"
                          >
                            −{discountPercentage}%
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        from{" "}
                        {phone.msrp && discountPercentage ? (
                          <span className="line-through">
                            {formatPrice(phone.msrp)}
                          </span>
                        ) : (
                          "best price"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <QuickView
      phone={{
        ...phone,
        vendorPrices: phone.vendorPrices.map((vp) => ({
          pricePKR: vp.pricePKR,
          vendor: vp.vendor,
        })),
      }}
      side="top"
      align="center"
    >
      <Link
        href={`/phones/${phoneSlug}`}
        prefetch={false} // Disable prefetch for performance
        className="group block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-card rounded-lg border p-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col min-w-[200px]">
          {/* Image with fixed aspect ratio container to prevent CLS */}
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-3">
            {phone.imageUrl ? (
              <Image
                src={phone.imageUrl}
                alt={`${phone.brand.name} ${phone.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            ) : (
              <ImagePlaceholder />
            )}

            {/* Compare Button */}
            <Button
              variant={inCompare ? "default" : "secondary"}
              size="sm"
              className="absolute top-2 left-2 h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={handleCompareClick}
            >
              {inCompare ? (
                <>
                  <Check className="h-3 w-3 mr-1" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="h-3 w-3 mr-1" />
                  Compare
                </>
              )}
            </Button>

            {/* Rating Badge */}
            {phone.rating && (
              <Badge
                variant="outline"
                className="absolute top-2 right-2 flex items-center gap-1 bg-background/95"
              >
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs">{phone.rating}</span>
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Name */}
            <h3 className="font-semibold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {phone.brand.name} {phone.name}
            </h3>

            {/* Specs Strip */}
            {specs.length > 0 && (
              <div className="space-y-1">
                {specs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    {index === 0 && (
                      <Smartphone className="h-3 w-3 flex-shrink-0" />
                    )}
                    {index === 1 && <Cpu className="h-3 w-3 flex-shrink-0" />}
                    {index === 2 && (
                      <HardDrive className="h-3 w-3 flex-shrink-0" />
                    )}
                    {index === 3 && (
                      <Battery className="h-3 w-3 flex-shrink-0" />
                    )}
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Vendor Badges */}
            {availableVendors.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {availableVendors.map((vendor) => (
                  <Badge
                    key={vendor.id}
                    variant="secondary"
                    className="text-xs px-1.5 py-0.5"
                  >
                    {vendor.vendor}
                  </Badge>
                ))}
              </div>
            )}

            {/* Price */}
            {lowestPrice && (
              <div className="text-center pt-1">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-foreground">
                    {formatPrice(lowestPrice)}
                  </p>
                  {discountPercentage && (
                    <Badge
                      variant="default"
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-1.5 py-0.5"
                    >
                      −{discountPercentage}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  from{" "}
                  {phone.msrp && discountPercentage ? (
                    <span className="line-through">
                      {formatPrice(phone.msrp)}
                    </span>
                  ) : null}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </QuickView>
  );
});

// Memoized grid component
export const PhoneCardsGrid = memo(function PhoneCardsGrid({
  phones,
  viewMode = "grid",
}: PhoneCardsGridProps) {
  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} viewMode="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} viewMode="grid" />
      ))}
    </div>
  );
});
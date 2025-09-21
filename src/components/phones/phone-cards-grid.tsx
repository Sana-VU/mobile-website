"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star, Smartphone, Cpu, HardDrive, Battery } from "lucide-react";
import { formatPrice } from "@/lib/utils";

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

function PhoneCard({ phone, viewMode = "grid" }: PhoneCardProps) {
  // Generate phone slug
  const phoneSlug =
    phone.slug ||
    `${phone.brand.name.toLowerCase()}-${phone.name.toLowerCase().replace(/\s+/g, "-")}-${phone.id}`;

  // Get lowest price
  const lowestPrice =
    phone.vendorPrices.length > 0
      ? Math.min(...phone.vendorPrices.map((p) => p.pricePKR))
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

  if (viewMode === "list") {
    return (
      <Link
        href={`/phones/${phoneSlug}`}
        className="group block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <div className="bg-card rounded-lg border p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex gap-4">
            {/* Image */}
            <div className="flex-shrink-0 w-20 h-20 relative bg-muted rounded-lg overflow-hidden">
              {phone.imageUrl ? (
                <Image
                  src={phone.imageUrl}
                  alt={`${phone.brand.name} ${phone.name}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-muted-foreground" />
                </div>
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
                {lowestPrice && (
                  <div className="text-right">
                    <p className="font-semibold text-sm text-foreground">
                      {formatPrice(lowestPrice)}
                    </p>
                    <p className="text-xs text-muted-foreground">from</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/phones/${phoneSlug}`}
      className="group block w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
    >
      <div className="bg-card rounded-lg border p-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col min-w-[200px]">
        {/* Image */}
        <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-3">
          {phone.imageUrl ? (
            <Image
              src={phone.imageUrl}
              alt={`${phone.brand.name} ${phone.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Smartphone className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

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
                  {index === 3 && <Battery className="h-3 w-3 flex-shrink-0" />}
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
              <p className="font-semibold text-sm text-foreground">
                {formatPrice(lowestPrice)}
              </p>
              <p className="text-xs text-muted-foreground">from</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function PhoneCardsGrid({
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
}

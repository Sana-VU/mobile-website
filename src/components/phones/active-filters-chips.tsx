"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { createFilterUrl, type PhoneFilters } from "@/lib/url-state";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ActiveFiltersChipsProps {
  filters: PhoneFilters;
  className?: string;
}

export function ActiveFiltersChips({
  filters,
  className,
}: ActiveFiltersChipsProps) {
  const router = useRouter();

  const activeFilters = [];

  // Brand filters
  if (filters.brand && filters.brand.length > 0) {
    activeFilters.push({
      type: "brand",
      label: `Brands: ${filters.brand.join(", ")}`,
      removeUrl: createFilterUrl(filters, { brand: undefined }),
    });
  }

  // Price filters
  if (filters.minPrice || filters.maxPrice) {
    const priceLabel =
      filters.minPrice && filters.maxPrice
        ? `₨${filters.minPrice.toLocaleString()} - ₨${filters.maxPrice.toLocaleString()}`
        : filters.minPrice
          ? `₨${filters.minPrice.toLocaleString()}+`
          : `Under ₨${filters.maxPrice?.toLocaleString()}`;

    activeFilters.push({
      type: "price",
      label: `Price: ${priceLabel}`,
      removeUrl: createFilterUrl(filters, {
        minPrice: undefined,
        maxPrice: undefined,
      }),
    });
  }

  // RAM filters
  if (filters.ram && filters.ram.length > 0) {
    activeFilters.push({
      type: "ram",
      label: `RAM: ${filters.ram.map((r) => `${r}GB`).join(", ")}`,
      removeUrl: createFilterUrl(filters, { ram: undefined }),
    });
  }

  // Storage filters
  if (filters.storage && filters.storage.length > 0) {
    activeFilters.push({
      type: "storage",
      label: `Storage: ${filters.storage.map((s) => `${s}GB`).join(", ")}`,
      removeUrl: createFilterUrl(filters, { storage: undefined }),
    });
  }

  // Display size filters
  if (filters.displaySize) {
    activeFilters.push({
      type: "displaySize",
      label: `Display: ${filters.displaySize}`,
      removeUrl: createFilterUrl(filters, { displaySize: undefined }),
    });
  }

  // Battery filters
  if (filters.batteryMin || filters.batteryMax) {
    const batteryLabel =
      filters.batteryMin && filters.batteryMax
        ? `${filters.batteryMin} - ${filters.batteryMax}mAh`
        : filters.batteryMin
          ? `${filters.batteryMin}mAh+`
          : `Under ${filters.batteryMax}mAh`;

    activeFilters.push({
      type: "battery",
      label: `Battery: ${batteryLabel}`,
      removeUrl: createFilterUrl(filters, {
        batteryMin: undefined,
        batteryMax: undefined,
      }),
    });
  }

  // Boolean filters
  if (filters.fiveG) {
    activeFilters.push({
      type: "fiveG",
      label: "5G Support",
      removeUrl: createFilterUrl(filters, { fiveG: undefined }),
    });
  }

  if (filters.ptaApproved) {
    activeFilters.push({
      type: "ptaApproved",
      label: "PTA Approved",
      removeUrl: createFilterUrl(filters, { ptaApproved: undefined }),
    });
  }

  // Chipset vendor filters
  if (filters.chipsetVendor && filters.chipsetVendor.length > 0) {
    activeFilters.push({
      type: "chipsetVendor",
      label: `Chipset: ${filters.chipsetVendor.join(", ")}`,
      removeUrl: createFilterUrl(filters, { chipsetVendor: undefined }),
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const clearAllUrl = createFilterUrl(
    {},
    {
      page: 1,
      sort: filters.sort,
      view: filters.view,
    }
  );

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Active filters:
      </span>

      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.type}-${index}`}
          variant="secondary"
          className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          <span className="text-xs">{filter.label}</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto w-auto p-0 hover:bg-transparent"
            onClick={() => router.push(filter.removeUrl)}
            aria-label={`Remove ${filter.label} filter`}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(clearAllUrl)}
        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Clear all
      </Button>
    </div>
  );
}

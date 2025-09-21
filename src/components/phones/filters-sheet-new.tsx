"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Loader2 } from "lucide-react";

interface SimpleBrand {
  id: string;
  name: string;
}

interface FiltersSheetProps {
  brands: SimpleBrand[];
  currentFilters: {
    brand?: string;
    min?: string;
    max?: string;
    ram?: string;
    fiveG?: string;
  };
  totalCount: number;
}

export function FiltersSheet({
  brands,
  currentFilters,
  totalCount,
}: FiltersSheetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Local state for form inputs
  const [filters, setFilters] = useState({
    brand: currentFilters.brand || "",
    minPrice: currentFilters.min || "",
    maxPrice: currentFilters.max || "",
    ram: currentFilters.ram || "",
    fiveG: currentFilters.fiveG || "",
  });

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams || "");

    // Remove page when applying filters
    params.delete("page");

    // Update or remove filter parameters
    if (filters.brand) {
      params.set("brand", filters.brand);
    } else {
      params.delete("brand");
    }

    if (filters.minPrice) {
      params.set("min", filters.minPrice);
    } else {
      params.delete("min");
    }

    if (filters.maxPrice) {
      params.set("max", filters.maxPrice);
    } else {
      params.delete("max");
    }

    if (filters.ram) {
      params.set("ram", filters.ram);
    } else {
      params.delete("ram");
    }

    if (filters.fiveG && filters.fiveG !== "all") {
      params.set("fiveG", filters.fiveG);
    } else {
      params.delete("fiveG");
    }

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.replace(newUrl || pathname || "/", { scroll: false });
      setIsOpen(false);
    });
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      minPrice: "",
      maxPrice: "",
      ram: "",
      fiveG: "",
    });

    startTransition(() => {
      router.replace(pathname || "/", { scroll: false });
      setIsOpen(false);
    });
  };

  const hasActiveFilters = Object.values(currentFilters).some(
    (value) => value && value !== "all"
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={hasActiveFilters ? "border-blue-500 text-blue-600" : ""}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 bg-blue-100 text-blue-600 text-xs px-1.5 py-0.5 rounded-full">
              {
                Object.values(currentFilters).filter((v) => v && v !== "all")
                  .length
              }
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Phones</SheetTitle>
          <SheetDescription>
            Showing {totalCount.toLocaleString()} phones. Use filters to narrow
            down results.
          </SheetDescription>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Brand Filter */}
          <div className="space-y-3">
            <Label htmlFor="brand-select" className="text-sm font-medium">
              Brand
            </Label>
            <Select
              value={filters.brand}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, brand: e.target.value }))
              }
            >
              <option value="">All brands</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range (PKR)</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="min-price" className="text-xs text-neutral-600">
                  Min Price
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-xs text-neutral-600">
                  Max Price
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="500000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          {/* RAM */}
          <div className="space-y-3">
            <Label htmlFor="ram-select" className="text-sm font-medium">
              RAM (GB)
            </Label>
            <Select
              value={filters.ram}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, ram: e.target.value }))
              }
            >
              <option value="">Any RAM</option>
              <option value="2">2 GB</option>
              <option value="3">3 GB</option>
              <option value="4">4 GB</option>
              <option value="6">6 GB</option>
              <option value="8">8 GB</option>
              <option value="12">12 GB</option>
              <option value="16">16 GB</option>
            </Select>
          </div>

          {/* 5G Support */}
          <div className="space-y-3">
            <Label htmlFor="5g-select" className="text-sm font-medium">
              5G Support
            </Label>
            <Select
              value={filters.fiveG}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fiveG: e.target.value }))
              }
            >
              <option value="">Any</option>
              <option value="true">5G Supported</option>
              <option value="false">4G Only</option>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={clearFilters}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            Clear All
          </Button>
          <Button
            onClick={applyFilters}
            disabled={isPending}
            className="w-full sm:w-auto"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

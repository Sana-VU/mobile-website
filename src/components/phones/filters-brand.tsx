"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { PhoneFilters } from "@/lib/url-state";
import { createFilterUrl } from "@/lib/url-state";

interface Brand {
  name: string;
  _count: {
    phones: number;
  };
}

interface FiltersBrandProps {
  brands: Brand[];
  currentFilters: PhoneFilters;
}

export function FiltersBrand({ brands, currentFilters }: FiltersBrandProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleBrands = showAll ? filteredBrands : filteredBrands.slice(0, 8);
  const selectedBrands = currentFilters.brand || [];

  const handleBrandToggle = (brandName: string, checked: boolean) => {
    const newBrands = checked
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((b) => b !== brandName);

    const url = createFilterUrl(currentFilters, { brand: newBrands });
    router.push(url);
  };

  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Brand</h3>

      {/* Search */}
      {brands.length > 10 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search brands..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Brand List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {visibleBrands.map((brand) => (
          <div key={brand.name} className="flex items-center space-x-3">
            <Checkbox
              id={`brand-${brand.name}`}
              checked={selectedBrands.includes(brand.name)}
              onCheckedChange={(checked) =>
                handleBrandToggle(brand.name, checked as boolean)
              }
            />
            <label
              htmlFor={`brand-${brand.name}`}
              className="flex-1 text-sm font-medium text-gray-700 cursor-pointer"
            >
              {brand.name}
            </label>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {brand._count.phones}
            </span>
          </div>
        ))}
      </div>

      {/* Show More/Less */}
      {filteredBrands.length > 8 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="w-full"
        >
          {showAll ? "Show less" : `Show ${filteredBrands.length - 8} more`}
        </Button>
      )}
    </div>
  );
}

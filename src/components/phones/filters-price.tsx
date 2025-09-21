"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { PhoneFilters } from "@/lib/url-state";
import { createFilterUrl } from "@/lib/url-state";

interface FiltersPriceProps {
  currentFilters: PhoneFilters;
  priceRange: { min: number; max: number };
}

export function FiltersPrice({
  currentFilters,
  priceRange,
}: FiltersPriceProps) {
  const router = useRouter();
  const [localMin, setLocalMin] = useState(
    currentFilters.minPrice?.toString() || ""
  );
  const [localMax, setLocalMax] = useState(
    currentFilters.maxPrice?.toString() || ""
  );

  const currentMin = currentFilters.minPrice || priceRange.min;
  const currentMax = currentFilters.maxPrice || priceRange.max;

  const handleSliderChange = (value: number[]) => {
    const [min, max] = value;
    setLocalMin(min.toString());
    setLocalMax(max.toString());

    const url = createFilterUrl(currentFilters, {
      minPrice: min === priceRange.min ? undefined : min,
      maxPrice: max === priceRange.max ? undefined : max,
    });
    router.push(url);
  };

  const handleInputSubmit = () => {
    const minValue = localMin ? parseFloat(localMin) : undefined;
    const maxValue = localMax ? parseFloat(localMax) : undefined;

    const url = createFilterUrl(currentFilters, {
      minPrice: minValue === priceRange.min ? undefined : minValue,
      maxPrice: maxValue === priceRange.max ? undefined : maxValue,
    });
    router.push(url);
  };

  const handleClear = () => {
    setLocalMin("");
    setLocalMax("");
    const url = createFilterUrl(currentFilters, {
      minPrice: undefined,
      maxPrice: undefined,
    });
    router.push(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Price Range</h3>
        {(currentFilters.minPrice || currentFilters.maxPrice) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-xs h-auto p-1"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          min={priceRange.min}
          max={priceRange.max}
          step={1000}
          value={[currentMin, currentMax]}
          onValueChange={handleSliderChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹{priceRange.min.toLocaleString()}</span>
          <span>₹{priceRange.max.toLocaleString()}</span>
        </div>
      </div>

      {/* Input Fields */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Min Price</label>
          <Input
            type="number"
            placeholder="0"
            value={localMin}
            onChange={(e) => setLocalMin(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleInputSubmit()}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Max Price</label>
          <Input
            type="number"
            placeholder="Any"
            value={localMax}
            onChange={(e) => setLocalMax(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleInputSubmit()}
          />
        </div>
      </div>

      {/* Apply Button */}
      <Button
        onClick={handleInputSubmit}
        size="sm"
        className="w-full"
        variant="outline"
      >
        Apply Price Filter
      </Button>
    </div>
  );
}

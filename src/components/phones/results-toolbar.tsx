"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterChip {
  key: string;
  label: string;
  value: string;
}

interface ResultsToolbarProps {
  totalCount: number;
  activeFilters: FilterChip[];
  currentSort: string;
  onMobileFiltersOpen?: () => void;
}

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low→High" },
  { value: "price-desc", label: "Price: High→Low" },
  { value: "ram", label: "RAM" },
  { value: "battery", label: "Battery" },
  { value: "camera", label: "Camera" },
];

export function ResultsToolbar({
  totalCount,
  activeFilters,
  currentSort,
  onMobileFiltersOpen,
}: ResultsToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const removeFilter = useCallback(
    (filterKey: string) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.delete(filterKey);
      // Reset to page 1 when filters change
      params.delete("page");
      router.push(`/phones?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams();
    // Keep sort if it exists
    const sort = searchParams?.get("sort");
    if (sort) {
      params.set("sort", sort);
    }
    router.push(`/phones?${params.toString()}`);
  }, [router, searchParams]);

  const handleSortChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      const params = new URLSearchParams(searchParams?.toString() || "");
      if (value === "relevance") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      // Reset to page 1 when sort changes
      params.delete("page");
      router.push(`/phones?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-4">
      {/* Results Count & Mobile Filter Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {totalCount.toLocaleString()} phones found
          </h2>

          {/* Mobile Filter Button - Only visible on mobile */}
          <Button
            variant="outline"
            size="sm"
            onClick={onMobileFiltersOpen}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilters.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select
            value={currentSort}
            onChange={handleSortChange}
            className="w-40"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Active filters:
          </span>

          {activeFilters.map((filter) => (
            <Badge
              key={`${filter.key}-${filter.value}`}
              variant="secondary"
              className="gap-1 pr-1 hover:bg-muted/80 transition-colors"
            >
              <span className="text-xs">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                onClick={() => removeFilter(filter.key)}
                aria-label={`Remove ${filter.label} filter`}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {activeFilters.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

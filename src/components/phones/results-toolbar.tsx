"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SavedSearches } from "./saved-searches";

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
          <h2
            className="text-lg font-semibold text-foreground"
            aria-live="polite"
          >
            {totalCount.toLocaleString()} phones found
          </h2>

          {/* Mobile Filter Button - Only visible on mobile */}
          <Button
            variant="outline"
            size="sm"
            onClick={onMobileFiltersOpen}
            className="lg:hidden"
            aria-label="Open filters panel"
            aria-describedby="mobile-filter-count"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" aria-hidden="true" />
            Filters
            {activeFilters.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 px-1.5 text-xs"
                id="mobile-filter-count"
                aria-label={`${activeFilters.length} active filter${activeFilters.length === 1 ? "" : "s"}`}
              >
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Sort Dropdown & Saved Searches */}
        <div className="flex items-center gap-3">
          <SavedSearches totalResults={totalCount} />

          <div className="flex items-center gap-2">
            <ArrowUpDown
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <label htmlFor="sort-select" className="sr-only">
              Sort phones by
            </label>
            <Select
              id="sort-select"
              value={currentSort}
              onChange={handleSortChange}
              className="w-40"
              aria-label="Sort phones by"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">
            Active filters:
          </span>

          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label="Active filters"
          >
            {activeFilters.map((filter, index) => (
              <Badge
                key={`${filter.key}-${filter.value}`}
                variant="secondary"
                className="gap-1 pr-1 hover:bg-muted/80 transition-colors group focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                tabIndex={-1}
              >
                <span className="text-xs">{filter.label}</span>
                <button
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-secondary transition-colors"
                  onClick={() => removeFilter(filter.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Delete" || e.key === "Backspace") {
                      e.preventDefault();
                      removeFilter(filter.key);
                    } else if (
                      e.key === "ArrowRight" &&
                      index < activeFilters.length - 1
                    ) {
                      e.preventDefault();
                      const nextButton =
                        e.currentTarget.parentElement?.parentElement?.children[
                          index + 1
                        ]?.querySelector("button");
                      if (nextButton) (nextButton as HTMLButtonElement).focus();
                    } else if (e.key === "ArrowLeft" && index > 0) {
                      e.preventDefault();
                      const prevButton =
                        e.currentTarget.parentElement?.parentElement?.children[
                          index - 1
                        ]?.querySelector("button");
                      if (prevButton) (prevButton as HTMLButtonElement).focus();
                    }
                  }}
                  aria-label={`Remove ${filter.label} filter`}
                  title={`Remove ${filter.label} filter (Press Delete or Backspace)`}
                  type="button"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </Badge>
            ))}

            {activeFilters.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Clear all active filters"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

import { FiltersBrand } from "./filters-brand";
import { FiltersPrice } from "./filters-price";
import { FiltersSpecs } from "./filters-specs";
import { ActiveFiltersChips } from "./active-filters-chips";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { getFilterOptions, getPriceRange } from "@/lib/phones-query";
import type { PhoneFilters } from "@/lib/url-state";
import Link from "next/link";

interface PhoneFiltersSectionProps {
  filters: PhoneFilters;
}

export async function PhoneFiltersSection({
  filters,
}: PhoneFiltersSectionProps) {
  const [filterOptions, priceRange] = await Promise.all([
    getFilterOptions(),
    getPriceRange(),
  ]);

  // Get active filter count for accessibility
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === "page" || key === "sort" || key === "view") return false;
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null;
  });

  const activeFilterCount = activeFilters.length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <aside
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      role="complementary"
      aria-label="Filter phones"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Filter className="h-5 w-5" aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <span
              className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-600 rounded-full"
              aria-label={`${activeFilterCount} active filter${activeFilterCount !== 1 ? "s" : ""}`}
            >
              {activeFilterCount}
            </span>
          )}
        </h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/phones"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              aria-label="Clear all filters"
            >
              Clear all
            </Link>
          </Button>
        )}
      </div>

      {/* Active Filters Chips */}
      <ActiveFiltersChips filters={filters} className="mb-6" />

      {/* Filter Sections */}
      <div className="space-y-8">
        {/* Brand Filter */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
            Brand
          </h3>
          <FiltersBrand
            brands={filterOptions.brands}
            currentFilters={filters}
          />
        </div>

        {/* Price Filter */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
            Price Range
          </h3>
          <FiltersPrice currentFilters={filters} priceRange={priceRange} />
        </div>

        {/* Specs Filter */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
            Specifications
          </h3>
          <FiltersSpecs
            currentFilters={filters}
            ramOptions={filterOptions.ramOptions}
            storageOptions={filterOptions.storageOptions}
            chipsetVendors={filterOptions.chipsetVendors.filter(
              (vendor): vendor is string => vendor !== null
            )}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link
              href="/phones?fiveG=true"
              aria-label="Filter for 5G enabled phones"
            >
              5G Phones Only
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link
              href="/phones?ptaApproved=true"
              aria-label="Filter for PTA approved phones"
            >
              PTA Approved Only
            </Link>
          </Button>
        </div>
      </div>

      {/* Screen Reader Summary */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {hasActiveFilters
          ? `Showing results with ${activeFilterCount} filter${activeFilterCount !== 1 ? "s" : ""} applied`
          : "Showing all phone results"}
      </div>
    </aside>
  );
}

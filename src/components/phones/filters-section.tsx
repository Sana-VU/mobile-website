import { FiltersBrand } from "./filters-brand";
import { FiltersPrice } from "./filters-price";
import { FiltersSpecs } from "./filters-specs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getFilterOptions, getPriceRange } from "@/lib/phones-query";
import { removeFilter, createFilterUrl } from "@/lib/url-state";
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

  // Get active filter count
  const activeFilters = Object.entries(filters).filter(([key, value]) => {
    if (key === "page" || key === "sort" || key === "view") return false;
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null;
  });

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="/phones"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear all
            </Link>
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Active Filters ({activeFilters.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.brand?.map((brand) => (
              <FilterChip
                key={`brand-${brand}`}
                label={brand}
                onRemove={() => removeFilter(filters, "brand", brand)}
              />
            ))}
            {filters.ram?.map((ram) => (
              <FilterChip
                key={`ram-${ram}`}
                label={`${ram}GB RAM`}
                onRemove={() => removeFilter(filters, "ram", ram)}
              />
            ))}
            {filters.storage?.map((storage) => (
              <FilterChip
                key={`storage-${storage}`}
                label={`${storage}GB Storage`}
                onRemove={() => removeFilter(filters, "storage", storage)}
              />
            ))}
            {filters.chipsetVendor?.map((chipset) => (
              <FilterChip
                key={`chipset-${chipset}`}
                label={chipset}
                onRemove={() => removeFilter(filters, "chipsetVendor", chipset)}
              />
            ))}
            {filters.minPrice && (
              <FilterChip
                label={`Min ₹${filters.minPrice.toLocaleString()}`}
                onRemove={() => removeFilter(filters, "minPrice")}
              />
            )}
            {filters.maxPrice && (
              <FilterChip
                label={`Max ₹${filters.maxPrice.toLocaleString()}`}
                onRemove={() => removeFilter(filters, "maxPrice")}
              />
            )}
            {filters.displaySize && (
              <FilterChip
                label={`Display: ${filters.displaySize}`}
                onRemove={() => removeFilter(filters, "displaySize")}
              />
            )}
            {filters.fiveG && (
              <FilterChip
                label="5G"
                onRemove={() => removeFilter(filters, "fiveG")}
              />
            )}
            {filters.ptaApproved && (
              <FilterChip
                label="PTA Approved"
                onRemove={() => removeFilter(filters, "ptaApproved")}
              />
            )}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-8">
        <FiltersBrand brands={filterOptions.brands} currentFilters={filters} />

        <FiltersPrice currentFilters={filters} priceRange={priceRange} />

        <FiltersSpecs
          currentFilters={filters}
          ramOptions={filterOptions.ramOptions}
          storageOptions={filterOptions.storageOptions}
          chipsetVendors={filterOptions.chipsetVendors}
        />
      </div>
    </div>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => PhoneFilters;
}) {
  const newFilters = onRemove();
  const url = createFilterUrl({}, newFilters);

  return (
    <Link
      href={url}
      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
    >
      {label}
      <X className="h-3 w-3" />
    </Link>
  );
}

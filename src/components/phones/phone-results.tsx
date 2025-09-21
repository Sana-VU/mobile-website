import { PhoneCard } from "./phone-card-enhanced";
import { ActiveFiltersChips } from "./active-filters-chips";
import { SortSelect } from "./sort-select-enhanced";
import { PaginationEnhanced } from "./pagination-enhanced";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import { getPhones } from "@/lib/phones-query";
import { createFilterUrl } from "@/lib/url-state";
import type { PhoneFilters } from "@/lib/url-state";
import Link from "next/link";

interface PhoneResultsProps {
  filters: PhoneFilters;
}

export async function PhoneResults({ filters }: PhoneResultsProps) {
  const currentPage = filters.page || 1;
  const currentSort = filters.sort || "relevance";
  const currentView = filters.view || "grid";

  const result = await getPhones(filters, {
    page: currentPage,
    pageSize: 20,
  });

  const { phones, totalCount, totalPages } = result;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mobile Phones</h1>
          <p className="text-gray-600 mt-1">
            {totalCount.toLocaleString()} phones found
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </div>
      </div>

      {/* Active Filters */}
      <ActiveFiltersChips filters={filters} className="pb-4" />

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <SortSelect currentSort={currentSort} currentFilters={filters} />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
          <Link
            href={createFilterUrl(filters, { view: "grid" })}
            className={`p-2 rounded ${
              currentView === "grid"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Grid view"
          >
            <Grid3X3 className="h-4 w-4" />
          </Link>
          <Link
            href={createFilterUrl(filters, { view: "list" })}
            className={`p-2 rounded ${
              currentView === "list"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="List view"
          >
            <List className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Results Grid/List */}
      {phones.length > 0 ? (
        <div
          className={
            currentView === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {phones.map((phone, index) => (
            <PhoneCard
              key={phone.id}
              phone={phone}
              viewMode={currentView}
              priority={index < 8} // Prioritize first 8 images
            />
          ))}
        </div>
      ) : (
        <EmptyState filters={filters} />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationEnhanced
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={20}
          filters={filters}
          className="mt-12"
        />
      )}
    </div>
  );
}

function EmptyState({ filters }: { filters: PhoneFilters }) {
  const hasFilters = Object.keys(filters).some(
    (key) =>
      key !== "page" &&
      key !== "sort" &&
      key !== "view" &&
      filters[key as keyof PhoneFilters]
  );

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3X3 className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No phones found
        </h3>
        <p className="text-gray-600 mb-6">
          {hasFilters
            ? "Try adjusting your filters to see more results."
            : "We couldn't find any phones at the moment."}
        </p>
        {hasFilters && (
          <Button asChild variant="outline">
            <Link href="/phones">Clear all filters</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

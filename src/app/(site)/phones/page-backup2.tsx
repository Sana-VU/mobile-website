import { Metadata } from "next";
import { Suspense } from "react";
import { PhoneFiltersSection } from "@/components/phones/filters-section";
import { PhoneResults } from "@/components/phones/phone-results";
import { FiltersLoading } from "@/components/phones/filters-loading";
import { PhoneResultsLoading } from "@/components/phones/phone-results-loading";
import { parseSearchParams } from "@/lib/url-state";

export const metadata: Metadata = {
  title: "Phone Finder - Find Your Perfect Mobile | WhatMobile",
  description: "Discover and compare mobile phones with advanced filters. Find the perfect smartphone with our comprehensive search and filtering system.",
  keywords: "mobile phones, smartphones, phone comparison, phone finder, mobile specs",
  openGraph: {
    title: "Phone Finder - Find Your Perfect Mobile",
    description: "Discover and compare mobile phones with advanced filters",
    type: "website",
  },
};

export const revalidate = 300;

interface PhonesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6 py-6">
        {/* Mobile/Tablet: Stacked Layout */}
        <div className="lg:hidden space-y-6">
          <Suspense fallback={<FiltersLoading />}>
            <PhoneFiltersSection filters={filters} />
          </Suspense>
          <Suspense fallback={<PhoneResultsLoading />}>
            <PhoneResults filters={filters} />
          </Suspense>
        </div>

        {/* Desktop: Sticky Sidebar Layout */}
        <div className="hidden lg:flex gap-8">
          {/* Sticky Sidebar Filters */}
          <aside className="w-80 flex-shrink-0">
            <div className="sticky top-6">
              <Suspense fallback={<FiltersLoading />}>
                <PhoneFiltersSection filters={filters} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={<PhoneResultsLoading />}>
              <PhoneResults filters={filters} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

interface SearchParams {
  page?: string;
  brand?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  ram?: string | string[];
  storage?: string | string[];
  chipsetVendor?: string | string[];
  displaySize?: string;
  batteryMin?: string;
  batteryMax?: string;
  fiveG?: string;
  ptaApproved?: string;
  sort?:
    | "relevance"
    | "newest"
    | "price-asc"
    | "price-desc"
    | "ram"
    | "battery"
    | "camera";
  view?: "grid" | "list";
}

interface PhonesPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function PhoneFinderPage({
  searchParams,
}: PhonesPageProps) {
  const params = await searchParams;
  const viewMode = params.view || "grid";
  const currentPage = parseInt(params.page || "1");
  const pageSize = 20;

  // Convert search params to phone filters
  const filters: PhoneFilters = {
    brand: params.brand,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    ram: params.ram,
    storage: params.storage,
    chipsetVendor: params.chipsetVendor,
    displaySize: params.displaySize,
    batteryMin: params.batteryMin,
    batteryMax: params.batteryMax,
    fiveG: params.fiveG,
    ptaApproved: params.ptaApproved,
    sort: params.sort || "relevance",
    view: viewMode,
  };

  // Fetch data using the optimized query functions
  const [phoneResults, brands] = await Promise.all([
    getPhones(filters, { page: currentPage, pageSize }),
    getBrandsWithCounts(),
  ]);

  const { phones, totalCount, totalPages } = phoneResults;

  // Extract active filters for the toolbar
  const activeFilters = extractActiveFilters(filters);

  const currentSort = params.sort || "relevance";

  // Transform phones data to match the expected interface for cards
  const transformedPhones = phones.map((phone) => ({
    ...phone,
    chipset: phone.chipset || undefined,
    mainCamera: phone.mainCamera || undefined,
    frontCamera: phone.frontCamera || undefined,
    os: phone.os || undefined,
    vendorPrices: phone.vendorPrices.map((vp) => ({
      id: vp.id,
      vendor: vp.vendor.name,
      pricePKR: vp.pricePKR,
      availability: "available" as const,
    })),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb navigation" className="border-b">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm" role="list">
            <li role="listitem">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5"
                aria-label="Navigate to home page"
              >
                Home
              </Link>
            </li>
            <ChevronRight
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            <li role="listitem">
              <span className="font-medium text-foreground" aria-current="page">
                Phones
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl font-semibold text-foreground"
              id="page-title"
            >
              Phone Finder
            </h1>
            <div
              className="text-sm text-muted-foreground"
              aria-live="polite"
              aria-describedby="results-count"
              id="results-count"
            >
              {totalCount.toLocaleString()} results
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[320px,1fr] lg:gap-6">
          {/* Left Filter Panel */}
          <div className="hidden lg:block">
            <div
              className="sticky top-[84px] h-[calc(100dvh-96px)] overflow-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <SimpleFilters brands={brands} />
            </div>
          </div>

          {/* Right Results Section */}
          <div className="space-y-6">
            {/* Results Toolbar */}
            <ResultsToolbar
              totalCount={totalCount}
              activeFilters={activeFilters}
              currentSort={currentSort}
            />

            {/* View Toggle */}
            <div className="flex justify-end">
              <div
                className="flex items-center gap-1 bg-muted rounded-lg p-1"
                role="group"
                aria-label="View options"
              >
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    href="/phones?view=grid"
                    aria-label="Switch to grid view"
                    aria-current={viewMode === "grid" ? "true" : undefined}
                  >
                    <Grid3X3 className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    href="/phones?view=list"
                    aria-label="Switch to list view"
                    aria-current={viewMode === "list" ? "true" : undefined}
                  >
                    <List className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Phone Results */}
            <main
              id="phone-results"
              aria-labelledby="page-title"
              aria-describedby="results-count"
            >
              <PhoneCardsGrid phones={transformedPhones} viewMode={viewMode} />
            </main>

            {/* No Results */}
            {phones.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No phones found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button asChild variant="outline">
                  <Link href="/phones">Clear all filters</Link>
                </Button>
              </div>
            )}

            {/* Pagination */}
            <ServerPagination
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={params as Record<string, string | string[]>}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

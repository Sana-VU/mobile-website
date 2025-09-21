import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimpleFilters } from "@/components/phones/simple-filters";
import { ResultsToolbar } from "@/components/phones/results-toolbar";
import { PhoneCardsGrid } from "@/components/phones/phone-cards-grid";
import { Pagination } from "@/components/phones/pagination";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Phone Finder - Find Your Perfect Mobile | WhatMobile",
  description: "Discover and compare mobile phones with advanced filters.",
};

export const dynamic = "force-dynamic";

interface SearchParams {
  page?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  ram?: string;
  storage?: string;
  fiveG?: string;
  sort?: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
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
  const skip = (currentPage - 1) * pageSize;

  // Fetch phones data
  const phones = await db.phone.findMany({
    include: {
      brand: true,
      vendorPrices: {
        orderBy: { pricePKR: "asc" },
        take: 1,
      },
    },
    skip: skip,
    take: pageSize,
  });

  const brands = await db.brand.findMany({
    select: { id: true, name: true, slug: true },
    orderBy: { name: "asc" },
  });

  const totalCount = await db.phone.count();
  const totalPages = Math.ceil(totalCount / pageSize);

  // Create active filters array for the toolbar
  const activeFilters = [];
  if (params.brand) {
    activeFilters.push({ key: 'brand', label: `Brand: ${params.brand}`, value: params.brand });
  }
  if (params.minPrice) {
    activeFilters.push({ key: 'minPrice', label: `Min: PKR ${parseInt(params.minPrice).toLocaleString()}`, value: params.minPrice });
  }
  if (params.maxPrice) {
    activeFilters.push({ key: 'maxPrice', label: `Max: PKR ${parseInt(params.maxPrice).toLocaleString()}`, value: params.maxPrice });
  }
  if (params.ram) {
    activeFilters.push({ key: 'ram', label: `RAM: ${params.ram}GB`, value: params.ram });
  }
  if (params.storage) {
    activeFilters.push({ key: 'storage', label: `Storage: ${params.storage}GB`, value: params.storage });
  }
  if (params.fiveG === 'true') {
    activeFilters.push({ key: 'fiveG', label: '5G Enabled', value: 'true' });
  }

  const currentSort = params.sort || 'relevance';
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="border-b">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <li>
              <span className="font-medium text-foreground">Phones</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Header Bar */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">
              Phone Finder
            </h1>
            <div className="text-sm text-muted-foreground">
              {totalCount.toLocaleString()} results
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[320px,1fr] lg:gap-6">
          {/* Left Sticky Filter Panel */}
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
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link href="/phones?view=grid">
                    <Grid3X3 className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link href="/phones?view=list">
                    <List className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Phone Cards */}
            <PhoneCardsGrid phones={phones} viewMode={viewMode} />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
                  >
                    <Link href="/phones?view=list">
                      <List className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Phone Cards Grid */}
            <div
              className={
                viewMode === "list"
                  ? "space-y-4"
                  : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
              }
            >
              {phones.map((phone) => {
                const lowestPrice = phone.vendorPrices[0]?.pricePKR;
                const phoneSlug = `${phone.brand.name.toLowerCase()}-${phone.name.toLowerCase().replace(/\s+/g, "-")}-${phone.id}`;

                if (viewMode === "list") {
                  return (
                    <Link
                      key={phone.id}
                      href={`/phones/${phoneSlug}`}
                      className="group block"
                    >
                      <div className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                        <div className="flex gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                              <span className="text-xs text-muted-foreground text-center">
                                {phone.brand.name} {phone.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-2">
                              {phone.brand.name} {phone.name}
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  RAM:
                                </span>
                                <span className="ml-1 font-medium">
                                  {phone.ramGB}GB
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Storage:
                                </span>
                                <span className="ml-1 font-medium">
                                  {phone.storageGB}GB
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Display:
                                </span>
                                <span className="ml-1 font-medium">
                                  {phone.displayInch}&quot;
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground">
                                  Battery:
                                </span>
                                <span className="ml-1 font-medium">
                                  {phone.batteryMAh}mAh
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              {lowestPrice && (
                                <p className="text-primary font-semibold text-lg tabular-nums">
                                  {formatPrice(lowestPrice)}
                                </p>
                              )}

                              <div className="flex gap-2">
                                {phone.fiveG && (
                                  <Badge variant="secondary">5G</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={phone.id}
                    href={`/phones/${phoneSlug}`}
                    className="group block"
                  >
                    <div className="bg-card rounded-2xl border p-6 shadow-soft hover:shadow-medium hover-lift transition-smooth card-rounded">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                        <span className="text-xs text-muted-foreground text-center">
                          {phone.brand.name} {phone.name}
                        </span>
                      </div>

                      <h3 className="font-medium text-sm line-clamp-2 mb-2">
                        {phone.brand.name} {phone.name}
                      </h3>

                      <div className="space-y-1">
                        {lowestPrice && (
                          <p className="text-primary font-semibold text-sm tabular-nums">
                            {formatPrice(lowestPrice)}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1">
                          {phone.ramGB && (
                            <Badge variant="secondary" className="text-xs">
                              {phone.ramGB}GB
                            </Badge>
                          )}
                          {phone.fiveG && (
                            <Badge variant="secondary" className="text-xs">
                              5G
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

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
            <div className="flex justify-center items-center py-8">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  asChild
                >
                  <Link href={`/phones?page=${currentPage - 1}`}>Previous</Link>
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(
                    1,
                    Math.min(currentPage - 2 + i, totalPages - 4 + i)
                  );
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      asChild
                    >
                      <Link href={`/phones?page=${pageNum}`}>{pageNum}</Link>
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  asChild
                >
                  <Link href={`/phones?page=${currentPage + 1}`}>Next</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

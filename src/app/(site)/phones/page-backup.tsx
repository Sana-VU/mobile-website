import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleFilters } from "@/components/phones/simple-filters";
import { ResultsToolbar } from "@/components/phones/results-toolbar";
import { PhoneCardsGrid } from "@/components/phones/phone-cards-grid";
import { Pagination } from "@/components/phones/pagination";
import { 
  getPhones, 
  getBrandsWithCounts, 
  extractActiveFilters,
  type PhoneFilters 
} from "@/lib/phones.query";

export const metadata: Metadata = {
  title: "Phone Finder - Find Your Perfect Mobile | WhatMobile",
  description: "Discover and compare mobile phones with advanced filters.",
};

// Enable caching for 5 minutes (300 seconds)
export const revalidate = 300;

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
  sort?: "relevance" | "newest" | "price-asc" | "price-desc" | "ram" | "battery" | "camera";
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
        include: {
          vendor: {
            select: {
              name: true,
            },
          },
        },
        orderBy: { pricePKR: "asc" },
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
    activeFilters.push({
      key: "brand",
      label: `Brand: ${params.brand}`,
      value: params.brand,
    });
  }
  if (params.minPrice) {
    activeFilters.push({
      key: "minPrice",
      label: `Min: PKR ${parseInt(params.minPrice).toLocaleString()}`,
      value: params.minPrice,
    });
  }
  if (params.maxPrice) {
    activeFilters.push({
      key: "maxPrice",
      label: `Max: PKR ${parseInt(params.maxPrice).toLocaleString()}`,
      value: params.maxPrice,
    });
  }
  if (params.ram) {
    activeFilters.push({
      key: "ram",
      label: `RAM: ${params.ram}GB`,
      value: params.ram,
    });
  }
  if (params.storage) {
    activeFilters.push({
      key: "storage",
      label: `Storage: ${params.storage}GB`,
      value: params.storage,
    });
  }
  if (params.fiveG === "true") {
    activeFilters.push({ key: "fiveG", label: "5G Enabled", value: "true" });
  }

  const currentSort = params.sort || "relevance";

  // Transform phones data to match the expected interface
  const transformedPhones = phones.map((phone) => ({
    ...phone,
    chipset: phone.chipset || undefined,
    vendorPrices: phone.vendorPrices.map((vp) => ({
      id: vp.id,
      vendor: vp.vendor.name,
      pricePKR: vp.pricePKR,
      availability: "available", // You might want to get this from your database
    })),
  }));

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
            <PhoneCardsGrid phones={transformedPhones} viewMode={viewMode} />

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}

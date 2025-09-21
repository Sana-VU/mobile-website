import { Metadata } from "next";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { PhoneCard } from "@/components/ui/phone-card";
import { FiltersSheet } from "@/components/phones/filters-sheet-new";
import { PhonesGrid } from "@/components/phones/phones-grid";
import { PhonesGridSkeleton } from "@/components/phones/phones-grid-skeleton";
import { PaginationControls } from "@/components/phones/pagination-controls";
import {
  parseSearchParams,
  calculatePagination,
  createPaginationMeta,
} from "@/lib/pagination";
import { Button } from "@/components/ui/button";
import { Grid, List, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Mobile Phones | WhatMobile",
  description:
    "Browse mobile phones with specifications and prices. Filter by brand, price range, RAM, and 5G connectivity.",
  keywords:
    "mobile phones, smartphones, phone specifications, phone prices, Pakistan",
};

export const dynamic = "force-dynamic";

interface SearchParams {
  page?: string;
  brand?: string;
  min?: string;
  max?: string;
  ram?: string;
  fiveG?: string;
  view?: "grid" | "list";
}

interface PhonesPageProps {
  searchParams: Promise<SearchParams>;
}

async function getPhones(filters: ReturnType<typeof parseSearchParams>) {
  const pageSize = 20;

  // Build where clause based on filters
  const where: any = {};

  if (filters.brand) {
    where.brand = {
      name: {
        contains: filters.brand,
        mode: "insensitive",
      },
    };
  }

  if (filters.ram) {
    const ramValue = parseInt(filters.ram);
    if (!isNaN(ramValue)) {
      where.ramGB = ramValue;
    }
  }

  if (filters.fiveG === "true") {
    where.fiveG = true;
  } else if (filters.fiveG === "false") {
    where.fiveG = false;
  }

  // Price range filter via vendorPrices relation
  if (filters.min || filters.max) {
    const priceWhere: any = {};

    if (filters.min) {
      const minPrice = parseInt(filters.min);
      if (!isNaN(minPrice)) {
        priceWhere.gte = minPrice;
      }
    }

    if (filters.max) {
      const maxPrice = parseInt(filters.max);
      if (!isNaN(maxPrice)) {
        priceWhere.lte = maxPrice;
      }
    }

    if (Object.keys(priceWhere).length > 0) {
      where.vendorPrices = {
        some: {
          pricePKR: priceWhere,
        },
      };
    }
  }

  // Get total count for pagination
  const totalCount = await db.phone.count({ where });

  // Calculate pagination
  const { skip, take, currentPage } = calculatePagination(
    { page: filters.page },
    totalCount,
    pageSize
  );

  // Get phones with filters and pagination
  const phones = await db.phone.findMany({
    where,
    include: {
      brand: true,
      vendorPrices: {
        orderBy: { pricePKR: "asc" },
        take: 1,
      },
    },
    orderBy: { name: "asc" },
    take,
    skip,
  });

  const paginationMeta = createPaginationMeta(
    currentPage,
    totalCount,
    pageSize
  );

  return {
    phones,
    totalCount,
    pagination: paginationMeta,
  };
}

async function getBrands() {
  return await db.brand.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
  const params = await searchParams;
  const filters = parseSearchParams(
    params as { [key: string]: string | string[] | undefined }
  );
  const viewMode = params.view || "grid";

  try {
    const [{ phones, totalCount, pagination }, brands] = await Promise.all([
      getPhones(filters),
      getBrands(),
    ]);

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Mobile Phones</h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Discover {totalCount.toLocaleString()} smartphones with detailed
                specifications
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Filters Button (Mobile) */}
              <FiltersSheet
                brands={brands.map((brand) => ({
                  ...brand,
                  id: brand.id.toString(),
                }))}
                currentFilters={filters}
                totalCount={totalCount}
              />

              {/* View Toggle */}
              <div className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    href={`?${new URLSearchParams({ ...params, view: "grid" }).toString()}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  asChild
                >
                  <Link
                    href={`?${new URLSearchParams({ ...params, view: "list" }).toString()}`}
                  >
                    <List className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          {(filters.brand ||
            filters.min ||
            filters.max ||
            filters.ram ||
            filters.fiveG) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Active filters:</span>
              {filters.brand && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Brand: {filters.brand}
                </span>
              )}
              {filters.ram && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  RAM: {filters.ram}GB
                </span>
              )}
              {(filters.min || filters.max) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Price:{" "}
                  {filters.min
                    ? `Rs ${parseInt(filters.min).toLocaleString()}`
                    : "0"}{" "}
                  -{" "}
                  {filters.max
                    ? `Rs ${parseInt(filters.max).toLocaleString()}`
                    : "∞"}
                </span>
              )}
              {filters.fiveG && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  5G: {filters.fiveG === "true" ? "Yes" : "No"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <Suspense fallback={<PhonesGridSkeleton viewMode={viewMode} />}>
          <PhonesGrid
            phones={phones.map((phone) => ({
              ...phone,
              id: phone.id.toString(),
            }))}
            viewMode={viewMode}
          />
        </Suspense>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-12">
            <PaginationControls
              pagination={pagination}
              searchParams={params as Record<string, string | undefined>}
              basePath="/phones"
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error loading phones:", error);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            We encountered an error while loading the phones.
          </p>
          <Button asChild>
            <Link href="/phones">Try Again</Link>
          </Button>
        </div>
      </div>
    );
  }
}

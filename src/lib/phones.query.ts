import { Prisma } from "@prisma/client";
import { cache } from "react";
import { db } from "@/lib/db";

export interface PhoneFilters {
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

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PhoneQueryResult {
  phones: PhoneWithRelations[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

type PhoneWithRelations = Prisma.PhoneGetPayload<{
  include: {
    brand: {
      select: {
        id: true;
        name: true;
        slug: true;
      };
    };
    vendorPrices: {
      include: {
        vendor: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

/**
 * Build Prisma where clause from search parameters
 */
export function buildWhereClause(
  filters: PhoneFilters
): Prisma.PhoneWhereInput {
  const where: Prisma.PhoneWhereInput = {};

  // Brand filter
  if (filters.brand) {
    const brands = Array.isArray(filters.brand)
      ? filters.brand
      : [filters.brand];
    where.brand = {
      name: {
        in: brands,
      },
    };
  }

  // RAM filter
  if (filters.ram) {
    const ramValues = Array.isArray(filters.ram)
      ? filters.ram.map((r) => parseInt(r)).filter((r) => !isNaN(r))
      : [parseInt(filters.ram)].filter((r) => !isNaN(r));

    if (ramValues.length > 0) {
      where.ramGB = {
        in: ramValues,
      };
    }
  }

  // Storage filter
  if (filters.storage) {
    const storageValues = Array.isArray(filters.storage)
      ? filters.storage.map((s) => parseInt(s)).filter((s) => !isNaN(s))
      : [parseInt(filters.storage)].filter((s) => !isNaN(s));

    if (storageValues.length > 0) {
      where.storageGB = {
        in: storageValues,
      };
    }
  }

  // Chipset vendor filter
  if (filters.chipsetVendor) {
    const vendors = Array.isArray(filters.chipsetVendor)
      ? filters.chipsetVendor
      : [filters.chipsetVendor];

    where.chipset = {
      contains: vendors.join("|"), // Simple approach, can be improved with proper vendor matching
    };
  }

  // Display size filter
  if (filters.displaySize) {
    const size = parseFloat(filters.displaySize);
    if (!isNaN(size)) {
      where.displayInch = {
        gte: size - 0.2, // Allow some tolerance
        lte: size + 0.2,
      };
    }
  }

  // Battery range filters
  if (filters.batteryMin || filters.batteryMax) {
    where.batteryMAh = {};

    if (filters.batteryMin) {
      const min = parseInt(filters.batteryMin);
      if (!isNaN(min)) {
        where.batteryMAh.gte = min;
      }
    }

    if (filters.batteryMax) {
      const max = parseInt(filters.batteryMax);
      if (!isNaN(max)) {
        where.batteryMAh.lte = max;
      }
    }
  }

  // 5G filter
  if (filters.fiveG === "true") {
    where.fiveG = true;
  } else if (filters.fiveG === "false") {
    where.fiveG = false;
  }

  // PTA approved filter
  if (filters.ptaApproved === "true") {
    where.ptaApproved = true;
  } else if (filters.ptaApproved === "false") {
    where.ptaApproved = false;
  }

  // Price range filter - applied to vendorPrices relation
  if (filters.minPrice || filters.maxPrice) {
    const priceFilter: Prisma.IntFilter = {};

    if (filters.minPrice) {
      const min = parseInt(filters.minPrice);
      if (!isNaN(min)) {
        priceFilter.gte = min;
      }
    }

    if (filters.maxPrice) {
      const max = parseInt(filters.maxPrice);
      if (!isNaN(max)) {
        priceFilter.lte = max;
      }
    }

    if (Object.keys(priceFilter).length > 0) {
      where.vendorPrices = {
        some: {
          pricePKR: priceFilter,
        },
      };
    }
  }

  return where;
}

/**
 * Build Prisma orderBy clause from sort parameter
 */
export function buildOrderByClause(
  sortBy?: string
): Prisma.PhoneOrderByWithRelationInput[] {
  switch (sortBy) {
    case "newest":
      return [{ releaseYear: "desc" }, { createdAt: "desc" }];

    case "price-asc":
      return [{ name: "asc" }];

    case "price-desc":
      return [{ name: "desc" }];

    case "ram":
      return [{ ramGB: "desc" }, { name: "asc" }];

    case "battery":
      return [{ batteryMAh: "desc" }, { name: "asc" }];

    case "camera":
      return [{ mainCamera: "desc" }, { name: "asc" }];

    case "relevance":
    default:
      return [{ name: "asc" }, { brand: { name: "asc" } }];
  }
}

/**
 * Edge-safe pagination helper
 */
export function getPaginationParams(page: number, pageSize: number = 20) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 100); // Max 100 items per page
  const skip = (safePage - 1) * safePageSize;

  return {
    page: safePage,
    pageSize: safePageSize,
    skip,
    take: safePageSize,
  };
}

/**
 * Build pagination metadata
 */
export function buildPaginationMeta(
  currentPage: number,
  pageSize: number,
  totalCount: number
): {
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
} {
  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? currentPage + 1 : null,
    prevPage: hasPrevPage ? currentPage - 1 : null,
  };
}

/**
 * Main phone query function with caching
 */
export const getPhones = cache(
  async (
    filters: PhoneFilters,
    pagination: PaginationOptions
  ): Promise<PhoneQueryResult> => {
    const { skip, take } = getPaginationParams(
      pagination.page,
      pagination.pageSize
    );
    const where = buildWhereClause(filters);
    const orderBy = buildOrderByClause(filters.sort);

    // Execute count and data queries in parallel
    const [phones, totalCount] = await Promise.all([
      db.phone.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
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
      }),
      db.phone.count({ where }),
    ]);

    const paginationMeta = buildPaginationMeta(
      pagination.page,
      pagination.pageSize,
      totalCount
    );

    return {
      phones,
      totalCount,
      currentPage: pagination.page,
      ...paginationMeta,
    };
  }
);

/**
 * Get brands with phone counts - cached
 */
export const getBrandsWithCounts = cache(async () => {
  return db.brand.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      _count: {
        select: {
          phones: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
});

/**
 * Get filter options - cached for expensive derived data
 */
export const getFilterOptions = cache(async () => {
  const [ramOptions, storageOptions, chipsetVendors] = await Promise.all([
    // Get unique RAM values
    db.phone
      .findMany({
        select: { ramGB: true },
        distinct: ["ramGB"],
        where: { ramGB: { not: undefined } },
        orderBy: { ramGB: "asc" },
      })
      .then((results) => results.map((r) => r.ramGB).filter(Boolean)),

    // Get unique storage values
    db.phone
      .findMany({
        select: { storageGB: true },
        distinct: ["storageGB"],
        where: { storageGB: { not: undefined } },
        orderBy: { storageGB: "asc" },
      })
      .then((results) => results.map((r) => r.storageGB).filter(Boolean)),

    // Get unique chipset vendors (extract from chipset field)
    db.phone
      .findMany({
        select: { chipset: true },
        distinct: ["chipset"],
        where: { chipset: { not: null } },
      })
      .then((results) => {
        const vendors = new Set<string>();
        results.forEach((r) => {
          if (r.chipset) {
            // Extract vendor from chipset string (e.g., "Snapdragon 8 Gen 2" -> "Qualcomm")
            const chipset = r.chipset.toLowerCase();
            if (
              chipset.includes("snapdragon") ||
              chipset.includes("qualcomm")
            ) {
              vendors.add("Qualcomm");
            } else if (
              chipset.includes("mediatek") ||
              chipset.includes("dimensity") ||
              chipset.includes("helio")
            ) {
              vendors.add("MediaTek");
            } else if (chipset.includes("exynos")) {
              vendors.add("Samsung Exynos");
            } else if (
              chipset.includes("bionic") ||
              chipset.includes("apple")
            ) {
              vendors.add("Apple");
            } else if (chipset.includes("tensor")) {
              vendors.add("Google Tensor");
            } else if (chipset.includes("unisoc")) {
              vendors.add("Unisoc");
            }
          }
        });
        return Array.from(vendors).sort();
      }),
  ]);

  return {
    ramOptions,
    storageOptions,
    chipsetVendors,
  };
});

/**
 * Extract active filters for display
 */
export function extractActiveFilters(filters: PhoneFilters) {
  const activeFilters = [];

  if (filters.brand) {
    const brands = Array.isArray(filters.brand)
      ? filters.brand
      : [filters.brand];
    brands.forEach((brand) => {
      activeFilters.push({
        key: "brand",
        label: `Brand: ${brand}`,
        value: brand,
      });
    });
  }

  if (filters.minPrice) {
    activeFilters.push({
      key: "minPrice",
      label: `Min: PKR ${parseInt(filters.minPrice).toLocaleString()}`,
      value: filters.minPrice,
    });
  }

  if (filters.maxPrice) {
    activeFilters.push({
      key: "maxPrice",
      label: `Max: PKR ${parseInt(filters.maxPrice).toLocaleString()}`,
      value: filters.maxPrice,
    });
  }

  if (filters.ram) {
    const rams = Array.isArray(filters.ram) ? filters.ram : [filters.ram];
    rams.forEach((ram) => {
      activeFilters.push({ key: "ram", label: `RAM: ${ram}GB`, value: ram });
    });
  }

  if (filters.storage) {
    const storages = Array.isArray(filters.storage)
      ? filters.storage
      : [filters.storage];
    storages.forEach((storage) => {
      activeFilters.push({
        key: "storage",
        label: `Storage: ${storage}GB`,
        value: storage,
      });
    });
  }

  if (filters.fiveG === "true") {
    activeFilters.push({ key: "fiveG", label: "5G Enabled", value: "true" });
  }

  if (filters.ptaApproved === "true") {
    activeFilters.push({
      key: "ptaApproved",
      label: "PTA Approved",
      value: "true",
    });
  }

  return activeFilters;
}

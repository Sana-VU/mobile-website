import { Prisma } from "@prisma/client";
import { cache } from "react";
import { db } from "@/lib/db";
import type { PhoneFilters } from "./url-state";

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
}

export interface PhoneQueryResult {
  phones: PhoneWithRelations[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type PhoneWithRelations = Prisma.PhoneGetPayload<{
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
 * Calculate pagination parameters
 */
export function calculatePagination(
  page: number = 1,
  pageSize: number = 20
): PaginationResult {
  const validPage = Math.max(1, page);
  const validPageSize = Math.min(Math.max(1, pageSize), 100);

  return {
    skip: (validPage - 1) * validPageSize,
    take: validPageSize,
  };
}

/**
 * Build Prisma where clause from filters
 */
export function buildWhereClause(
  filters: PhoneFilters
): Prisma.PhoneWhereInput {
  const where: Prisma.PhoneWhereInput = {};

  // Brand filter
  if (filters.brand && filters.brand.length > 0) {
    where.brand = {
      name: {
        in: filters.brand,
      },
    };
  }

  // Price range
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.vendorPrices = {
      some: {
        pricePKR: {
          ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
          ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
        },
      },
    };
  }

  // RAM filter
  if (filters.ram && filters.ram.length > 0) {
    where.ramGB = {
      in: filters.ram,
    };
  }

  // Storage filter
  if (filters.storage && filters.storage.length > 0) {
    where.storageGB = {
      in: filters.storage,
    };
  }

  // Chipset vendor filter (using chipset field)
  if (filters.chipsetVendor && filters.chipsetVendor.length > 0) {
    where.chipset = {
      in: filters.chipsetVendor,
    };
  }

  // Display size filter
  if (filters.displaySize) {
    const sizeRanges = {
      small: { gte: 0, lt: 6 },
      medium: { gte: 6, lt: 6.5 },
      large: { gte: 6.5, lt: 7 },
      xlarge: { gte: 7 },
    };

    const range = sizeRanges[filters.displaySize as keyof typeof sizeRanges];
    if (range) {
      where.displayInch = range;
    }
  }

  // Battery range
  if (filters.batteryMin !== undefined || filters.batteryMax !== undefined) {
    where.batteryMAh = {
      ...(filters.batteryMin !== undefined && { gte: filters.batteryMin }),
      ...(filters.batteryMax !== undefined && { lte: filters.batteryMax }),
    };
  }

  // 5G filter
  if (filters.fiveG) {
    where.fiveG = true;
  }

  // PTA approved filter
  if (filters.ptaApproved) {
    where.ptaApproved = true;
  }

  return where;
}

/**
 * Build Prisma orderBy clause from sort option
 */
export function buildOrderByClause(
  sort: PhoneFilters["sort"] = "relevance"
): Prisma.PhoneOrderByWithRelationInput[] {
  switch (sort) {
    case "newest":
      return [{ releaseYear: "desc" }, { createdAt: "desc" }];
    case "price-asc":
      return [{ name: "asc" }]; // Simplified - would need complex aggregation
    case "price-desc":
      return [{ name: "asc" }]; // Simplified - would need complex aggregation
    case "ram":
      return [{ ramGB: "desc" }, { name: "asc" }];
    case "battery":
      return [{ batteryMAh: "desc" }, { name: "asc" }];
    case "camera":
      return [{ mainCamera: "desc" }, { name: "asc" }];
    case "relevance":
    default:
      return [{ name: "asc" }];
  }
}

/**
 * Get phones with filters and pagination
 */
export const getPhones = cache(
  async (
    filters: PhoneFilters = {},
    pagination: PaginationOptions = { page: 1, pageSize: 20 }
  ): Promise<PhoneQueryResult> => {
    try {
      const where = buildWhereClause(filters);
      const orderBy = buildOrderByClause(filters.sort);
      const { skip, take } = calculatePagination(
        pagination.page,
        pagination.pageSize
      );

      // Get total count and phones in parallel
      const [totalCount, phones] = await Promise.all([
        db.phone.count({ where }),
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
              orderBy: {
                pricePKR: "asc",
              },
            },
          },
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pagination.pageSize);
      const currentPage = pagination.page;

      return {
        phones,
        totalCount,
        totalPages,
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      };
    } catch (error) {
      console.error("Error fetching phones:", error);
      return {
        phones: [],
        totalCount: 0,
        totalPages: 0,
        currentPage: pagination.page,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
  }
);

/**
 * Get available filter options
 */
export const getFilterOptions = cache(async () => {
  try {
    const [brands, ramOptions, storageOptions, chipsetVendors] =
      await Promise.all([
        db.brand.findMany({
          select: {
            name: true,
            _count: {
              select: {
                phones: true,
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        }),
        db.phone.findMany({
          select: {
            ramGB: true,
          },
          distinct: ["ramGB"],
          orderBy: {
            ramGB: "asc",
          },
        }),
        db.phone.findMany({
          select: {
            storageGB: true,
          },
          distinct: ["storageGB"],
          orderBy: {
            storageGB: "asc",
          },
        }),
        db.phone.findMany({
          select: {
            chipset: true,
          },
          distinct: ["chipset"],
          where: {
            chipset: {
              not: null,
            },
          },
          orderBy: {
            chipset: "asc",
          },
        }),
      ]);

    return {
      brands: brands.filter((brand) => brand._count.phones > 0),
      ramOptions: ramOptions.map((phone) => phone.ramGB).filter(Boolean),
      storageOptions: storageOptions
        .map((phone) => phone.storageGB)
        .filter(Boolean),
      chipsetVendors: chipsetVendors
        .map((phone) => phone.chipset)
        .filter(Boolean),
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    return {
      brands: [],
      ramOptions: [],
      storageOptions: [],
      chipsetVendors: [],
    };
  }
});

/**
 * Get price range for filters
 */
export const getPriceRange = cache(
  async (): Promise<{ min: number; max: number }> => {
    try {
      const result = await db.vendorPrice.aggregate({
        _min: {
          pricePKR: true,
        },
        _max: {
          pricePKR: true,
        },
      });

      return {
        min: result._min?.pricePKR || 0,
        max: result._max?.pricePKR || 100000,
      };
    } catch (error) {
      console.error("Error fetching price range:", error);
      return { min: 0, max: 100000 };
    }
  }
);

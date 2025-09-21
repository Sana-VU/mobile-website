/**
 * Pagination utility functions for server-side pagination
 */

export interface PaginationParams {
  page?: string;
  limit?: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Calculate pagination parameters for database queries
 */
export function calculatePagination(
  params: PaginationParams,
  totalItems: number,
  defaultLimit: number = 20
): PaginationResult {
  const limit = params.limit || defaultLimit;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const skip = (currentPage - 1) * limit;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    skip,
    take: limit,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Generate pagination metadata for UI components
 */
export function createPaginationMeta(
  currentPage: number,
  totalItems: number,
  itemsPerPage: number = 20
): PaginationMeta {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Generate array of page numbers for pagination UI
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | "...")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - half);
  const end = Math.min(totalPages, start + maxVisible - 1);

  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages: (number | "...")[] = [];

  // Add first page and ellipsis if needed
  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  // Add page numbers
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Add ellipsis and last page if needed
  if (end < totalPages) {
    if (end < totalPages - 1) {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  return pages;
}

/**
 * Create URL with updated search parameters
 */
export function createPageUrl(
  basePath: string,
  searchParams: URLSearchParams,
  page: number
): string {
  const newParams = new URLSearchParams(searchParams);
  if (page === 1) {
    newParams.delete("page");
  } else {
    newParams.set("page", page.toString());
  }

  const queryString = newParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Parse search parameters for filtering
 */
export function parseSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  return {
    page: typeof searchParams.page === "string" ? searchParams.page : "1",
    brand:
      typeof searchParams.brand === "string" ? searchParams.brand : undefined,
    min: typeof searchParams.min === "string" ? searchParams.min : undefined,
    max: typeof searchParams.max === "string" ? searchParams.max : undefined,
    ram: typeof searchParams.ram === "string" ? searchParams.ram : undefined,
    fiveG:
      typeof searchParams.fiveG === "string" ? searchParams.fiveG : undefined,
  };
}

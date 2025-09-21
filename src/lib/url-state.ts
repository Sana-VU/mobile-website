export interface PhoneFilters {
  page?: number;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  ram?: number[];
  storage?: number[];
  chipsetVendor?: string[];
  displaySize?: string;
  batteryMin?: number;
  batteryMax?: number;
  fiveG?: boolean;
  ptaApproved?: boolean;
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

/**
 * Parse URL search parameters into typed filters
 */
export function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): PhoneFilters {
  const filters: PhoneFilters = {};

  // Page
  if (searchParams.page && typeof searchParams.page === "string") {
    const page = parseInt(searchParams.page, 10);
    if (!isNaN(page) && page > 0) {
      filters.page = page;
    }
  }

  // Brand (multi-select)
  if (searchParams.brand) {
    const brands = Array.isArray(searchParams.brand)
      ? searchParams.brand
      : [searchParams.brand];
    filters.brand = brands.filter(Boolean);
  }

  // Price range
  if (searchParams.minPrice && typeof searchParams.minPrice === "string") {
    const minPrice = parseFloat(searchParams.minPrice);
    if (!isNaN(minPrice) && minPrice >= 0) {
      filters.minPrice = minPrice;
    }
  }
  if (searchParams.maxPrice && typeof searchParams.maxPrice === "string") {
    const maxPrice = parseFloat(searchParams.maxPrice);
    if (!isNaN(maxPrice) && maxPrice >= 0) {
      filters.maxPrice = maxPrice;
    }
  }

  // RAM (multi-select)
  if (searchParams.ram) {
    const ramValues = Array.isArray(searchParams.ram)
      ? searchParams.ram
      : [searchParams.ram];
    const validRam = ramValues
      .map((v) => parseInt(v, 10))
      .filter((v) => !isNaN(v) && v > 0);
    if (validRam.length > 0) {
      filters.ram = validRam;
    }
  }

  // Storage (multi-select)
  if (searchParams.storage) {
    const storageValues = Array.isArray(searchParams.storage)
      ? searchParams.storage
      : [searchParams.storage];
    const validStorage = storageValues
      .map((v) => parseInt(v, 10))
      .filter((v) => !isNaN(v) && v > 0);
    if (validStorage.length > 0) {
      filters.storage = validStorage;
    }
  }

  // Chipset Vendor (multi-select)
  if (searchParams.chipsetVendor) {
    const vendors = Array.isArray(searchParams.chipsetVendor)
      ? searchParams.chipsetVendor
      : [searchParams.chipsetVendor];
    filters.chipsetVendor = vendors.filter(Boolean);
  }

  // Display Size
  if (
    searchParams.displaySize &&
    typeof searchParams.displaySize === "string"
  ) {
    filters.displaySize = searchParams.displaySize;
  }

  // Battery range
  if (searchParams.batteryMin && typeof searchParams.batteryMin === "string") {
    const batteryMin = parseInt(searchParams.batteryMin, 10);
    if (!isNaN(batteryMin) && batteryMin > 0) {
      filters.batteryMin = batteryMin;
    }
  }
  if (searchParams.batteryMax && typeof searchParams.batteryMax === "string") {
    const batteryMax = parseInt(searchParams.batteryMax, 10);
    if (!isNaN(batteryMax) && batteryMax > 0) {
      filters.batteryMax = batteryMax;
    }
  }

  // Boolean filters
  if (searchParams.fiveG === "true") {
    filters.fiveG = true;
  }
  if (searchParams.ptaApproved === "true") {
    filters.ptaApproved = true;
  }

  // Sort
  if (searchParams.sort && typeof searchParams.sort === "string") {
    const validSorts = [
      "relevance",
      "newest",
      "price-asc",
      "price-desc",
      "ram",
      "battery",
      "camera",
    ];
    if (validSorts.includes(searchParams.sort)) {
      filters.sort = searchParams.sort as PhoneFilters["sort"];
    }
  }

  // View
  if (searchParams.view && typeof searchParams.view === "string") {
    if (["grid", "list"].includes(searchParams.view)) {
      filters.view = searchParams.view as "grid" | "list";
    }
  }

  return filters;
}

/**
 * Convert filters back to URL search parameters
 */
export function filtersToSearchParams(filters: PhoneFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.page && filters.page > 1) {
    params.set("page", filters.page.toString());
  }

  if (filters.brand && filters.brand.length > 0) {
    filters.brand.forEach((brand) => params.append("brand", brand));
  }

  if (filters.minPrice !== undefined) {
    params.set("minPrice", filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined) {
    params.set("maxPrice", filters.maxPrice.toString());
  }

  if (filters.ram && filters.ram.length > 0) {
    filters.ram.forEach((ram) => params.append("ram", ram.toString()));
  }

  if (filters.storage && filters.storage.length > 0) {
    filters.storage.forEach((storage) =>
      params.append("storage", storage.toString())
    );
  }

  if (filters.chipsetVendor && filters.chipsetVendor.length > 0) {
    filters.chipsetVendor.forEach((vendor) =>
      params.append("chipsetVendor", vendor)
    );
  }

  if (filters.displaySize) {
    params.set("displaySize", filters.displaySize);
  }

  if (filters.batteryMin !== undefined) {
    params.set("batteryMin", filters.batteryMin.toString());
  }

  if (filters.batteryMax !== undefined) {
    params.set("batteryMax", filters.batteryMax.toString());
  }

  if (filters.fiveG) {
    params.set("fiveG", "true");
  }

  if (filters.ptaApproved) {
    params.set("ptaApproved", "true");
  }

  if (filters.sort && filters.sort !== "relevance") {
    params.set("sort", filters.sort);
  }

  if (filters.view && filters.view !== "grid") {
    params.set("view", filters.view);
  }

  return params;
}

/**
 * Generate URL with updated filters
 */
export function createFilterUrl(
  currentFilters: PhoneFilters,
  updates: Partial<PhoneFilters>,
  basePath = "/phones"
): string {
  const newFilters = { ...currentFilters, ...updates };

  // Reset to page 1 when filters change (except when explicitly setting page)
  if (!("page" in updates)) {
    newFilters.page = 1;
  }

  const searchParams = filtersToSearchParams(newFilters);
  const queryString = searchParams.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Remove a specific filter
 */
export function removeFilter(
  currentFilters: PhoneFilters,
  filterKey: keyof PhoneFilters,
  value?: string | number
): PhoneFilters {
  const newFilters = { ...currentFilters };

  if (value !== undefined && Array.isArray(newFilters[filterKey])) {
    // Remove specific value from array
    (newFilters[filterKey] as any[]) = (newFilters[filterKey] as any[]).filter(
      (v) => v !== value
    );
    if ((newFilters[filterKey] as any[]).length === 0) {
      delete newFilters[filterKey];
    }
  } else {
    // Remove entire filter
    delete newFilters[filterKey];
  }

  // Reset to page 1
  newFilters.page = 1;

  return newFilters;
}

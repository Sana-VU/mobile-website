import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  buildWhereClause,
  buildOrderByClause,
  calculatePagination,
} from "../phones-query";
import type { PhoneFilters } from "../url-state";

describe("phones-query", () => {
  describe("calculatePagination", () => {
    it("should return correct skip and take for page 1", () => {
      const result = calculatePagination(1, 20);
      expect(result).toEqual({
        skip: 0,
        take: 20,
      });
    });

    it("should return correct skip and take for page 2", () => {
      const result = calculatePagination(2, 20);
      expect(result).toEqual({
        skip: 20,
        take: 20,
      });
    });

    it("should handle invalid page numbers", () => {
      const result = calculatePagination(-1, 20);
      expect(result).toEqual({
        skip: 0,
        take: 20,
      });
    });

    it("should limit page size to maximum", () => {
      const result = calculatePagination(1, 200);
      expect(result.take).toBe(100);
    });
  });

  describe("buildWhereClause", () => {
    it("should return empty where clause for no filters", () => {
      const filters: PhoneFilters = {};
      const result = buildWhereClause(filters);
      expect(result).toEqual({});
    });

    it("should filter by brand", () => {
      const filters: PhoneFilters = {
        brand: ["Apple", "Samsung"],
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        brand: {
          name: {
            in: ["Apple", "Samsung"],
          },
        },
      });
    });

    it("should filter by price range", () => {
      const filters: PhoneFilters = {
        minPrice: 1000,
        maxPrice: 5000,
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        vendorPrices: {
          some: {
            pricePKR: {
              gte: 1000,
              lte: 5000,
            },
          },
        },
      });
    });

    it("should filter by RAM", () => {
      const filters: PhoneFilters = {
        ram: [4, 8, 12],
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        ramGB: {
          in: [4, 8, 12],
        },
      });
    });

    it("should filter by storage", () => {
      const filters: PhoneFilters = {
        storage: [64, 128, 256],
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        storageGB: {
          in: [64, 128, 256],
        },
      });
    });

    it("should filter by chipset vendor", () => {
      const filters: PhoneFilters = {
        chipsetVendor: ["Snapdragon", "MediaTek"],
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        chipset: {
          in: ["Snapdragon", "MediaTek"],
        },
      });
    });

    it("should filter by display size", () => {
      const filters: PhoneFilters = {
        displaySize: "large",
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        displayInch: {
          gte: 6.5,
          lt: 7,
        },
      });
    });

    it("should filter by battery range", () => {
      const filters: PhoneFilters = {
        batteryMin: 3000,
        batteryMax: 5000,
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        batteryMAh: {
          gte: 3000,
          lte: 5000,
        },
      });
    });

    it("should filter by 5G support", () => {
      const filters: PhoneFilters = {
        fiveG: true,
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        fiveG: true,
      });
    });

    it("should filter by PTA approval", () => {
      const filters: PhoneFilters = {
        ptaApproved: true,
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        ptaApproved: true,
      });
    });

    it("should combine multiple filters", () => {
      const filters: PhoneFilters = {
        brand: ["Apple"],
        ram: [8],
        fiveG: true,
        minPrice: 1000,
      };
      const result = buildWhereClause(filters);
      expect(result).toEqual({
        brand: {
          name: {
            in: ["Apple"],
          },
        },
        ramGB: {
          in: [8],
        },
        fiveG: true,
        vendorPrices: {
          some: {
            pricePKR: {
              gte: 1000,
            },
          },
        },
      });
    });
  });

  describe("buildOrderByClause", () => {
    it("should return default order for relevance", () => {
      const result = buildOrderByClause("relevance");
      expect(result).toEqual([{ name: "asc" }]);
    });

    it("should order by newest", () => {
      const result = buildOrderByClause("newest");
      expect(result).toEqual([{ releaseYear: "desc" }, { createdAt: "desc" }]);
    });

    it("should order by RAM", () => {
      const result = buildOrderByClause("ram");
      expect(result).toEqual([{ ramGB: "desc" }, { name: "asc" }]);
    });

    it("should order by battery", () => {
      const result = buildOrderByClause("battery");
      expect(result).toEqual([{ batteryMAh: "desc" }, { name: "asc" }]);
    });

    it("should order by camera", () => {
      const result = buildOrderByClause("camera");
      expect(result).toEqual([{ mainCamera: "desc" }, { name: "asc" }]);
    });

    it("should handle undefined sort", () => {
      const result = buildOrderByClause();
      expect(result).toEqual([{ name: "asc" }]);
    });
  });
});

"use client";

import { useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface UseQueryStateOptions {
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;
  /**
   * Whether to replace current history entry or push new one
   * @default false (push new entry)
   */
  replace?: boolean;
}

type QueryValue = string | string[] | number | boolean | null | undefined;

interface QueryStateHelpers {
  /**
   * Set a single query parameter
   */
  setParam: (key: string, value: QueryValue) => void;
  /**
   * Set multiple query parameters at once
   */
  setParams: (params: Record<string, QueryValue>) => void;
  /**
   * Remove a query parameter
   */
  removeParam: (key: string) => void;
  /**
   * Remove multiple query parameters
   */
  removeParams: (keys: string[]) => void;
  /**
   * Clear all query parameters
   */
  clearAll: () => void;
  /**
   * Toggle a value in an array parameter
   */
  toggleArrayParam: (key: string, value: string) => void;
  /**
   * Get current search params (non-reactive, for immediate reads)
   */
  getCurrentParams: () => URLSearchParams;
}

/**
 * Hook for managing URL query state with debouncing
 *
 * This hook provides utilities to update URL search parameters while:
 * - Debouncing rapid updates to prevent excessive navigation
 * - Maintaining SSR compatibility by keeping state in URL only
 * - Supporting both single values and arrays
 * - Providing both replace and push navigation modes
 *
 * @example
 * ```tsx
 * const { setParam, setParams, toggleArrayParam } = useQueryState({
 *   debounceMs: 300,
 *   replace: true
 * });
 *
 * // Set single parameter
 * setParam('search', 'iphone');
 *
 * // Set multiple parameters
 * setParams({ page: '1', sort: 'price-asc' });
 *
 * // Toggle array value (brands, RAM options, etc.)
 * toggleArrayParam('brand', 'apple');
 * ```
 */
export function useQueryState(
  options: UseQueryStateOptions = {}
): QueryStateHelpers {
  const { debounceMs = 300, replace = false } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const buildUrl = useCallback(
    (params: URLSearchParams): string => {
      const paramString = params.toString();
      const currentPathname = pathname || "";
      return paramString
        ? `${currentPathname}?${paramString}`
        : currentPathname;
    },
    [pathname]
  );

  const navigateWithDebounce = useCallback(
    (newParams: URLSearchParams) => {
      // Clear existing timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      // Set new debounced navigation
      debounceRef.current = setTimeout(() => {
        const url = buildUrl(newParams);

        if (replace) {
          router.replace(url);
        } else {
          router.push(url);
        }
      }, debounceMs);
    },
    [router, buildUrl, replace, debounceMs]
  );

  const normalizeValue = (value: QueryValue): string | string[] | null => {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    if (typeof value === "boolean") {
      return value ? "true" : null;
    }

    if (typeof value === "number") {
      return value.toString();
    }

    if (Array.isArray(value)) {
      const filtered = value.filter(
        (v) => v !== null && v !== undefined && v !== ""
      );
      return filtered.length > 0 ? filtered.map(String) : null;
    }

    return String(value);
  };

  const setParam = useCallback(
    (key: string, value: QueryValue) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      const normalizedValue = normalizeValue(value);

      if (normalizedValue === null) {
        params.delete(key);
      } else if (Array.isArray(normalizedValue)) {
        params.delete(key);
        normalizedValue.forEach((v) => params.append(key, v));
      } else {
        params.set(key, normalizedValue);
      }

      navigateWithDebounce(params);
    },
    [searchParams, navigateWithDebounce]
  );

  const setParams = useCallback(
    (paramsObj: Record<string, QueryValue>) => {
      const params = new URLSearchParams(searchParams?.toString() || "");

      Object.entries(paramsObj).forEach(([key, value]) => {
        const normalizedValue = normalizeValue(value);

        if (normalizedValue === null) {
          params.delete(key);
        } else if (Array.isArray(normalizedValue)) {
          params.delete(key);
          normalizedValue.forEach((v) => params.append(key, v));
        } else {
          params.set(key, normalizedValue);
        }
      });

      navigateWithDebounce(params);
    },
    [searchParams, navigateWithDebounce]
  );

  const removeParam = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      params.delete(key);
      navigateWithDebounce(params);
    },
    [searchParams, navigateWithDebounce]
  );

  const removeParams = useCallback(
    (keys: string[]) => {
      const params = new URLSearchParams(searchParams?.toString() || "");
      keys.forEach((key) => params.delete(key));
      navigateWithDebounce(params);
    },
    [searchParams, navigateWithDebounce]
  );

  const clearAll = useCallback(() => {
    navigateWithDebounce(new URLSearchParams());
  }, [navigateWithDebounce]);

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const current = searchParams?.getAll(key) || [];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      setParam(key, newValues);
    },
    [searchParams, setParam]
  );

  const getCurrentParams = useCallback(() => {
    return new URLSearchParams(searchParams?.toString() || "");
  }, [searchParams]);

  return {
    setParam,
    setParams,
    removeParam,
    removeParams,
    clearAll,
    toggleArrayParam,
    getCurrentParams,
  };
}

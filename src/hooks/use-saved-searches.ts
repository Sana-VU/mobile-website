"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export interface SavedSearch {
  id: string;
  name: string;
  filters: Record<string, string | string[]>;
  timestamp: number;
  count?: number; // Optional: number of results when saved
}

const STORAGE_KEY = "whatmobile_saved_searches";
const MAX_SAVED_SEARCHES = 10;

/**
 * Hook for managing saved searches in localStorage
 *
 * Provides functionality to save current filter state, load saved searches,
 * and manage the saved searches list with localStorage persistence.
 */
export function useSavedSearches() {
  const searchParams = useSearchParams();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedSearch[];
        // Sort by timestamp (newest first)
        setSavedSearches(parsed.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error("Failed to load saved searches:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever savedSearches changes
  const persistSearches = useCallback((searches: SavedSearch[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error("Failed to save searches:", error);
    }
  }, []);

  // Get current filters from URL params
  const getCurrentFilters = useCallback((): Record<
    string,
    string | string[]
  > => {
    if (!searchParams) return {};

    const filters: Record<string, string | string[]> = {};
    const params = new URLSearchParams(searchParams.toString());

    // Group multiple values for the same key into arrays
    const grouped: Record<string, string[]> = {};
    params.forEach((value, key) => {
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(value);
    });

    // Convert single-item arrays back to strings for cleaner storage
    Object.entries(grouped).forEach(([key, values]) => {
      if (values.length === 1) {
        filters[key] = values[0];
      } else {
        filters[key] = values;
      }
    });

    return filters;
  }, [searchParams]);

  // Check if current filters match a saved search
  const getCurrentSearchMatch = useCallback((): SavedSearch | null => {
    const currentFilters = getCurrentFilters();
    const currentString = JSON.stringify(currentFilters);

    return (
      savedSearches.find(
        (search) => JSON.stringify(search.filters) === currentString
      ) || null
    );
  }, [getCurrentFilters, savedSearches]);

  // Save current search with a name
  const saveCurrentSearch = useCallback(
    (name: string, resultCount?: number) => {
      const currentFilters = getCurrentFilters();

      // Don't save if no filters are active
      if (Object.keys(currentFilters).length === 0) {
        throw new Error("No filters to save");
      }

      // Check if this exact search already exists
      const existing = savedSearches.find(
        (search) =>
          JSON.stringify(search.filters) === JSON.stringify(currentFilters)
      );

      if (existing) {
        throw new Error("This search is already saved");
      }

      const newSearch: SavedSearch = {
        id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        filters: currentFilters,
        timestamp: Date.now(),
        count: resultCount,
      };

      const updatedSearches = [newSearch, ...savedSearches]
        .slice(0, MAX_SAVED_SEARCHES) // Keep only the most recent searches
        .sort((a, b) => b.timestamp - a.timestamp);

      setSavedSearches(updatedSearches);
      persistSearches(updatedSearches);

      return newSearch;
    },
    [getCurrentFilters, savedSearches, persistSearches]
  );

  // Load a saved search (returns URL to navigate to)
  const loadSearch = useCallback(
    (searchId: string): string => {
      const search = savedSearches.find((s) => s.id === searchId);
      if (!search) {
        throw new Error("Search not found");
      }

      // Build URL with filters
      const params = new URLSearchParams();
      Object.entries(search.filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      });

      return `/phones?${params.toString()}`;
    },
    [savedSearches]
  );

  // Delete a saved search
  const deleteSearch = useCallback(
    (searchId: string) => {
      const updatedSearches = savedSearches.filter((s) => s.id !== searchId);
      setSavedSearches(updatedSearches);
      persistSearches(updatedSearches);
    },
    [savedSearches, persistSearches]
  );

  // Clear all saved searches
  const clearAllSearches = useCallback(() => {
    setSavedSearches([]);
    persistSearches([]);
  }, [persistSearches]);

  // Get filter summary for display
  const getFilterSummary = useCallback(
    (filters: Record<string, string | string[]>): string => {
      const parts: string[] = [];

      Object.entries(filters).forEach(([key, value]) => {
        if (key === "page") return; // Skip pagination

        const displayKey =
          key === "fiveG"
            ? "5G"
            : key === "ptaApproved"
              ? "PTA"
              : key === "minPrice"
                ? "Min"
                : key === "maxPrice"
                  ? "Max"
                  : key.charAt(0).toUpperCase() + key.slice(1);

        if (Array.isArray(value)) {
          parts.push(`${displayKey}: ${value.length} selected`);
        } else {
          if (key === "fiveG" || key === "ptaApproved") {
            if (value === "true") parts.push(displayKey);
          } else {
            parts.push(`${displayKey}: ${value}`);
          }
        }
      });

      return parts.join(", ") || "No filters";
    },
    []
  );

  return {
    savedSearches,
    isLoading,
    saveCurrentSearch,
    loadSearch,
    deleteSearch,
    clearAllSearches,
    getCurrentFilters,
    getCurrentSearchMatch,
    getFilterSummary,
  };
}

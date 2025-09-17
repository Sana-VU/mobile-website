"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PhoneSearchDocument } from "@/lib/search-index";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showResults?: boolean;
  onSelect?: (phone: PhoneSearchDocument) => void;
}

interface SearchResponse {
  success: boolean;
  query: string;
  results: PhoneSearchDocument[];
  count: number;
  error?: string;
}

export function SearchBar({
  placeholder = "Search phones...",
  className = "",
  showResults = true,
  onSelect,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PhoneSearchDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounced search with cleanup
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeoutId = setTimeout(async () => {
        if (!searchQuery.trim()) {
          setResults([]);
          setShowDropdown(false);
          return;
        }

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(searchQuery)}&limit=10`
          );
          const data: SearchResponse = await response.json();

          if (data.success) {
            setResults(data.results);
            setShowDropdown(data.results.length > 0);
            setSelectedIndex(-1);
          } else {
            setError(data.error || "Search failed");
            setResults([]);
            setShowDropdown(false);
          }
        } catch (err) {
          console.error("Search error:", err);
          setError("Failed to search. Please try again.");
          setResults([]);
          setShowDropdown(false);
        } finally {
          setIsLoading(false);
        }
      }, 300);

      setDebounceTimeout(timeoutId);
    },
    [debounceTimeout]
  );

  // Handle input changes
  useEffect(() => {
    if (query.trim().length >= 2) {
      debouncedSearch(query);
    } else {
      setResults([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
    }
  }, [query, debouncedSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelectPhone(results[selectedIndex]);
        } else if (results.length > 0) {
          handleSelectPhone(results[0]);
        }
        break;

      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle phone selection
  const handleSelectPhone = (phone: PhoneSearchDocument) => {
    if (onSelect) {
      onSelect(phone);
    } else {
      router.push(`/phones/${phone.slug}`);
    }

    setQuery(phone.name);
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format price display
  const formatPrice = (price: number) => {
    if (price === 0) return "Price not available";
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
        />

        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                className="opacity-25"
              />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                className="opacity-75"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Results Dropdown */}
      {showResults && showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {error ? (
            <div className="px-4 py-3 text-red-600 text-sm">{error}</div>
          ) : results.length > 0 ? (
            <>
              <div className="px-4 py-2 bg-gray-50 border-b text-xs text-gray-500 font-medium">
                {results.length} phone{results.length !== 1 ? "s" : ""} found
              </div>
              {results.map((phone, index) => (
                <button
                  key={phone.id}
                  onClick={() => handleSelectPhone(phone)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors
                    ${index === selectedIndex ? "bg-blue-50 border-r-2 border-blue-500" : ""}
                    ${index < results.length - 1 ? "border-b border-gray-100" : ""}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {phone.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">{phone.brand}</span>
                        <span className="mx-2">•</span>
                        <span>{phone.ramGB}GB RAM</span>
                        {phone.fiveG && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-green-600 font-medium">
                              5G
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {formatPrice(phone.pricePKR)}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : query.trim().length >= 2 && !isLoading ? (
            <div className="px-4 py-8 text-center text-gray-500">
              <svg
                className="mx-auto h-8 w-8 text-gray-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-sm">
                No phones found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs mt-1">
                Try different keywords or check spelling
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

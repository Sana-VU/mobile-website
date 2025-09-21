"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Phone, BookOpen, Building2, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SearchParams {
  q?: string;
  type?: "phones" | "brands" | "articles" | "all";
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
}

interface UniversalSearchProps {
  initialParams: SearchParams;
}

export default function UniversalSearch({
  initialParams,
}: UniversalSearchProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialParams.q || "");
  const [searchType, setSearchType] = useState<string>(
    initialParams.type || "all"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: initialParams.category || "",
    brand: initialParams.brand || "",
    minPrice: initialParams.minPrice || "",
    maxPrice: initialParams.maxPrice || "",
  });

  const searchSuggestions = useMemo(() => {
    const suggestions = [
      "iPhone 15 Pro",
      "Samsung Galaxy S24",
      "Google Pixel 8",
      "OnePlus 12",
      "Xiaomi 14",
      "Huawei P60",
      "Nothing Phone 2",
      "Sony Xperia 1 V",
    ];

    if (!searchQuery) return suggestions;

    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams();
    params.set("q", searchQuery.trim());

    if (searchType !== "all") {
      params.set("type", searchType);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Route based on search type
    switch (searchType) {
      case "phones":
        router.push(
          `/phones?search=${encodeURIComponent(searchQuery.trim())}&${params.toString()}`
        );
        break;
      case "brands":
        router.push(`/brands?search=${encodeURIComponent(searchQuery.trim())}`);
        break;
      case "articles":
        router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
        break;
      default:
        // For 'all' type, stay on search page with results
        router.push(`/search?${params.toString()}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search phones, reviews, articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-12 pr-32 h-14 text-lg bg-card border-2 border-border focus:border-primary focus:ring-primary"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            <Button onClick={handleSearch} className="px-6">
              Search
            </Button>
          </div>
        </div>

        {/* Search Suggestions */}
        {searchQuery && searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-lg shadow-lg">
            {searchSuggestions.slice(0, 5).map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 first:rounded-t-lg last:rounded-b-lg"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-neutral-400" />
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Type Tabs */}
      <Tabs value={searchType} onValueChange={setSearchType} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="phones" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phones
          </TabsTrigger>
          <TabsTrigger value="brands" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Brands
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Articles
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Advanced Filters</h3>
            <div className="flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {searchType === "phones" && (
              <>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    <option value="flagship">Flagship</option>
                    <option value="mid-range">Mid-range</option>
                    <option value="budget">Budget</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Brand
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, brand: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select brand</option>
                    <option value="apple">Apple</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="oneplus">OnePlus</option>
                    <option value="xiaomi">Xiaomi</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Min Price (PKR)
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Max Price (PKR)
                  </label>
                  <Input
                    type="number"
                    placeholder="500000"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxPrice: e.target.value,
                      }))
                    }
                  />
                </div>
              </>
            )}

            {searchType === "articles" && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">
                  Article Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="reviews">Reviews</option>
                  <option value="news">News</option>
                  <option value="guides">Guides</option>
                  <option value="comparisons">Comparisons</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Instructions/Empty State */}
      {!initialParams.q && (
        <div className="text-center py-12">
          <div className="max-w-2xl mx-auto">
            <Search className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Find What You&apos;re Looking For
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Search across our database of phones, brands, reviews, and
              articles. Use filters to narrow down your results and find exactly
              what you need.
            </p>

            {/* Popular Searches */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                Popular Searches
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "iPhone 15 Pro Max",
                  "Samsung Galaxy S24 Ultra",
                  "Best budget phones 2024",
                  "Phone comparison",
                  "Latest phone reviews",
                ].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch();
                    }}
                    className="text-sm"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/phones")}
        >
          <CardHeader>
            <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle>Browse Phones</CardTitle>
            <CardDescription>
              Explore our comprehensive database of smartphones with detailed
              specs and reviews
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/compare")}
        >
          <CardHeader>
            <Filter className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <CardTitle>Compare Phones</CardTitle>
            <CardDescription>
              Side-by-side comparison of specifications, features, and prices
            </CardDescription>
          </CardHeader>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => router.push("/blog")}
        >
          <CardHeader>
            <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
            <CardTitle>Read Articles</CardTitle>
            <CardDescription>
              Latest news, reviews, and buying guides from mobile experts
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

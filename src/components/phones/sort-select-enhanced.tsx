"use client";

import { useRouter } from "next/navigation";
import { Select, SelectItem } from "@/components/ui/select";
import { createFilterUrl, type PhoneFilters } from "@/lib/url-state";

interface SortSelectProps {
  currentSort: string;
  currentFilters: PhoneFilters;
  className?: string;
}

export function SortSelect({
  currentSort,
  currentFilters,
  className,
}: SortSelectProps) {
  const router = useRouter();

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "ram", label: "RAM: High to Low" },
    { value: "battery", label: "Battery: High to Low" },
    { value: "camera", label: "Camera: High to Low" },
  ];

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value;

    // Reset to page 1 when sort changes, preserve all other filters
    const url = createFilterUrl(currentFilters, {
      sort: newSort as
        | "relevance"
        | "newest"
        | "price-asc"
        | "price-desc"
        | "ram"
        | "battery"
        | "camera",
      page: 1,
    });
    router.push(url);
  };

  return (
    <div className={className}>
      <label htmlFor="sort-select" className="sr-only">
        Sort phones by
      </label>
      <Select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="w-[200px] bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        aria-label="Sort phones by"
      >
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

"use client";

import { SearchBar } from "./SearchBar";
import { PhoneSearchDocument } from "@/lib/search-index";

interface CompactSearchBarProps {
  className?: string;
  onPhoneSelect?: (phone: PhoneSearchDocument) => void;
}

export function CompactSearchBar({
  className = "",
  onPhoneSelect,
}: CompactSearchBarProps) {
  return (
    <SearchBar
      placeholder="Search phones..."
      className={`max-w-md ${className}`}
      onSelect={onPhoneSelect}
    />
  );
}

export function HeaderSearchBar({ className = "" }: { className?: string }) {
  return (
    <SearchBar
      placeholder="Search phones..."
      className={`w-full max-w-sm ${className}`}
      showResults={true}
    />
  );
}

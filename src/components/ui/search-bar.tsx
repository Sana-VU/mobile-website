"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  className?: string;
  showButton?: boolean;
  onSubmit?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Search phones, brands or blogs",
  initialValue = "",
  className,
  showButton = false,
  onSubmit,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (onSubmit) {
      onSubmit(trimmed);
    } else {
      router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "group relative flex w-full items-center gap-2 rounded-2xl border border-border/70 bg-surface/80 px-3 py-2 shadow-sm backdrop-blur transition-all duration-soft ease-soft-spring focus-within:border-primary focus-within:shadow-soft",
        className
      )}
      role="search"
    >
      <SearchIcon
        aria-hidden
        className="h-5 w-5 flex-none text-muted-foreground transition-colors group-focus-within:text-primary"
      />
      <input
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {showButton && (
        <Button size="sm" type="submit">
          Search
        </Button>
      )}
    </form>
  );
}
# useQueryState Hook Usage Examples

## Overview

The `useQueryState` hook provides a clean interface for managing URL search parameters with debouncing, making it perfect for filter interfaces that need SSR compatibility.

## Basic Usage

```tsx
"use client";

import { useQueryState } from "@/hooks/use-query-state";

export function FilterComponent() {
  const { setParam, toggleArrayParam, clearAll } = useQueryState({
    debounceMs: 300,
    replace: true, // Use replace to avoid polluting browser history
  });

  return (
    <div>
      {/* Single parameter */}
      <input
        onChange={(e) => setParam("search", e.target.value)}
        placeholder="Search..."
      />

      {/* Boolean parameter */}
      <input
        type="checkbox"
        onChange={(e) => setParam("fiveG", e.target.checked)}
      />

      {/* Array parameter (multi-select) */}
      <button onClick={() => toggleArrayParam("brand", "apple")}>
        Toggle Apple
      </button>

      {/* Clear all filters */}
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
}
```

## Advanced Usage

```tsx
const { setParams, removeParam, getCurrentParams } = useQueryState();

// Set multiple parameters at once
const handleSubmit = () => {
  setParams({
    page: 1,
    sort: "price-asc",
    minPrice: 50000,
    maxPrice: 200000,
  });
};

// Remove specific parameter
const clearSearch = () => {
  removeParam("search");
};

// Get current parameters (non-reactive)
const currentParams = getCurrentParams();
console.log(currentParams.get("brand")); // Get single value
console.log(currentParams.getAll("brand")); // Get array values
```

## Key Features

✅ **Debounced Updates**: Prevents excessive URL changes during rapid typing  
✅ **SSR Compatible**: State lives in URL, no hydration mismatches  
✅ **Type Safe**: Full TypeScript support with proper type inference  
✅ **Array Support**: Handle multi-select filters elegantly  
✅ **History Management**: Choose between `push` and `replace` navigation

## Parameter Types Supported

- **String**: `setParam('search', 'iphone')`
- **Number**: `setParam('price', 50000)`
- **Boolean**: `setParam('fiveG', true)`
- **Array**: `setParam('brands', ['apple', 'samsung'])`
- **Null/Undefined**: `setParam('search', null)` (removes parameter)

## Integration with Server Components

The hook works seamlessly with Next.js server components:

```tsx
// page.tsx (Server Component)
interface PageProps {
  searchParams: Promise<{
    search?: string;
    brand?: string[];
    fiveG?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const data = await fetchData(params); // Server-side data fetching

  return (
    <div>
      <FilterComponent /> {/* Client component with useQueryState */}
      <ResultsComponent data={data} /> {/* Server component */}
    </div>
  );
}
```

This creates a perfect SSR/CSR mix where:

- **Client**: Manages filter UI interactions
- **Server**: Handles data fetching based on URL parameters
- **URL**: Single source of truth for application state

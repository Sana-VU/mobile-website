import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Phones - WhatMobile",
  description: "Search for mobile phones by name, brand, or specifications",
};

export default function SearchPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      {/* Search form */}
      <div className="relative mb-6">
        <input
          type="search"
          placeholder="Search for phones, brands, or specs..."
          className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search results will appear here */}
      <div className="text-center text-muted-foreground py-8">
        Enter a search term to find phones
      </div>
    </div>
  );
}

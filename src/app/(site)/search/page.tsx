import { Metadata } from "next";
import UniversalSearch from "@/components/search/UniversalSearch";

export const metadata: Metadata = {
  title: "Search - WhatMobile | Find Phones, Reviews & Articles",
  description:
    "Search for mobile phones, reviews, and articles on WhatMobile. Find the perfect smartphone with advanced search filters.",
  keywords: [
    "phone search",
    "mobile search",
    "smartphone finder",
    "phone comparison",
    "mobile reviews",
    "phone specs search",
  ],
  openGraph: {
    title: "Universal Search - WhatMobile",
    description:
      "Find phones, reviews, and articles with our comprehensive search",
    type: "website",
    url: "https://whatmobile.com.pk/search",
  },
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    type?: "phones" | "brands" | "articles" | "all";
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Universal Search
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Find phones, reviews, articles, and more with our comprehensive
            search
          </p>
        </div>

        {/* Universal Search Component */}
        <UniversalSearch initialParams={params} />
      </div>
    </div>
  );
}

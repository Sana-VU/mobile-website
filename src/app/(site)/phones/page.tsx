import { Metadata } from "next";
import { Suspense } from "react";
import { PhoneFiltersSection } from "@/components/phones/phone-filters-section-enhanced";
import { PhoneResults } from "@/components/phones/phone-results";
import { FiltersLoading } from "@/components/phones/filters-loading";
import { PhoneResultsLoading } from "@/components/phones/phone-results-loading";
import { parseSearchParams } from "@/lib/url-state";

export const metadata: Metadata = {
  title: "Phone Finder - Find Your Perfect Mobile | WhatMobile",
  description:
    "Discover and compare mobile phones with advanced filters. Find the perfect smartphone with our comprehensive search and filtering system.",
  keywords:
    "mobile phones, smartphones, phone comparison, phone finder, mobile specs",
  openGraph: {
    title: "Phone Finder - Find Your Perfect Mobile",
    description: "Discover and compare mobile phones with advanced filters",
    type: "website",
  },
};

export const revalidate = 300;

interface PhonesPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PhonesPage({ searchParams }: PhonesPageProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 lg:px-6 py-6">
        {/* Mobile/Tablet: Stacked Layout */}
        <div className="lg:hidden space-y-6">
          <Suspense fallback={<FiltersLoading />}>
            <PhoneFiltersSection filters={filters} />
          </Suspense>
          <Suspense fallback={<PhoneResultsLoading />}>
            <PhoneResults filters={filters} />
          </Suspense>
        </div>

        {/* Desktop: Sticky Sidebar Layout */}
        <div className="hidden lg:flex gap-8">
          {/* Sticky Sidebar Filters */}
          <aside className="w-80 flex-shrink-0">
            <div className="sticky top-6">
              <Suspense fallback={<FiltersLoading />}>
                <PhoneFiltersSection filters={filters} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Suspense fallback={<PhoneResultsLoading />}>
              <PhoneResults filters={filters} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}

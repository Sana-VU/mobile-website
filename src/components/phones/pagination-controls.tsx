"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePageNumbers, createPageUrl } from "@/lib/pagination";
import type { PaginationMeta } from "@/lib/pagination";

interface PaginationControlsProps {
  pagination: PaginationMeta;
  searchParams: Record<string, string | undefined>;
  basePath: string;
}

export function PaginationControls({
  pagination,
  searchParams,
  basePath,
}: PaginationControlsProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const urlSearchParams = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && key !== "page") {
      urlSearchParams.set(key, value);
    }
  });

  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center space-x-1"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      {hasPrevPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={createPageUrl(basePath, urlSearchParams, currentPage - 1)}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Previous</span>
        </Button>
      )}

      {/* Page Numbers */}
      <div className="flex space-x-1">
        {pageNumbers.map((pageNum, index) =>
          pageNum === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-sm text-neutral-500"
            >
              ...
            </span>
          ) : (
            <Button
              key={pageNum}
              variant={pageNum === currentPage ? "default" : "outline"}
              size="sm"
              asChild={pageNum !== currentPage}
              disabled={pageNum === currentPage}
            >
              {pageNum === currentPage ? (
                <span aria-current="page">{pageNum}</span>
              ) : (
                <Link
                  href={createPageUrl(
                    basePath,
                    urlSearchParams,
                    pageNum as number
                  )}
                  aria-label={`Go to page ${pageNum}`}
                >
                  {pageNum}
                </Link>
              )}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      {hasNextPage ? (
        <Button variant="outline" size="sm" asChild>
          <Link
            href={createPageUrl(basePath, urlSearchParams, currentPage + 1)}
            aria-label="Go to next page"
          >
            <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <span className="sr-only sm:not-sr-only sm:mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </nav>
  );
}

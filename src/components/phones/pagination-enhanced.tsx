"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { createFilterUrl, type PhoneFilters } from "@/lib/url-state";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationEnhancedProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  filters: PhoneFilters;
  className?: string;
}

export function PaginationEnhanced({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  filters,
  className,
}: PaginationEnhancedProps) {
  if (totalPages <= 1) return null;

  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  // Generate page numbers to show
  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Show 1, 2, 3, 4, 5 ... last
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show 1 ... last-4, last-3, last-2, last-1, last
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show 1 ... current-1, current, current+1 ... last
        pages.push("ellipsis");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4",
        className
      )}
      aria-label="Pagination navigation"
      role="navigation"
    >
      {/* Results info */}
      <div className="text-sm text-gray-600 dark:text-gray-400 order-2 sm:order-1">
        Showing {startItem.toLocaleString()} to {endItem.toLocaleString()} of{" "}
        {totalCount.toLocaleString()} results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={createFilterUrl(filters, { page: currentPage - 1 })}
              className="flex items-center gap-1"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        )}

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-1 text-gray-500"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const isCurrentPage = page === currentPage;

            return (
              <Button
                key={page}
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                asChild={!isCurrentPage}
                disabled={isCurrentPage}
                className={cn(
                  "min-w-[2.5rem]",
                  isCurrentPage && "pointer-events-none"
                )}
                aria-label={
                  isCurrentPage ? `Current page ${page}` : `Go to page ${page}`
                }
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {isCurrentPage ? (
                  <span>{page}</span>
                ) : (
                  <Link href={createFilterUrl(filters, { page })}>{page}</Link>
                )}
              </Button>
            );
          })}
        </div>

        {/* Next button */}
        {currentPage < totalPages ? (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={createFilterUrl(filters, { page: currentPage + 1 })}
              className="flex items-center gap-1"
              aria-label="Go to next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Page jump for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { PhoneFilters } from "@/lib/url-state";
import { createFilterUrl } from "@/lib/url-state";
import { parseSearchParams } from "@/lib/url-state";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  className,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse current filters from URL
  const currentFilters = parseSearchParams(Object.fromEntries(searchParams));

  const createPageUrl = (page: number) => {
    return createFilterUrl(currentFilters, { page });
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 4) {
        // Near beginning
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near end
        pages.push("ellipsis");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In middle
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    const url = createPageUrl(page);
    router.push(url);
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn(
        "flex items-center justify-center space-x-2 mt-8",
        className
      )}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <div
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-9 h-9"
            >
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
              <span className="sr-only">More pages</span>
            </div>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-9 w-9 p-0",
                currentPage === page && "pointer-events-none"
              )}
              onClick={() => handlePageChange(page)}
              aria-label={
                currentPage === page
                  ? `Current page, page ${page}`
                  : `Go to page ${page}`
              }
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </nav>
  );
}

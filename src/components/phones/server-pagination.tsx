import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[]>;
  baseUrl?: string;
}

export function ServerPagination({
  currentPage,
  totalPages,
  searchParams,
  baseUrl = "/phones",
}: ServerPaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    // Add all existing search params except 'page'
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page") {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value) {
          params.set(key, value);
        }
      }
    });

    // Add page param only if not page 1
    if (page !== 1) {
      params.set("page", page.toString());
    }

    const search = params.toString();
    return search ? `${baseUrl}?${search}` : baseUrl;
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

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center space-x-2"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        asChild={currentPage > 1}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)} prefetch={false}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </>
        )}
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <div
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-9 h-9"
            >
              <MoreHorizontal
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
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
              asChild={currentPage !== page}
              aria-label={
                currentPage === page
                  ? `Current page, page ${page}`
                  : `Go to page ${page}`
              }
              aria-current={currentPage === page ? "page" : undefined}
            >
              {currentPage !== page ? (
                <Link href={createPageUrl(page)} prefetch={false}>
                  {page}
                </Link>
              ) : (
                <span>{page}</span>
              )}
            </Button>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-3"
        asChild={currentPage < totalPages}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)} prefetch={false}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </nav>
  );
}

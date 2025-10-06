import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: URLSearchParams;
}

export function Pagination({ currentPage, totalPages, basePath, query = new URLSearchParams() }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createHref = (page: number) => {
    const params = new URLSearchParams(query.toString());
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;
        return (
          <Link
            key={page}
            href={createHref(page)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
              isActive
                ? "border-transparent bg-slate-900 text-white shadow-soft dark:bg-white dark:text-slate-900"
                : "border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}

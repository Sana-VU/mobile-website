import Link from "next/link";
import { JobSearchBar } from "@/components/job/JobSearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-slate-900 dark:text-white">
          PakJobs
        </Link>
        <div className="hidden flex-1 md:block">
          <JobSearchBar placeholder="Search by title, keyword or city" />
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/jobs"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            Browse Jobs
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

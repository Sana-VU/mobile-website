import { Suspense } from "react";
import { JobCard } from "@/components/job/JobCard";
import { JobFilters } from "@/components/job/JobFilters";
import { fetchJobs } from "@/lib/jobs";
import { Pagination } from "@/components/ui/pagination";

interface JobsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const dynamic = "force-dynamic";

function parseArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const page = Number(searchParams.page ?? "1") || 1;
  const limit = Number(searchParams.limit ?? "12") || 12;
  const sourceParam =
    typeof searchParams["source.name"] === "string"
      ? (searchParams["source.name"] as string)
      : typeof searchParams.source === "string"
        ? (searchParams.source as string)
        : undefined;

  const result = await fetchJobs({
    q: typeof searchParams.q === "string" ? searchParams.q : undefined,
    type: typeof searchParams.type === "string" ? searchParams.type : undefined,
    category: parseArray(searchParams.category),
    remoteOnly: searchParams.remoteOnly === "true",
    postedWithin: searchParams.postedWithin ? Number(searchParams.postedWithin) : undefined,
    sourceName: sourceParam,
    page,
    limit,
    sort: searchParams.sort === "featured" ? "featured" : "newest"
  });

  const query = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value) {
      query.set(key, value);
    }
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <JobFilters />
      </div>
      <div className="space-y-6">
        <header className="space-y-2">
          <h1 className="font-heading text-3xl">Jobs in Pakistan</h1>
          <p className="text-sm text-slate-500">{result.total} results found.</p>
        </header>
        <Suspense fallback={<p>Loading jobs...</p>}>
          <div className="grid gap-6 md:grid-cols-2">
            {result.jobs.map((job) => (
              <JobCard key={job._id.toString()} job={job as any} />
            ))}
          </div>
        </Suspense>
        {result.jobs.length === 0 && <p className="text-sm text-slate-500">No jobs match your filters.</p>}
        <Pagination currentPage={result.page} totalPages={result.totalPages} basePath="/jobs" query={query} />
      </div>
    </div>
  );
}

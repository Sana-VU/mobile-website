import type { JobDocument } from "@/models/Job";
import Link from "next/link";
import { format } from "date-fns";

export function SourceAttribution({ job }: { job: JobDocument }) {
  return (
    <aside className="rounded-2xl border border-slate-200/60 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/70 dark:text-slate-300">
      <p className="font-semibold text-slate-800 dark:text-white">Source</p>
      <p className="mt-1">
        {job.source?.url ? (
          <Link href={job.source.url} target="_blank" rel="noopener noreferrer" className="text-brand-start hover:underline">
            {job.source.name}
          </Link>
        ) : (
          job.source?.name
        )}
      </p>
      {job.source?.publishedOn && (
        <p className="mt-1 text-xs text-slate-500">
          Published on {format(job.source.publishedOn, "dd MMM yyyy")}
        </p>
      )}
    </aside>
  );
}

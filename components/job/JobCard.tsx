import Link from "next/link";
import type { JobDocument } from "@/models/Job";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: JobDocument;
}

function excerpt(markdown: string, length = 180) {
  const clean = markdown?.replace(/[#*_`>\-]/g, "") ?? "";
  return clean.slice(0, length).concat(clean.length > length ? "…" : "");
}

export function JobCard({ job }: JobCardProps) {
  const postedAgo = job.postedAt ? formatDistanceToNow(job.postedAt, { addSuffix: true }) : "Recently posted";
  const companyName = typeof job.company === "object" && "name" in job.company ? job.company.name : "Unknown";

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <Link href={`/jobs/${job.slug}`} className="font-heading text-lg text-slate-900 dark:text-white">
            {job.title}
          </Link>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{companyName}</p>
        </div>
        {job.featured && <Badge variant="success">Featured</Badge>}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-300">{excerpt(job.description)}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex flex-wrap gap-2">
          {job.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <span>{postedAgo}</span>
      </div>
    </Card>
  );
}

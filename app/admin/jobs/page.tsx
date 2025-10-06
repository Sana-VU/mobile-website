import Link from "next/link";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { Table, THead, TBody, TRow, THeaderCell, TCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  await connectDB();
  const jobs = await Job.find().sort({ createdAt: -1 }).populate("company").lean();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl">Jobs</h1>
          <p className="text-sm text-slate-500">Manage drafts, published, and archived listings.</p>
        </div>
        <Button asChild>
          <Link href="/admin/jobs/new">Add job</Link>
        </Button>
      </header>
      <Table>
        <THead>
          <TRow>
            <THeaderCell>Title</THeaderCell>
            <THeaderCell>Status</THeaderCell>
            <THeaderCell>Company</THeaderCell>
            <THeaderCell>Posted</THeaderCell>
            <THeaderCell>Actions</THeaderCell>
          </TRow>
        </THead>
        <TBody>
          {jobs.map((job) => (
            <TRow key={job._id.toString()}>
              <TCell>{job.title}</TCell>
              <TCell className="capitalize">{job.status}</TCell>
              <TCell>{typeof job.company === "object" && job.company ? (job.company as any).name : ""}</TCell>
              <TCell>{job.postedAt ? new Date(job.postedAt).toLocaleDateString() : ""}</TCell>
              <TCell>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/jobs/${job._id.toString()}`}>Edit</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/jobs/${job.slug}`}>View</Link>
                  </Button>
                </div>
              </TCell>
            </TRow>
          ))}
        </TBody>
      </Table>
      {jobs.length === 0 && <p className="text-sm text-slate-500">No jobs created yet.</p>}
    </div>
  );
}

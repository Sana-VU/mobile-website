import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { KpiCards } from "@/components/admin/KpiCards";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await connectDB();
  const [total, published, featured, expiringSoon] = await Promise.all([
    Job.countDocuments(),
    Job.countDocuments({ status: "published" }),
    Job.countDocuments({ featured: true, status: "published" }),
    Job.countDocuments({ status: "published", expiresAt: { $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } })
  ]);

  const metrics = [
    { title: "Total jobs", value: total },
    { title: "Published", value: published },
    { title: "Featured", value: featured },
    { title: "Expiring (7d)", value: expiringSoon }
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl">Dashboard</h1>
          <p className="text-sm text-slate-500">Manage jobs and companies from one place.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/jobs/new">Add job</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/import">Import CSV</Link>
          </Button>
        </div>
      </header>
      <KpiCards metrics={metrics} />
    </div>
  );
}

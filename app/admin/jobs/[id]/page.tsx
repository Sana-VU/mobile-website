import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import Company from "@/models/Company";
import { JobForm } from "@/components/admin/JobForm";

interface EditJobPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: EditJobPageProps) {
  await connectDB();
  const job = await Job.findById(params.id).lean();
  if (!job) {
    notFound();
  }
  const companies = await Company.find().select("name").lean();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Edit job</h1>
      <JobForm
        endpoint={`/api/jobs/${params.id}`}
        method="PATCH"
        companies={companies.map((company) => ({ _id: company._id.toString(), name: company.name }))}
        defaultValues={{
          title: job.title,
          slug: job.slug,
          company: job.company?.toString?.() ?? job.company,
          type: job.type,
          status: job.status,
          categories: job.categories,
          description: job.description,
          tags: job.tags,
          featured: job.featured,
          postedAt: job.postedAt,
          expiresAt: job.expiresAt,
          source: job.source,
          applyUrl: job.applyUrl,
          applyEmail: job.applyEmail,
          location: job.location
        }}
      />
    </div>
  );
}

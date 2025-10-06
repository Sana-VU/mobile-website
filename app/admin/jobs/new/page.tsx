import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import { JobForm } from "@/components/admin/JobForm";

export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  await connectDB();
  const companies = await Company.find().select("name").lean();

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Create job</h1>
      <JobForm
        endpoint="/api/jobs"
        companies={companies.map((company) => ({ _id: company._id.toString(), name: company.name }))}
      />
    </div>
  );
}

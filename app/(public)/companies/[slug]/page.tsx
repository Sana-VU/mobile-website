import { notFound } from "next/navigation";
import { fetchCompanyBySlug, fetchJobsByCompany } from "@/lib/jobs";
import { JobCard } from "@/components/job/JobCard";

interface CompanyDetailPageProps {
  params: { slug: string };
}

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const company = await fetchCompanyBySlug(params.slug);
  if (!company) {
    notFound();
  }
  const jobs = await fetchJobsByCompany(company._id.toString());

  return (
    <div className="space-y-8">
      <header className="space-y-3 rounded-2xl border border-slate-200/60 bg-white/80 p-8 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60">
        <p className="text-sm text-slate-500">Company</p>
        <h1 className="font-heading text-4xl">{company.name}</h1>
        {company.about && <p className="text-sm text-slate-500">{company.about}</p>}
        {company.website && (
          <a href={company.website} className="text-sm text-brand-start hover:underline" target="_blank" rel="noopener noreferrer">
            {company.website}
          </a>
        )}
      </header>
      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Open roles</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job._id.toString()} job={job as any} />
          ))}
          {jobs.length === 0 && <p className="text-sm text-slate-500">No active jobs at the moment.</p>}
        </div>
      </section>
    </div>
  );
}

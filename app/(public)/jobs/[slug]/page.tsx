import { notFound } from "next/navigation";
import { fetchJobBySlug, fetchJobs } from "@/lib/jobs";
import { SourceAttribution } from "@/components/job/SourceAttribution";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { jobPostingSchema } from "@/lib/seo";

interface JobDetailPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const jobs = await fetchJobs({ limit: 20 });
  return jobs.jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) return {};
  return {
    title: job.seo?.title ?? `${job.title} at ${typeof job.company === "object" && job.company?.name ? job.company.name : "Company"}`,
    description: job.seo?.description ?? job.description?.slice(0, 140)
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await fetchJobBySlug(params.slug);
  if (!job) {
    notFound();
  }

  const company = typeof job.company === "object" && job.company ? job.company : undefined;
  const descriptionParagraphs = job.description.split(/\n\n+/);

  return (
    <article className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-8">
        <header className="space-y-3">
          <p className="text-sm text-slate-500">{company?.name}</p>
          <h1 className="font-heading text-4xl">{job.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
            {job.location.city && <span>{job.location.city}</span>}
            {job.location.region && <span>{job.location.region}</span>}
            <span>{job.location.remote ? "Remote friendly" : "On-site"}</span>
          </div>
          <div className="flex gap-3">
            {job.applyUrl && (
              <Button asChild>
                <Link href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Online
                </Link>
              </Button>
            )}
            {job.applyEmail && (
              <Button asChild variant="outline">
                <Link href={`mailto:${job.applyEmail}`}>Email Application</Link>
              </Button>
            )}
          </div>
        </header>
        <section className="prose prose-slate max-w-none dark:prose-invert">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3>Requirements</h3>
              <ul>
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3>Benefits</h3>
              <ul>
                {job.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <section>
          <h2 className="font-heading text-2xl">Related jobs</h2>
          <p className="text-sm text-slate-500">More opportunities from this company or category will appear here.</p>
        </section>
      </div>
      <div className="space-y-6">
        <SourceAttribution job={job as any} />
        {company && (
          <aside className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 dark:border-slate-800/60 dark:bg-slate-900/60">
            <p className="text-sm text-slate-500">Company</p>
            <h3 className="font-heading text-xl">{company.name}</h3>
            {company.website && (
              <Link href={company.website} className="text-sm text-brand-start hover:underline" target="_blank" rel="noopener noreferrer">
                {company.website}
              </Link>
            )}
          </aside>
        )}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job as any)) }}
        />
      </div>
    </article>
  );
}

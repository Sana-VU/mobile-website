import Link from "next/link";
import { fetchFeaturedJobs, fetchRecentByCategory } from "@/lib/jobs";
import { JobCard } from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/HeroSection";

export default async function HomePage() {
  const [featuredJobs, recentSections] = await Promise.all([fetchFeaturedJobs(), fetchRecentByCategory()]);

  return (
    <div className="space-y-16">
      <HeroSection>
        <div className="max-w-2xl space-y-4">
          <h1 className="font-heading text-4xl sm:text-5xl">Verified jobs from Pakistan&apos;s trusted sources</h1>
          <p className="text-lg text-white/90">
            Daily curation from leading newspapers and official portals. Search smarter with PakJobs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="gradient" className="bg-white text-slate-900">
              <Link href="/jobs">Browse openings</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10">
              <Link href="/companies">Explore companies</Link>
            </Button>
          </div>
        </div>
      </HeroSection>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl">Featured this week</h2>
          <Link href="/jobs" className="text-sm text-brand-start hover:underline">
            View all jobs
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredJobs.map((job) => (
            <JobCard key={job._id.toString()} job={job as any} />
          ))}
          {featuredJobs.length === 0 && <p className="text-sm text-slate-500">No featured jobs yet.</p>}
        </div>
      </section>

      {recentSections.map((section) => (
        <section key={section.category} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl">Recent in {section.category}</h3>
            <Link
              href={`/jobs?category=${encodeURIComponent(section.category)}`}
              className="text-sm text-brand-start hover:underline"
            >
              See more
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {section.jobs.map((job) => (
              <JobCard key={job._id.toString()} job={job as any} />
            ))}
            {section.jobs.length === 0 && <p className="text-sm text-slate-500">No jobs in this category.</p>}
          </div>
        </section>
      ))}
    </div>
  );
}

import Link from "next/link";
import { fetchCompanies } from "@/lib/jobs";
import { Card } from "@/components/ui/card";

export default async function CompaniesPage() {
  const companies = await fetchCompanies();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl">Companies</h1>
        <p className="text-sm text-slate-500">Verified employers with active opportunities.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Card key={company._id.toString()} className="space-y-3">
            <div>
              <h2 className="font-heading text-xl text-slate-900 dark:text-white">{company.name}</h2>
              {company.hq && <p className="text-sm text-slate-500">{company.hq}</p>}
            </div>
            <Link href={`/companies/${company.slug}`} className="text-sm text-brand-start hover:underline">
              View profile
            </Link>
          </Card>
        ))}
        {companies.length === 0 && <p className="text-sm text-slate-500">No companies available yet.</p>}
      </div>
    </div>
  );
}

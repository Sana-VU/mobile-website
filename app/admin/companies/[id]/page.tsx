import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import { CompanyForm } from "@/components/admin/CompanyForm";

interface EditCompanyPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function EditCompanyPage({ params }: EditCompanyPageProps) {
  await connectDB();
  const company = await Company.findById(params.id).lean();
  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Edit company</h1>
      <CompanyForm
        endpoint={`/api/companies/${params.id}`}
        method="PATCH"
        defaultValues={{
          name: company.name,
          slug: company.slug,
          logoUrl: company.logoUrl,
          website: company.website,
          about: company.about,
          hq: company.hq,
          social: company.social
        }}
      />
    </div>
  );
}

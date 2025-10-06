import { CompanyForm } from "@/components/admin/CompanyForm";

export default function NewCompanyPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Add company</h1>
      <CompanyForm endpoint="/api/companies" />
    </div>
  );
}

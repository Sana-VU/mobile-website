import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import { Table, THead, TBody, TRow, THeaderCell, TCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminCompaniesPage() {
  await connectDB();
  const companies = await Company.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl">Companies</h1>
          <p className="text-sm text-slate-500">Add and edit employer profiles.</p>
        </div>
        <Button asChild>
          <Link href="/admin/companies/new">Add company</Link>
        </Button>
      </header>
      <Table>
        <THead>
          <TRow>
            <THeaderCell>Name</THeaderCell>
            <THeaderCell>Slug</THeaderCell>
            <THeaderCell>Website</THeaderCell>
            <THeaderCell>Actions</THeaderCell>
          </TRow>
        </THead>
        <TBody>
          {companies.map((company) => (
            <TRow key={company._id.toString()}>
              <TCell>{company.name}</TCell>
              <TCell>{company.slug}</TCell>
              <TCell>{company.website}</TCell>
              <TCell>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/companies/${company._id.toString()}`}>Edit</Link>
                </Button>
              </TCell>
            </TRow>
          ))}
        </TBody>
      </Table>
      {companies.length === 0 && <p className="text-sm text-slate-500">No companies yet.</p>}
    </div>
  );
}

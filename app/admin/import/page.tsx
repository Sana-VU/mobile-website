import { ImportCsvForm } from "@/components/admin/ImportCsvForm";

export default function ImportPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl">Bulk import jobs</h1>
      <ImportCsvForm endpoint="/api/import/csv" />
    </div>
  );
}

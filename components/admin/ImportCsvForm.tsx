"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const csvExample = `title,company,type,categories,location.city,location.region,location.country,remote,postedAt,expiresAt,tags,featured,source.name,source.url,source.publishedOn,applyUrl,applyEmail,description
Software Engineer,TechCorp,Full-time,IT|Engineering,Karachi,Sindh,Pakistan,false,2024-05-10,,software|react,false,Dawn,,2024-05-08,,careers@techcorp.pk,Build modern web applications.`;

interface ImportCsvFormProps {
  endpoint: string;
}

export function ImportCsvForm({ endpoint }: ImportCsvFormProps) {
  const [csv, setCsv] = useState(csvExample);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setMessage(null);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/csv" },
        credentials: "include",
        body: csv
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setMessage("Import completed. Check logs for per-row status.");
    } catch (error: any) {
      setMessage(error?.message ?? "Failed to import");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-slate-500">
        Paste CSV using the exact header order shown below. Data will be validated before inserting into MongoDB.
      </p>
      <Textarea rows={10} value={csv} onChange={(event) => setCsv(event.target.value)} />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={processing}>
          {processing ? "Importing..." : "Import CSV"}
        </Button>
        {message && <p className="text-sm text-slate-500">{message}</p>}
      </div>
    </form>
  );
}

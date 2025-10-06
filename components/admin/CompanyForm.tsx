"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companySchema, type CompanyInput } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { useState } from "react";

interface CompanyFormProps {
  endpoint: string;
  method?: "POST" | "PATCH";
  defaultValues?: Partial<CompanyInput>;
}

export function CompanyForm({ endpoint, method = "POST", defaultValues }: CompanyFormProps) {
  const form = useForm<CompanyInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      slug: "",
      about: "",
      ...defaultValues
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = form.handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...data, slug: data.slug || slugify(data.name) })
      });
      if (!response.ok) {
        console.error(await response.text());
      }
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Name</label>
          <Input
            {...form.register("name")}
            onBlur={(event) => {
              if (!form.getValues("slug")) {
                form.setValue("slug", slugify(event.target.value));
              }
            }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Slug</label>
          <Input {...form.register("slug")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Logo URL</label>
          <Input {...form.register("logoUrl")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Website</label>
          <Input {...form.register("website")} />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase text-slate-500">About</label>
        <Textarea rows={5} {...form.register("about")} />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">HQ</label>
          <Input {...form.register("hq")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">LinkedIn</label>
          <Input {...form.register("social.linkedin")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Twitter</label>
          <Input {...form.register("social.twitter")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Facebook</label>
          <Input {...form.register("social.facebook")} />
        </div>
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Company"}
      </Button>
    </form>
  );
}

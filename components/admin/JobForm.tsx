"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, type JobInput } from "@/lib/validators";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

interface JobFormProps {
  endpoint: string;
  method?: "POST" | "PATCH";
  defaultValues?: Partial<JobInput>;
  companies?: Array<{ _id: string; name: string }>;
}

export function JobForm({ endpoint, method = "POST", defaultValues, companies = [] }: JobFormProps) {
  const form = useForm<JobInput>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      slug: "",
      company: "",
      location: { remote: false },
      type: "Full-time",
      categories: [],
      description: "",
      tags: [],
      featured: false,
      status: "draft",
      postedAt: new Date(),
      source: { name: "" },
      ...defaultValues
    }
  });

  const [submitting, setSubmitting] = useState(false);
  const categoriesValue = form.watch("categories");
  const tagsValue = form.watch("tags");
  const postedAtValue = form.watch("postedAt");
  const expiresAtValue = form.watch("expiresAt");

  const handleSubmit = form.handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...data, slug: data.slug || slugify(data.title) })
      });
      if (!response.ok) {
        console.error(await response.text());
      }
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Title</label>
          <Input {...form.register("title")}
            onBlur={(e) => {
              const value = e.target.value;
              if (!form.getValues("slug")) {
                form.setValue("slug", slugify(value));
              }
            }}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Slug</label>
          <Input {...form.register("slug")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Company</label>
          {companies.length > 0 ? (
            <select
              {...form.register("company")}
              className="h-11 w-full rounded-2xl border border-slate-200/60 px-4 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value="">Select company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          ) : (
            <Input {...form.register("company")} placeholder="Company ID" />
          )}
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Type</label>
          <select
            {...form.register("type")}
            className="h-11 w-full rounded-2xl border border-slate-200/60 px-4 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {(["Full-time", "Part-time", "Contract", "Internship", "Remote"] as const).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Status</label>
          <select
            {...form.register("status")}
            className="h-11 w-full rounded-2xl border border-slate-200/60 px-4 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            {(["draft", "published", "archived"] as const).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Posted At</label>
          <Input
            type="date"
            value={postedAtValue ? new Date(postedAtValue as Date).toISOString().slice(0, 10) : ""}
            onChange={(event) => form.setValue("postedAt", event.target.value ? new Date(event.target.value) : undefined)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Expires At</label>
          <Input
            type="date"
            value={expiresAtValue ? new Date(expiresAtValue as Date).toISOString().slice(0, 10) : ""}
            onChange={(event) => form.setValue("expiresAt", event.target.value ? new Date(event.target.value) : undefined)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Categories</label>
          <Input
            placeholder="Govt, IT"
            value={categoriesValue?.join(", ") ?? ""}
            onChange={(event) =>
              form.setValue(
                "categories",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Tags</label>
          <Input
            placeholder="react, remote"
            value={tagsValue?.join(", ") ?? ""}
            onChange={(event) =>
              form.setValue(
                "tags",
                event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Apply URL</label>
          <Input {...form.register("applyUrl")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Apply Email</label>
          <Input type="email" {...form.register("applyEmail")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">City</label>
          <Input {...form.register("location.city")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Region</label>
          <Input {...form.register("location.region")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Country</label>
          <Input placeholder="Pakistan" {...form.register("location.country")} />
        </div>
        <div className="flex items-center gap-2 pt-6">
          <input type="checkbox" id="remote" {...form.register("location.remote")} className="h-4 w-4" />
          <label htmlFor="remote" className="text-sm text-slate-600 dark:text-slate-300">
            Remote friendly
          </label>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold uppercase text-slate-500">Description (Markdown)</label>
        <Textarea rows={8} {...form.register("description")} />
      </div>
      <div>
        <label className="text-xs font-semibold uppercase text-slate-500">Source Name</label>
        <Input {...form.register("source.name")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Source URL</label>
          <Input type="url" {...form.register("source.url")} />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Source Published On</label>
          <Input type="date" {...form.register("source.publishedOn", { valueAsDate: true })} />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Job"}
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </div>
    </form>
  );
}

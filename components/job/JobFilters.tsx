"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"] as const;
const categories = ["Govt", "IT", "Education", "Healthcare", "Banking"];

export function JobFilters() {
  const params = useSearchParams();
  const router = useRouter();

  const activeFilters = useMemo(() => {
    const entries: { key: string; label: string }[] = [];
    params.forEach((value, key) => {
      if (["type", "category", "remoteOnly", "postedWithin"].includes(key)) {
        entries.push({ key, label: `${key}: ${value}` });
      }
    });
    return entries;
  }, [params]);

  const updateParam = (key: string, value?: string) => {
    const query = new URLSearchParams(params.toString());
    if (!value) {
      query.delete(key);
    } else {
      query.set(key, value);
    }
    const queryString = query.toString();
    router.push(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/60">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg">Filters</h2>
          <p className="text-sm text-slate-500">Refine by type, category, and freshness.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => router.push("/jobs")}>Clear All</Button>
      </header>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job Type</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {jobTypes.map((type) => {
            const isActive = params.get("type") === type;
            return (
              <Button
                key={type}
                size="sm"
                variant={isActive ? "gradient" : "outline"}
                onClick={() => updateParam("type", isActive ? undefined : type)}
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Remote</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={params.get("remoteOnly") === "true" ? "gradient" : "outline"}
            onClick={() => updateParam("remoteOnly", params.get("remoteOnly") === "true" ? undefined : "true")}
          >
            Remote only
          </Button>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Categories</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = params.getAll("category").includes(category);
            return (
              <Button
                key={category}
                size="sm"
                variant={isActive ? "gradient" : "outline"}
                onClick={() => {
                  const current = new URLSearchParams(params.toString());
                  if (isActive) {
                    const values = current.getAll("category").filter((c) => c !== category);
                    current.delete("category");
                    values.forEach((value) => current.append("category", value));
                  } else {
                    current.append("category", category);
                  }
                  const queryString = current.toString();
                  router.push(queryString ? `/jobs?${queryString}` : "/jobs");
                }}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={`${filter.key}-${filter.label}`} variant="outline" className="gap-1">
              {filter.label}
              <button
                type="button"
                onClick={() => updateParam(filter.key)}
                className="ml-2 text-xs text-slate-400 hover:text-slate-200"
                aria-label={`Remove ${filter.label}`}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}

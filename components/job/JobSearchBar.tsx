"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

interface JobSearchBarProps {
  placeholder?: string;
}

export function JobSearchBar({ placeholder = "Search jobs" }: JobSearchBarProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [keyword, setKeyword] = useState(() => params.get("q") ?? "");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams(Array.from(params.entries()));
    if (keyword) {
      query.set("q", keyword);
    } else {
      query.delete("q");
    }
    const queryString = query.toString();
    router.push(queryString ? `/jobs?${queryString}` : "/jobs");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full items-center gap-2 rounded-full border border-slate-200/60 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-brand-start dark:border-slate-700/60 dark:bg-slate-900"
    >
      <Search className="h-5 w-5 text-slate-500" aria-hidden />
      <input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder={placeholder}
        aria-label="Search jobs"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
      >
        Search
      </button>
    </form>
  );
}

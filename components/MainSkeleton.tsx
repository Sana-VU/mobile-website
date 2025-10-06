export function MainSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-3/4 animate-pulse rounded-2xl bg-slate-200/60 dark:bg-slate-800/80" />
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="h-40 animate-pulse rounded-2xl bg-slate-200/50 shadow-soft dark:bg-slate-800/60"
          />
        ))}
      </div>
    </div>
  );
}

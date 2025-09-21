import { Skeleton } from "@/components/ui/skeleton";

export function PhoneResultsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Controls Skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-48" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <Skeleton className="aspect-square w-full" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-8 rounded" />
                <Skeleton className="h-5 w-12 rounded" />
              </div>
              <div className="pt-3 border-t border-gray-100">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-16 mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center space-x-2 mt-12">
        <Skeleton className="h-9 w-20" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-9" />
        ))}
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function FiltersLoading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>

      {/* Brand Filter Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-5 w-12 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-6 rounded" />
            </div>
          ))}
        </div>
        <Skeleton className="h-8 w-full mt-3" />
      </div>

      {/* Price Filter Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-5 w-20 mb-4" />
        <div className="px-2 mb-4">
          <Skeleton className="h-2 w-full mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-full" />
      </div>

      {/* Specs Filter Skeleton */}
      <div className="space-y-8">
        {["RAM", "Storage", "Display Size", "Features"].map(
          (section, index) => (
            <div key={section}>
              <Skeleton className="h-5 w-16 mb-3" />
              {index < 2 ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              ) : index === 2 ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-9" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-9" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

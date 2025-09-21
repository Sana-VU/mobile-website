import { Skeleton } from "@/components/ui/skeleton";

interface PhonesGridSkeletonProps {
  viewMode?: "grid" | "list";
  count?: number;
}

export function PhonesGridSkeleton({
  viewMode = "grid",
  count = 20,
}: PhonesGridSkeletonProps) {
  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <PhoneCardSkeleton key={i} viewMode={viewMode} />
      ))}
    </div>
  );
}

function PhoneCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={`border rounded-lg p-4 space-y-4 ${
        viewMode === "list" ? "sm:flex sm:space-y-0 sm:space-x-4" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`${viewMode === "list" ? "sm:flex-shrink-0 sm:w-48" : ""}`}
      >
        <Skeleton className="h-48 w-full" />
      </div>

      <div className="flex-1 space-y-4">
        {/* Title and Brand */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        {/* Specs */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Price and Action */}
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

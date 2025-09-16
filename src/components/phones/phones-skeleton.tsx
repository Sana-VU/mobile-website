import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PhonesSkeleton() {
  // Display shimmer placeholders while phone data loads
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {skeletonItems.map((i) => (
        <Card key={i} className="overflow-hidden">
          <CardContent className="space-y-4">
            <Skeleton className="h-40 w-full rounded-3xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-1/2 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-2 rounded-2xl bg-surface/80 p-3">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t border-border/60 pt-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-11 w-full rounded-2xl" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
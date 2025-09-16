"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Phone, Brand, VendorPrice, Vendor } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { PhoneCard } from "@/components/ui/phone-card";
import { formatPrice } from "@/lib/utils";

interface PhonesListProps {
  phones: (Phone & {
    brand: Brand;
    vendorPrices: (VendorPrice & {
      vendor: Vendor;
    })[];
  })[];
  currentPage: number;
  totalPages: number;
}

export default function PhonesList({
  phones,
  currentPage,
  totalPages,
}: PhonesListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paginationText = useMemo(
    () => `Page ${currentPage} of ${Math.max(totalPages, 1)}`,
    [currentPage, totalPages]
  );

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set("page", page.toString());
    const query = params.toString();
    router.push(query ? `${pathname ?? ""}?${query}` : (pathname ?? ""));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {phones.map((phone) => {
          const lowestPrice = phone.vendorPrices[0]?.price ?? 0;
          const vendorName = phone.vendorPrices[0]?.vendor?.name ?? "Unknown";

          return (
            <PhoneCard
              key={phone.id}
              title={phone.name}
              brand={phone.brand.name}
              href={`/phones/${phone.id}`}
              price={formatPrice(lowestPrice)}
              vendorName={vendorName}
              fiveG={phone.fiveG}
              specs={[
                { label: "RAM", value: `${phone.ramGB} GB` },
                { label: "Storage", value: `${phone.storageGB} GB` },
                { label: "Display", value: `${phone.displayInch}"` },
                { label: "Battery", value: `${phone.batteryMAh} mAh` },
              ]}
            />
          );
        })}
      </div>

      {phones.length === 0 && (
        <div className="rounded-3xl border border-dashed border-border/60 bg-surface/60 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No phones match your filters yet. Try broadening your selection.
          </p>
        </div>
      )}

      {totalPages > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border/70 bg-surface/80 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage <= 1}
              onClick={() => updatePage(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => updatePage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {paginationText}
          </span>
        </div>
      )}
    </div>
  );
}

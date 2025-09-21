"use client";

import { PhoneCard } from "@/components/ui/phone-card";

interface SimplePhone {
  id: string;
  name: string;
  slug: string;
  ramGB: number;
  storageGB: number;
  fiveG: boolean;
  batteryMAh: number;
  displayInch: number;
  brand: {
    name: string;
  };
  vendorPrices: {
    pricePKR: number;
  }[];
}

interface PhonesGridProps {
  phones: SimplePhone[];
  viewMode?: "grid" | "list";
}

export function PhonesGrid({ phones, viewMode = "grid" }: PhonesGridProps) {
  if (phones.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          No phones found matching your criteria
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-2">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {phones.map((phone) => (
        <PhoneCard
          key={phone.id}
          title={phone.name}
          brand={phone.brand.name}
          href={`/phones/${phone.slug}`}
          fiveG={phone.fiveG}
          price={
            phone.vendorPrices[0]?.pricePKR
              ? `Rs ${phone.vendorPrices[0].pricePKR.toLocaleString()}`
              : undefined
          }
          vendorName={phone.vendorPrices[0] ? "Best Price" : undefined}
          specs={[
            { label: "RAM", value: `${phone.ramGB}GB` },
            { label: "Storage", value: `${phone.storageGB}GB` },
            { label: "Display", value: `${phone.displayInch}"` },
            { label: "Battery", value: `${phone.batteryMAh}mAh` },
          ]}
        />
      ))}
    </div>
  );
}

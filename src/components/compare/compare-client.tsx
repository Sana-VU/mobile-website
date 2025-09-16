"use client";

import { PhoneWithBrand } from "@/types/models";
import { PhoneSearch } from "@/components/compare/phone-search";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CompareClientProps {
  phones: PhoneWithBrand[];
  phoneIds: number[];
}

export function CompareClient({ phones, phoneIds }: CompareClientProps) {
  const router = useRouter();

  const handleRemovePhone = (phoneId: number) => {
    const newPhoneIds = phoneIds.filter((id) => id !== phoneId);
    if (newPhoneIds.length > 0) {
      router.push(`/compare?phones=${newPhoneIds.join(",")}`);
    } else {
      router.push("/compare");
    }
  };

  const handleClearAll = () => {
    router.push("/compare");
  };

  return (
    <div className="space-y-6">
      {/* Phone search */}
      <div className="bg-card p-4 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">Add phones to compare</h2>
        <PhoneSearch existingPhoneIds={phoneIds} />
      </div>

      {/* Selected phones */}
      {phones.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Comparing {phones.length} phone{phones.length !== 1 ? "s" : ""}
            </h2>
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {phones.map((phone) => (
              <div
                key={phone.id}
                className="flex items-center gap-2 bg-muted/50 border rounded-full pl-3 pr-1 py-1"
              >
                <span>
                  {phone.brand.name} {phone.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => handleRemovePhone(phone.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <ComparisonTable phones={phones} />
        </div>
      )}
    </div>
  );
}

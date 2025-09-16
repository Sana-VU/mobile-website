"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface PhoneSearchProps {
  existingPhoneIds: number[];
  maxPhones?: number;
}

export function PhoneSearch({
  existingPhoneIds,
  maxPhones = 4,
}: PhoneSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<
    Array<{ id: number; name: string; brand: { name: string } }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // For now we'll simulate the search by filtering locally
  // In a real app this would use Meilisearch or a similar search API
  const handleSearch = async () => {
    if (!search.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      // This would be a real API call to Meilisearch in production
      // For now we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock results - in a real app these would come from Meilisearch
      const mockResults = [
        { id: 1, name: "Galaxy S24 Ultra", brand: { name: "Samsung" } },
        { id: 2, name: "iPhone 15 Pro Max", brand: { name: "Apple" } },
        { id: 3, name: "Pixel 8 Pro", brand: { name: "Google" } },
        { id: 4, name: "P60 Pro", brand: { name: "Huawei" } },
        { id: 5, name: "Find X6 Pro", brand: { name: "Oppo" } },
      ];

      const filteredResults = mockResults.filter(
        (phone) =>
          !existingPhoneIds.includes(phone.id) &&
          (phone.name.toLowerCase().includes(search.toLowerCase()) ||
            phone.brand.name.toLowerCase().includes(search.toLowerCase()))
      );

      setResults(filteredResults);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search phones");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPhone = (phoneId: number) => {
    if (existingPhoneIds.length >= maxPhones) {
      setError(`You can compare a maximum of ${maxPhones} phones`);
      return;
    }

    // Create new URL with the added phone
    const newPhoneIds = [...existingPhoneIds, phoneId];
    router.push(`/compare?phones=${newPhoneIds.join(",")}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search phones by name or brand..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent) =>
              e.key === "Enter" && handleSearch()
            }
            className="pr-8"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        <Button onClick={handleSearch} variant="default" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {results.length > 0 && (
        <div className="border rounded-md">
          <div className="py-2 px-3 border-b bg-muted/50 text-sm font-medium">
            Results
          </div>
          <div className="divide-y">
            {results.map((phone) => (
              <div
                key={phone.id}
                className="flex items-center justify-between p-3 hover:bg-muted/50"
              >
                <div>
                  <span className="font-medium">{phone.brand.name}</span>{" "}
                  <span>{phone.name}</span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddPhone(phone.id)}
                  disabled={existingPhoneIds.length >= maxPhones}
                >
                  Add to Compare
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

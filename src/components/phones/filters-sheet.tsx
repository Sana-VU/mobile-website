"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterIcon, LucideLoader2, SlidersHorizontal } from "lucide-react";
import { Brand } from "@prisma/client";

interface FiltersSheetProps {
  brands: Brand[];
  priceRange: { min: number; max: number };
  ramOptions: number[];
  selectedFilters: {
    brands: string[];
    minPrice: number;
    maxPrice: number;
    ram: number[];
    fiveG: boolean;
  };
}

export default function FiltersSheet({
  brands,
  priceRange,
  ramOptions,
  selectedFilters,
}: FiltersSheetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Local filter state managed inside the sheet
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    selectedFilters.brands
  );
  const [priceRange_, setPriceRange] = useState<[number, number]>([
    selectedFilters.minPrice,
    selectedFilters.maxPrice,
  ]);
  const [selectedRam, setSelectedRam] = useState<number[]>(selectedFilters.ram);
  const [is5G, setIs5G] = useState<boolean>(selectedFilters.fiveG);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const applyFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams();

      selectedBrands.forEach((brandId) => {
        params.append("brand", brandId);
      });

      if (priceRange_[0] > priceRange.min) {
        params.set("minPrice", priceRange_[0].toString());
      }
      if (priceRange_[1] < priceRange.max) {
        params.set("maxPrice", priceRange_[1].toString());
      }

      selectedRam.forEach((ram) => {
        params.append("ram", ram.toString());
      });

      if (is5G) {
        params.set("fiveG", "true");
      }

      if (sort) {
        params.set("sort", sort);
      }

      params.set("page", "1");

      const query = params.toString();
      router.push(query ? `${pathname ?? ""}?${query}` : (pathname ?? ""));
      setOpen(false);
    });
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceRange([priceRange.min, priceRange.max]);
    setSelectedRam([]);
    setIs5G(false);
    setSort(undefined);
  };

  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleRam = (ram: number) => {
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram]
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon size={18} /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-[92dvh] overflow-y-auto rounded-t-3xl border-border/80 bg-background/95 pb-safe-bottom md:h-auto md:max-w-lg md:rounded-3xl"
      >
        <SheetHeader className="sticky top-0 z-10 mb-4 bg-background/95 pb-3 pt-1 backdrop-blur">
          <SheetTitle className="text-lg font-semibold text-foreground">
            Refine results
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Tailor the catalog using brand, price, performance and network
            filters.
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent
            value="basics"
            className="space-y-6 border-none bg-transparent p-0 shadow-none"
          >
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Brands</h3>
                <span className="text-xs text-muted-foreground">
                  {selectedBrands.length} selected
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <label
                    className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface/70 px-3 py-2 text-sm"
                    key={brand.id}
                  >
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id.toString())}
                      onCheckedChange={() => toggleBrand(brand.id.toString())}
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">Price</h3>
                <span className="text-xs text-muted-foreground">
                  {formatPrice(priceRange_[0])} - {formatPrice(priceRange_[1])}
                </span>
              </div>
              <Slider
                defaultValue={[
                  priceRange_.at(0) || priceRange.min,
                  priceRange_.at(1) || priceRange.max,
                ]}
                min={priceRange.min}
                max={priceRange.max}
                step={1000}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
              />
            </section>
          </TabsContent>

          <TabsContent
            value="advanced"
            className="space-y-4 border-none bg-transparent p-0 shadow-none"
          >
            <Accordion type="multiple" className="space-y-3">
              <AccordionItem value="performance" className="border-none">
                <AccordionTrigger>
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <SlidersHorizontal size={16} /> Performance
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-3">
                    {ramOptions.map((ram) => (
                      <label
                        key={ram}
                        className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface/70 px-3 py-2 text-sm"
                      >
                        <Checkbox
                          id={`ram-${ram}`}
                          checked={selectedRam.includes(ram)}
                          onCheckedChange={() => toggleRam(ram)}
                        />
                        <span>{ram} GB</span>
                      </label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="network" className="border-none">
                <AccordionTrigger>
                  <span className="text-sm font-medium text-foreground">
                    Network & connectivity
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <label className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface/70 px-3 py-3 text-sm">
                    5G compatible
                    <Checkbox
                      id="5g"
                      checked={is5G}
                      onCheckedChange={(checked) => setIs5G(!!checked)}
                    />
                  </label>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="sort" className="border-none">
                <AccordionTrigger>
                  <span className="text-sm font-medium text-foreground">
                    Sort by
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <SelectTrigger className="w-full rounded-2xl border border-border/70 bg-background/70">
                      <SelectValue>Recommended</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <SheetFooter className="sticky bottom-0 mt-6 flex-col gap-3 rounded-3xl border border-border/80 bg-background/95 p-4 backdrop-blur md:flex-row md:justify-between">
          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full md:w-auto"
          >
            Reset
          </Button>
          <Button
            onClick={applyFilters}
            className="w-full md:w-auto"
            disabled={isPending}
          >
            {isPending && (
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Apply filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

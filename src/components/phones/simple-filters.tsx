"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal, Search, RotateCcw, Check } from "lucide-react";
import { useQueryState } from "@/hooks/use-query-state";

interface Brand {
  id: number;
  name: string;
  slug: string;
  _count?: {
    phones: number;
  };
}

interface SimpleFiltersProps {
  brands: Brand[];
}

const resolutionOptions = [
  { value: "720p", label: "HD (720p)" },
  { value: "1080p", label: "FHD (1080p)" },
  { value: "1440p", label: "QHD (1440p)" },
  { value: "4k", label: "4K UHD" },
];

const refreshRateOptions = ["60", "90", "120", "144", "240"];

const displayTechOptions = [
  "AMOLED",
  "OLED",
  "IPS",
  "LTPS",
  "Super AMOLED",
  "Dynamic AMOLED",
];

const chipsetVendors = [
  "Qualcomm",
  "MediaTek",
  "Apple",
  "Samsung Exynos",
  "Unisoc",
  "Google Tensor",
];

const ramOptions = [2, 3, 4, 6, 8, 12, 16, 18, 24];
const storageOptions = [16, 32, 64, 128, 256, 512, 1024];

export function SimpleFilters({ brands }: SimpleFiltersProps) {
  const searchParams = useSearchParams();
  const { setParam, toggleArrayParam, clearAll } = useQueryState({
    debounceMs: 300,
    replace: true,
  });

  // Local UI state (not synced to URL)
  const [brandSearch, setBrandSearch] = useState("");

  // Get current values from URL
  const selectedBrands = searchParams?.getAll("brand") || [];
  const selectedResolution = searchParams?.getAll("resolution") || [];
  const selectedRefreshRate = searchParams?.getAll("refreshRate") || [];
  const selectedDisplayTech = searchParams?.getAll("displayTech") || [];
  const selectedChipsetVendor = searchParams?.getAll("chipsetVendor") || [];
  const selectedRAM = searchParams?.getAll("ram").map(Number) || [];
  const selectedStorage = searchParams?.getAll("storage").map(Number) || [];
  const has5G = searchParams?.get("fiveG") === "true";
  const ptaApproved = searchParams?.get("ptaApproved") === "true";
  const minPrice = searchParams?.get("minPrice") || "";
  const maxPrice = searchParams?.get("maxPrice") || "";

  const handleBrandToggle = (brandId: string) => {
    toggleArrayParam("brand", brandId);
  };

  const handleStringArrayToggle = (paramKey: string, value: string) => {
    toggleArrayParam(paramKey, value);
  };

  const handleNumberArrayToggle = (paramKey: string, value: number) => {
    toggleArrayParam(paramKey, value.toString());
  };

  const resetFilters = () => {
    clearAll();
    setBrandSearch("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedBrands.length > 0) count++;
    if (selectedResolution.length > 0) count++;
    if (selectedRefreshRate.length > 0) count++;
    if (selectedDisplayTech.length > 0) count++;
    if (selectedChipsetVendor.length > 0) count++;
    if (selectedRAM.length > 0) count++;
    if (selectedStorage.length > 0) count++;
    if (has5G) count++;
    if (ptaApproved) count++;
    if (minPrice || maxPrice) count++;
    return count;
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="space-y-4 p-6 bg-card rounded-2xl border shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h2 className="text-lg font-semibold heading-tight">Filters</h2>
          {getActiveFiltersCount() > 0 && (
            <Badge variant="secondary" className="text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-7 px-2 text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      {/* Active Filter Chips */}
      {getActiveFiltersCount() > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedBrands.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedBrands.length} brands
            </Badge>
          )}
          {has5G && (
            <Badge variant="secondary" className="text-xs">
              5G
            </Badge>
          )}
          {ptaApproved && (
            <Badge variant="secondary" className="text-xs">
              PTA Approved
            </Badge>
          )}
          {(minPrice || maxPrice) && (
            <Badge variant="secondary" className="text-xs">
              Price Range
            </Badge>
          )}
        </div>
      )}

      {/* Filter Sections */}
      <Accordion
        type="multiple"
        defaultValue={["general", "price"]}
        className="space-y-2"
      >
        {/* General Info */}
        <AccordionItem value="general">
          <AccordionTrigger className="text-sm font-medium">
            General Info (
            {selectedBrands.length > 0 ? selectedBrands.length : 0})
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Manufacturers */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Manufacturers
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3 w-3 text-muted-foreground" />
                <Input
                  placeholder="Search brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="pl-8 h-8 text-sm rounded-2xl"
                />
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {filteredBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="flex items-center justify-between space-x-2"
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <Checkbox
                        id={brand.id.toString()}
                        checked={selectedBrands.includes(brand.id.toString())}
                        onCheckedChange={() =>
                          handleBrandToggle(brand.id.toString())
                        }
                        className="h-3 w-3"
                      />
                      <Label
                        htmlFor={brand.id.toString()}
                        className="text-xs cursor-pointer flex-1"
                      >
                        {brand.name}
                      </Label>
                    </div>
                    {brand._count?.phones && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        ({brand._count.phones})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Display */}
        <AccordionItem value="display">
          <AccordionTrigger className="text-sm font-medium">
            Display (
            {selectedResolution.length +
              selectedRefreshRate.length +
              selectedDisplayTech.length}
            )
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Resolution */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Resolution
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {resolutionOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={option.value}
                      checked={selectedResolution.includes(option.value)}
                      onCheckedChange={() =>
                        handleStringArrayToggle("resolution", option.value)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={option.value}
                      className="text-xs cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Refresh Rate */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Refresh Rate
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {refreshRateOptions.map((rate) => (
                  <div key={rate} className="flex items-center space-x-2">
                    <Checkbox
                      id={`refresh-${rate}`}
                      checked={selectedRefreshRate.includes(rate)}
                      onCheckedChange={() =>
                        handleStringArrayToggle("refreshRate", rate)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={`refresh-${rate}`}
                      className="text-xs cursor-pointer"
                    >
                      {rate}Hz
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Display Technology */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Technology
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {displayTechOptions.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tech-${tech}`}
                      checked={selectedDisplayTech.includes(tech)}
                      onCheckedChange={() =>
                        handleStringArrayToggle("displayTech", tech)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={`tech-${tech}`}
                      className="text-xs cursor-pointer"
                    >
                      {tech}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Hardware */}
        <AccordionItem value="hardware">
          <AccordionTrigger className="text-sm font-medium">
            Hardware (
            {selectedChipsetVendor.length +
              selectedRAM.length +
              selectedStorage.length}
            )
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Chipset Vendor */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Chipset Vendor
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {chipsetVendors.map((vendor) => (
                  <div key={vendor} className="flex items-center space-x-2">
                    <Checkbox
                      id={`chipset-${vendor}`}
                      checked={selectedChipsetVendor.includes(vendor)}
                      onCheckedChange={() =>
                        handleStringArrayToggle("chipsetVendor", vendor)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={`chipset-${vendor}`}
                      className="text-xs cursor-pointer"
                    >
                      {vendor}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* RAM */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                RAM
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {ramOptions.map((ram) => (
                  <div key={ram} className="flex items-center space-x-2">
                    <Checkbox
                      id={`ram-${ram}`}
                      checked={selectedRAM.includes(ram)}
                      onCheckedChange={() =>
                        handleNumberArrayToggle("ram", ram)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={`ram-${ram}`}
                      className="text-xs cursor-pointer"
                    >
                      {ram}GB
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Storage
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {storageOptions.map((storage) => (
                  <div key={storage} className="flex items-center space-x-2">
                    <Checkbox
                      id={`storage-${storage}`}
                      checked={selectedStorage.includes(storage)}
                      onCheckedChange={() =>
                        handleNumberArrayToggle("storage", storage)
                      }
                      className="h-3 w-3"
                    />
                    <Label
                      htmlFor={`storage-${storage}`}
                      className="text-xs cursor-pointer"
                    >
                      {storage}GB
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cellular & PTA */}
        <AccordionItem value="cellular">
          <AccordionTrigger className="text-sm font-medium">
            Cellular & PTA ({(has5G ? 1 : 0) + (ptaApproved ? 1 : 0)})
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="5g"
                  checked={has5G}
                  onCheckedChange={(checked) =>
                    setParam("fiveG", checked === true)
                  }
                  className="h-3 w-3"
                />
                <Label htmlFor="5g" className="text-xs cursor-pointer">
                  5G Support
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pta"
                  checked={ptaApproved}
                  onCheckedChange={(checked) =>
                    setParam("ptaApproved", checked === true)
                  }
                  className="h-3 w-3"
                />
                <Label htmlFor="pta" className="text-xs cursor-pointer">
                  PTA Approved
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price Range {minPrice || maxPrice ? "(1)" : ""}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                PKR Range
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice}
                  onChange={(e) => setParam("minPrice", e.target.value)}
                  className="h-8 text-sm tabular-nums rounded-2xl"
                />
                <Input
                  type="number"
                  placeholder="Max Price"
                  value={maxPrice}
                  onChange={(e) => setParam("maxPrice", e.target.value)}
                  className="h-8 text-sm tabular-nums rounded-2xl"
                />
              </div>
              <div className="text-xs text-muted-foreground">
                Example: 50000 - 200000
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sticky Footer Actions */}
      <div className="border-t pt-4">
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="flex-1"
            disabled={getActiveFiltersCount() === 0}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button className="flex-1">
            <Check className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

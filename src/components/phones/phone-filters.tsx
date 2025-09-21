"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, Search, RotateCcw, Check } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  slug: string;
  _count?: {
    phones: number;
  };
}

interface PhoneFiltersProps {
  brands: Brand[];
  onFiltersChange?: (filters: FilterState) => void;
}

interface FilterState {
  // General
  releaseYear: number[];
  manufacturers: string[];

  // Display
  displaySize: [number, number];
  resolution: string[];
  refreshRate: string[];
  displayTech: string[];

  // Hardware
  chipsetVendor: string[];
  ram: number;
  storage: number;
  cardSlot: boolean;

  // Battery
  batteryCapacity: [number, number];
  chargeSpeedWired: number;
  chargeSpeedWireless: number;

  // Camera
  mainMP: number;
  ois: boolean;
  telephoto: boolean;
  periscope: boolean;

  // Cellular
  fiveG: boolean;
  bands: string[];

  // PTA / Local
  ptaApproved: boolean;

  // Price
  priceRange: [number, number];
  showDiscountsOnly: boolean;
}

const defaultFilters: FilterState = {
  releaseYear: [],
  manufacturers: [],
  displaySize: [4.0, 7.0],
  resolution: [],
  refreshRate: [],
  displayTech: [],
  chipsetVendor: [],
  ram: 4,
  storage: 64,
  cardSlot: false,
  batteryCapacity: [2000, 6000],
  chargeSpeedWired: 15,
  chargeSpeedWireless: 5,
  mainMP: 12,
  ois: false,
  telephoto: false,
  periscope: false,
  fiveG: false,
  bands: [],
  ptaApproved: false,
  priceRange: [10000, 500000],
  showDiscountsOnly: false,
};

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

const releaseYears = Array.from({ length: 10 }, (_, i) => 2024 - i);

export function PhoneFilters({ brands, onFiltersChange }: PhoneFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  // Debounced filter application
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onFiltersChange) {
        onFiltersChange(filters);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, onFiltersChange]);

  // Initialize filters from URL params
  useEffect(() => {
    const urlFilters = { ...defaultFilters };

    if (searchParams) {
      // Parse URL parameters
      const manufacturers = searchParams.get("manufacturers")?.split(",") || [];
      const releaseYears =
        searchParams.get("releaseYear")?.split(",").map(Number) || [];
      const displaySize = searchParams
        .get("displaySize")
        ?.split(",")
        .map(Number) || [4.0, 7.0];
      const resolution = searchParams.get("resolution")?.split(",") || [];
      // ... parse other parameters

      setFilters({
        ...urlFilters,
        manufacturers,
        releaseYear: releaseYears,
        displaySize: displaySize as [number, number],
        resolution,
      });
    }
  }, [searchParams]);

  const handleFilterChange = (key: keyof FilterState, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleManufacturerToggle = (brandId: string) => {
    const current = filters.manufacturers;
    const updated = current.includes(brandId)
      ? current.filter((id) => id !== brandId)
      : [...current, brandId];

    handleFilterChange("manufacturers", updated);
  };

  const handleCheckboxToggle = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    handleFilterChange(key, updated);
  };

  const applyFilters = () => {
    setIsApplying(true);

    // Build URL params from filters
    const params = new URLSearchParams();

    if (filters.manufacturers.length > 0) {
      params.set("manufacturers", filters.manufacturers.join(","));
    }
    if (filters.releaseYear.length > 0) {
      params.set("releaseYear", filters.releaseYear.join(","));
    }
    if (filters.displaySize[0] !== 4.0 || filters.displaySize[1] !== 7.0) {
      params.set("displaySize", filters.displaySize.join(","));
    }
    if (filters.resolution.length > 0) {
      params.set("resolution", filters.resolution.join(","));
    }
    if (filters.refreshRate.length > 0) {
      params.set("refreshRate", filters.refreshRate.join(","));
    }
    if (filters.displayTech.length > 0) {
      params.set("displayTech", filters.displayTech.join(","));
    }
    if (filters.chipsetVendor.length > 0) {
      params.set("chipsetVendor", filters.chipsetVendor.join(","));
    }
    if (filters.ram !== 4) {
      params.set("ram", filters.ram.toString());
    }
    if (filters.storage !== 64) {
      params.set("storage", filters.storage.toString());
    }
    if (filters.cardSlot) {
      params.set("cardSlot", "true");
    }
    if (
      filters.batteryCapacity[0] !== 2000 ||
      filters.batteryCapacity[1] !== 6000
    ) {
      params.set("batteryCapacity", filters.batteryCapacity.join(","));
    }
    if (filters.fiveG) {
      params.set("fiveG", "true");
    }
    if (filters.ptaApproved) {
      params.set("ptaApproved", "true");
    }
    if (filters.priceRange[0] !== 10000 || filters.priceRange[1] !== 500000) {
      params.set("priceRange", filters.priceRange.join(","));
    }
    if (filters.showDiscountsOnly) {
      params.set("showDiscountsOnly", "true");
    }

    // Navigate with new params
    const queryString = params.toString();
    const newUrl = queryString ? `/phones?${queryString}` : "/phones";

    router.push(newUrl);
    setIsApplying(false);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    router.push("/phones");
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(manufacturerSearch.toLowerCase())
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.manufacturers.length > 0) count++;
    if (filters.releaseYear.length > 0) count++;
    if (filters.displaySize[0] !== 4.0 || filters.displaySize[1] !== 7.0)
      count++;
    if (filters.resolution.length > 0) count++;
    if (filters.refreshRate.length > 0) count++;
    if (filters.displayTech.length > 0) count++;
    if (filters.chipsetVendor.length > 0) count++;
    if (filters.ram !== 4) count++;
    if (filters.storage !== 64) count++;
    if (filters.cardSlot) count++;
    if (
      filters.batteryCapacity[0] !== 2000 ||
      filters.batteryCapacity[1] !== 6000
    )
      count++;
    if (filters.fiveG) count++;
    if (filters.ptaApproved) count++;
    if (filters.priceRange[0] !== 10000 || filters.priceRange[1] !== 500000)
      count++;
    if (filters.showDiscountsOnly) count++;
    return count;
  };

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

      {/* Filter Sections */}
      <Accordion
        type="multiple"
        defaultValue={["general", "price"]}
        className="space-y-2"
      >
        {/* General Info */}
        <AccordionItem value="general">
          <AccordionTrigger className="text-sm font-medium">
            General Info
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Release Year */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Release Year
              </Label>
              <Select
                onValueChange={(value) => {
                  const years = filters.releaseYear.includes(parseInt(value))
                    ? filters.releaseYear.filter((y) => y !== parseInt(value))
                    : [...filters.releaseYear, parseInt(value)];
                  handleFilterChange("releaseYear", years);
                }}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue
                    placeholder={
                      filters.releaseYear.length > 0
                        ? `${filters.releaseYear.length} selected`
                        : "Any year"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {releaseYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={filters.releaseYear.includes(year)}
                          onChange={() => {}}
                          className="h-3 w-3"
                        />
                        {year}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Manufacturers */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">
                Manufacturers ({filters.manufacturers.length})
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3 w-3 text-muted-foreground" />
                <Input
                  placeholder="Search brands..."
                  value={manufacturerSearch}
                  onChange={(e) => setManufacturerSearch(e.target.value)}
                  className="pl-8 h-8 text-sm"
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
                        id={brand.id}
                        checked={filters.manufacturers.includes(brand.id)}
                        onCheckedChange={() =>
                          handleManufacturerToggle(brand.id)
                        }
                        className="h-3 w-3"
                      />
                      <Label
                        htmlFor={brand.id}
                        className="text-xs cursor-pointer flex-1"
                      >
                        {brand.name}
                      </Label>
                    </div>
                    {brand._count?.phones && (
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {brand._count.phones}
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
            Display
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Display Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Size
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {filters.displaySize[0]}&quot; - {filters.displaySize[1]}
                  &quot;
                </span>
              </div>
              <Slider
                value={filters.displaySize}
                onValueChange={(value) =>
                  handleFilterChange("displaySize", value as [number, number])
                }
                min={3.5}
                max={8.0}
                step={0.1}
                className="py-2"
              />
            </div>

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
                      checked={filters.resolution.includes(option.value)}
                      onCheckedChange={() =>
                        handleCheckboxToggle("resolution", option.value)
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
                      checked={filters.refreshRate.includes(rate)}
                      onCheckedChange={() =>
                        handleCheckboxToggle("refreshRate", rate)
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
                      checked={filters.displayTech.includes(tech)}
                      onCheckedChange={() =>
                        handleCheckboxToggle("displayTech", tech)
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
            Hardware
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
                      checked={filters.chipsetVendor.includes(vendor)}
                      onCheckedChange={() =>
                        handleCheckboxToggle("chipsetVendor", vendor)
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
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  RAM
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {filters.ram}GB
                </span>
              </div>
              <Slider
                value={[filters.ram]}
                onValueChange={([value]) => handleFilterChange("ram", value)}
                min={2}
                max={24}
                step={1}
                className="py-2"
              />
            </div>

            {/* Storage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Storage
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {filters.storage}GB
                </span>
              </div>
              <Slider
                value={[filters.storage]}
                onValueChange={([value]) =>
                  handleFilterChange("storage", value)
                }
                min={16}
                max={1024}
                step={16}
                className="py-2"
              />
            </div>

            {/* Card Slot */}
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Card Slot
              </Label>
              <Switch
                checked={filters.cardSlot}
                onCheckedChange={(checked) =>
                  handleFilterChange("cardSlot", checked)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Battery */}
        <AccordionItem value="battery">
          <AccordionTrigger className="text-sm font-medium">
            Battery
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Battery Capacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Capacity
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {filters.batteryCapacity[0]} - {filters.batteryCapacity[1]}{" "}
                  mAh
                </span>
              </div>
              <Slider
                value={filters.batteryCapacity}
                onValueChange={(value) =>
                  handleFilterChange(
                    "batteryCapacity",
                    value as [number, number]
                  )
                }
                min={1000}
                max={10000}
                step={100}
                className="py-2"
              />
            </div>

            {/* Charge Speed */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Wired
                  </Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {filters.chargeSpeedWired}W
                  </span>
                </div>
                <Slider
                  value={[filters.chargeSpeedWired]}
                  onValueChange={([value]) =>
                    handleFilterChange("chargeSpeedWired", value)
                  }
                  min={5}
                  max={200}
                  step={5}
                  className="py-2"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Wireless
                  </Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {filters.chargeSpeedWireless}W
                  </span>
                </div>
                <Slider
                  value={[filters.chargeSpeedWireless]}
                  onValueChange={([value]) =>
                    handleFilterChange("chargeSpeedWireless", value)
                  }
                  min={5}
                  max={50}
                  step={5}
                  className="py-2"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Camera */}
        <AccordionItem value="camera">
          <AccordionTrigger className="text-sm font-medium">
            Camera
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Main MP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Main Camera
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {filters.mainMP}MP+
                </span>
              </div>
              <Slider
                value={[filters.mainMP]}
                onValueChange={([value]) => handleFilterChange("mainMP", value)}
                min={8}
                max={200}
                step={2}
                className="py-2"
              />
            </div>

            {/* Camera Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  OIS
                </Label>
                <Switch
                  checked={filters.ois}
                  onCheckedChange={(checked) =>
                    handleFilterChange("ois", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Telephoto
                </Label>
                <Switch
                  checked={filters.telephoto}
                  onCheckedChange={(checked) =>
                    handleFilterChange("telephoto", checked)
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Periscope
              </Label>
              <Switch
                checked={filters.periscope}
                onCheckedChange={(checked) =>
                  handleFilterChange("periscope", checked)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Cellular */}
        <AccordionItem value="cellular">
          <AccordionTrigger className="text-sm font-medium">
            Cellular
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                5G Support
              </Label>
              <Switch
                checked={filters.fiveG}
                onCheckedChange={(checked) =>
                  handleFilterChange("fiveG", checked)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* PTA / Local */}
        <AccordionItem value="pta">
          <AccordionTrigger className="text-sm font-medium">
            PTA / Local
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                PTA Approved
              </Label>
              <Switch
                checked={filters.ptaApproved}
                onCheckedChange={(checked) =>
                  handleFilterChange("ptaApproved", checked)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  PKR Range
                </Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  ₨{filters.priceRange[0].toLocaleString()} - ₨
                  {filters.priceRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange("priceRange", value as [number, number])
                }
                min={5000}
                max={1000000}
                step={5000}
                className="py-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium text-muted-foreground">
                Show Discounts Only
              </Label>
              <Switch
                checked={filters.showDiscountsOnly}
                onCheckedChange={(checked) =>
                  handleFilterChange("showDiscountsOnly", checked)
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sticky Footer Actions */}
      <Separator />
      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="flex-1"
          disabled={getActiveFiltersCount() === 0}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button onClick={applyFilters} className="flex-1" disabled={isApplying}>
          {isApplying ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Applying...
            </>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { PhoneFilters } from "@/lib/url-state";
import { createFilterUrl } from "@/lib/url-state";

interface FiltersSpecsProps {
  currentFilters: PhoneFilters;
  ramOptions: number[];
  storageOptions: number[];
  chipsetVendors: string[];
}

export function FiltersSpecs({
  currentFilters,
  ramOptions,
  storageOptions,
  chipsetVendors,
}: FiltersSpecsProps) {
  const router = useRouter();

  const selectedRam = currentFilters.ram || [];
  const selectedStorage = currentFilters.storage || [];
  const selectedChipsets = currentFilters.chipsetVendor || [];

  const handleRamToggle = (ramValue: number, checked: boolean) => {
    const newRam = checked
      ? [...selectedRam, ramValue]
      : selectedRam.filter((r) => r !== ramValue);

    const url = createFilterUrl(currentFilters, { ram: newRam });
    router.push(url);
  };

  const handleStorageToggle = (storageValue: number, checked: boolean) => {
    const newStorage = checked
      ? [...selectedStorage, storageValue]
      : selectedStorage.filter((s) => s !== storageValue);

    const url = createFilterUrl(currentFilters, { storage: newStorage });
    router.push(url);
  };

  const handleChipsetToggle = (chipset: string, checked: boolean) => {
    const newChipsets = checked
      ? [...selectedChipsets, chipset]
      : selectedChipsets.filter((c) => c !== chipset);

    const url = createFilterUrl(currentFilters, { chipsetVendor: newChipsets });
    router.push(url);
  };

  const handleDisplaySizeChange = (value: string) => {
    const url = createFilterUrl(currentFilters, {
      displaySize: value === "all" ? undefined : value,
    });
    router.push(url);
  };

  const handleFiveGToggle = (checked: boolean) => {
    const url = createFilterUrl(currentFilters, {
      fiveG: checked ? true : undefined,
    });
    router.push(url);
  };

  const handlePtaToggle = (checked: boolean) => {
    const url = createFilterUrl(currentFilters, {
      ptaApproved: checked ? true : undefined,
    });
    router.push(url);
  };

  return (
    <div className="space-y-6">
      {/* RAM */}
      {ramOptions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">RAM</h3>
          <div className="space-y-2">
            {ramOptions.map((ram) => (
              <div key={ram} className="flex items-center space-x-3">
                <Checkbox
                  id={`ram-${ram}`}
                  checked={selectedRam.includes(ram)}
                  onCheckedChange={(checked) =>
                    handleRamToggle(ram, checked as boolean)
                  }
                />
                <label
                  htmlFor={`ram-${ram}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {ram}GB
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Storage */}
      {storageOptions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Storage</h3>
          <div className="space-y-2">
            {storageOptions.map((storage) => (
              <div key={storage} className="flex items-center space-x-3">
                <Checkbox
                  id={`storage-${storage}`}
                  checked={selectedStorage.includes(storage)}
                  onCheckedChange={(checked) =>
                    handleStorageToggle(storage, checked as boolean)
                  }
                />
                <label
                  htmlFor={`storage-${storage}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {storage}GB
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display Size */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Display Size</h3>
        <Select
          value={currentFilters.displaySize || "all"}
          onValueChange={handleDisplaySizeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any size</SelectItem>
            <SelectItem value="small">Small (&lt; 6")</SelectItem>
            <SelectItem value="medium">Medium (6" - 6.5")</SelectItem>
            <SelectItem value="large">Large (6.5" - 7")</SelectItem>
            <SelectItem value="xlarge">Extra Large (&gt; 7")</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Chipset */}
      {chipsetVendors.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-900">Chipset</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {chipsetVendors.map((chipset) => (
              <div key={chipset} className="flex items-center space-x-3">
                <Checkbox
                  id={`chipset-${chipset}`}
                  checked={selectedChipsets.includes(chipset)}
                  onCheckedChange={(checked) =>
                    handleChipsetToggle(chipset, checked as boolean)
                  }
                />
                <label
                  htmlFor={`chipset-${chipset}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1 truncate"
                  title={chipset}
                >
                  {chipset}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900">Features</h3>

        <div className="flex items-center space-x-2">
          <Switch
            id="fiveG"
            checked={currentFilters.fiveG || false}
            onCheckedChange={handleFiveGToggle}
          />
          <Label htmlFor="fiveG" className="text-sm font-medium text-gray-700">
            5G Support
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="ptaApproved"
            checked={currentFilters.ptaApproved || false}
            onCheckedChange={handlePtaToggle}
          />
          <Label
            htmlFor="ptaApproved"
            className="text-sm font-medium text-gray-700"
          >
            PTA Approved
          </Label>
        </div>
      </div>
    </div>
  );
}

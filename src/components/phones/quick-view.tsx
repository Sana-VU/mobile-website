"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Smartphone,
  Cpu,
  HardDrive,
  Battery,
  Camera,
  Zap,
  Star,
  Eye,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Phone {
  id: number;
  name: string;
  brand: {
    name: string;
  };
  displaySize?: number;
  displaySizeText?: string;
  chipset?: string;
  ram?: number;
  storage?: number;
  batteryCapacity?: number;
  rating?: number;
  mainCamera?: string;
  frontCamera?: string;
  os?: string;
  fiveG?: boolean;
  ptaApproved?: boolean;
  vendorPrices: {
    pricePKR: number;
    vendor: string;
  }[];
}

interface QuickViewProps {
  phone: Phone;
  children: React.ReactNode;
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export function QuickView({
  phone,
  children,
  align = "center",
  side = "top",
}: QuickViewProps) {
  const lowestPrice =
    phone.vendorPrices.length > 0
      ? Math.min(...phone.vendorPrices.map((p) => p.pricePKR))
      : null;

  const specs = [
    {
      icon: Smartphone,
      label: "Display",
      value:
        phone.displaySizeText ||
        (phone.displaySize ? `${phone.displaySize}"` : null),
    },
    {
      icon: Cpu,
      label: "Chipset",
      value: phone.chipset,
    },
    {
      icon: HardDrive,
      label: "Memory",
      value:
        phone.ram && phone.storage
          ? `${phone.ram}GB RAM / ${phone.storage}GB Storage`
          : null,
    },
    {
      icon: Battery,
      label: "Battery",
      value: phone.batteryCapacity ? `${phone.batteryCapacity}mAh` : null,
    },
    {
      icon: Camera,
      label: "Main Camera",
      value: phone.mainCamera,
    },
    {
      icon: Camera,
      label: "Front Camera",
      value: phone.frontCamera,
    },
    {
      icon: Smartphone,
      label: "OS",
      value: phone.os,
    },
  ].filter((spec) => spec.value);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-80 p-0"
        align={align}
        side={side}
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-sm leading-tight">
                {phone.brand.name} {phone.name}
              </h3>
              {phone.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">
                    {phone.rating}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Quick View</span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="p-4 space-y-3">
          {specs.map((spec, index) => {
            const IconComponent = spec.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <IconComponent className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground">
                      {spec.label}
                    </span>
                    <span className="text-xs text-foreground truncate ml-2">
                      {spec.value}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Features */}
          <div className="flex items-center gap-3">
            <Zap className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Features
                </span>
                <div className="flex gap-1">
                  {phone.fiveG && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5"
                    >
                      5G
                    </Badge>
                  )}
                  {phone.ptaApproved && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5"
                    >
                      PTA
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Footer */}
        {lowestPrice && (
          <div className="p-4 border-t bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {formatPrice(lowestPrice)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Starting from {phone.vendorPrices.length} seller
                  {phone.vendorPrices.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                View Details
              </Badge>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

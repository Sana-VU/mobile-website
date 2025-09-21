import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Zap, HardDrive, Camera } from "lucide-react";

interface PhoneCardProps {
  phone: {
    id: number;
    name: string;
    slug: string;
    ramGB: number;
    storageGB: number;
    fiveG: boolean;
    batteryMAh: number;
    displayInch: number;
    releaseYear: number;
    chipset?: string | null;
    mainCamera?: string | null;
    ptaApproved: boolean;
    brand: {
      name: string;
      slug?: string;
    };
    vendorPrices: Array<{
      pricePKR: number;
      vendor: {
        name: string;
      };
    }>;
  };
  viewMode?: "grid" | "list";
  priority?: boolean;
}

export const PhoneCard = memo(function PhoneCard({
  phone,
  viewMode = "grid",
  priority = false,
}: PhoneCardProps) {
  const minPrice =
    phone.vendorPrices.length > 0
      ? Math.min(...phone.vendorPrices.map((vp) => vp.pricePKR))
      : null;

  const imageUrl = `/api/placeholder/300/200?text=${encodeURIComponent(phone.name)}`;

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image
                src={imageUrl}
                alt={phone.name}
                fill
                className="object-cover rounded-lg"
                priority={priority}
                sizes="96px"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/phones/${phone.slug}`} className="block">
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                      {phone.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {phone.brand.name} • {phone.releaseYear}
                  </p>
                </div>

                <div className="text-right">
                  {minPrice && (
                    <p className="text-lg font-bold text-gray-900">
                      ₹{minPrice.toLocaleString()}
                    </p>
                  )}
                  {phone.vendorPrices.length > 1 && (
                    <p className="text-xs text-gray-500">
                      {phone.vendorPrices.length} offers
                    </p>
                  )}
                </div>
              </div>

              {/* Specs */}
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <HardDrive className="h-3 w-3" />
                  <span>
                    {phone.ramGB}GB • {phone.storageGB}GB
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>{phone.batteryMAh}mAh</span>
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3" />
                  <span>{phone.displayInch}&quot;</span>
                </div>
                {phone.mainCamera && (
                  <div className="flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    <span>{phone.mainCamera}</span>
                  </div>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {phone.fiveG && (
                  <Badge variant="secondary" className="text-xs">
                    5G
                  </Badge>
                )}
                {phone.ptaApproved && (
                  <Badge variant="outline" className="text-xs">
                    PTA Approved
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <Link href={`/phones/${phone.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <Image
            src={imageUrl}
            alt={phone.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <CardContent className="p-4">
          {/* Title and Brand */}
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
            {phone.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {phone.brand.name} • {phone.releaseYear}
          </p>

          {/* Key Specs */}
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>
                {phone.ramGB}GB RAM • {phone.storageGB}GB
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>{phone.batteryMAh}mAh Battery</span>
            </div>
            <div className="flex items-center gap-1">
              <Smartphone className="h-3 w-3" />
              <span>{phone.displayInch}&quot; Display</span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mt-3">
            {phone.fiveG && (
              <Badge variant="secondary" className="text-xs">
                5G
              </Badge>
            )}
            {phone.ptaApproved && (
              <Badge variant="outline" className="text-xs">
                PTA
              </Badge>
            )}
          </div>

          {/* Price */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            {minPrice ? (
              <div>
                <p className="text-lg font-bold text-gray-900">
                  ₹{minPrice.toLocaleString()}
                </p>
                {phone.vendorPrices.length > 1 && (
                  <p className="text-xs text-gray-500">
                    {phone.vendorPrices.length} offers available
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Price not available</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
});

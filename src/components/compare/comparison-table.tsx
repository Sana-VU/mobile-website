"use client";

import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// More flexible type for database query results
type ComparePhone = {
  id: number;
  name: string;
  slug: string;
  brandId: number;
  releaseYear: number;
  displayInch: number;
  ramGB: number;
  storageGB: number;
  batteryMAh: number;
  fiveG: boolean;
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  vendorPrices?: Array<{
    id: number;
    pricePKR: number;
    vendor: {
      id: number;
      name: string;
      slug: string;
    };
  }>;
};

interface ComparisonTableProps {
  phones: ComparePhone[];
}

export function ComparisonTable({ phones }: ComparisonTableProps) {
  if (phones.length === 0) {
    return (
      <div className="text-center p-8">
        <p>Select phones to compare</p>
      </div>
    );
  }

  // Creates a URL slug for a phone
  const getPhoneSlug = (phone: ComparePhone) => {
    return `/phones/${phone.slug}`;
  };

  return (
    <div className="overflow-x-auto pb-6">
      <table className="w-full border-collapse">
        <thead className="bg-background sticky top-0 z-10">
          <tr>
            <th className="p-4 text-left border-b min-w-[140px]">Feature</th>
            {phones.map((phone) => (
              <th
                key={phone.id}
                className="p-4 text-center border-b min-w-[200px]"
              >
                <Link
                  href={`/phones/${getPhoneSlug(phone)}`}
                  className="hover:underline"
                >
                  <div className="font-medium">{phone.brand.name}</div>
                  <div>{phone.name}</div>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Image Row */}
          <tr>
            <td className="p-4 border-b font-medium">Image</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                <div className="w-24 h-24 mx-auto bg-secondary/10 flex items-center justify-center rounded-md">
                  {phone.brand.name[0]}
                  {phone.name[0]}
                </div>
              </td>
            ))}
          </tr>

          {/* Price Row */}
          <tr className="bg-muted/30">
            <td className="p-4 border-b font-medium">Price</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                <div className="font-semibold">
                  {formatPrice(phone.vendorPrices?.[0]?.pricePKR || 0)}
                </div>
              </td>
            ))}
          </tr>

          {/* Display Row */}
          <tr>
            <td className="p-4 border-b font-medium">Display</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                {phone.displayInch}&quot;
              </td>
            ))}
          </tr>

          {/* Processor Row */}
          <tr className="bg-muted/30">
            <td className="p-4 border-b font-medium">Processor</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                Snapdragon 8 Gen 2
              </td>
            ))}
          </tr>

          {/* RAM Row */}
          <tr>
            <td className="p-4 border-b font-medium">RAM</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                {phone.ramGB} GB
              </td>
            ))}
          </tr>

          {/* Storage Row */}
          <tr className="bg-muted/30">
            <td className="p-4 border-b font-medium">Storage</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                {phone.storageGB} GB
              </td>
            ))}
          </tr>

          {/* Battery Row */}
          <tr>
            <td className="p-4 border-b font-medium">Battery</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                {phone.batteryMAh} mAh
              </td>
            ))}
          </tr>

          {/* Camera Row */}
          <tr className="bg-muted/30">
            <td className="p-4 border-b font-medium">Main Camera</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                50 MP
              </td>
            ))}
          </tr>

          {/* 5G Row */}
          <tr>
            <td className="p-4 border-b font-medium">5G</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                <div
                  className={cn(
                    "inline-flex items-center",
                    phone.fiveG ? "text-green-600" : "text-red-500"
                  )}
                >
                  {phone.fiveG ? "Yes" : "No"}
                </div>
              </td>
            ))}
          </tr>

          {/* Year Row */}
          <tr className="bg-muted/30">
            <td className="p-4 border-b font-medium">Release Year</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 border-b text-center">
                {phone.releaseYear}
              </td>
            ))}
          </tr>

          {/* View Details Row */}
          <tr>
            <td className="p-4 font-medium">View Details</td>
            {phones.map((phone) => (
              <td key={phone.id} className="p-4 text-center">
                <Link
                  href={`/phones/${getPhoneSlug(phone)}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

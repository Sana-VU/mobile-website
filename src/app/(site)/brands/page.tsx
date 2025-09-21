import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile Brands | WhatMobile - Pakistan's Premier Mobile Marketplace",
  description:
    "Browse mobile phones by brand - Samsung, Apple, Xiaomi, OnePlus, Vivo, Oppo and more. Compare specs, prices, and find your perfect device from top manufacturers.",
  keywords: [
    "mobile brands",
    "phone manufacturers",
    "Samsung phones",
    "Apple iPhone",
    "Xiaomi phones",
    "OnePlus devices",
    "mobile phone brands Pakistan",
  ],
};

interface SearchParams {
  search?: string;
}

interface BrandsPageProps {
  searchParams: Promise<SearchParams>;
}

async function getBrands(searchQuery?: string) {
  const brands = await db.brand.findMany({
    where: searchQuery
      ? {
          name: {
            contains: searchQuery,
          },
        }
      : undefined,
    include: {
      _count: {
        select: { phones: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return brands.map((brand) => ({
    ...brand,
    phoneCount: brand._count.phones,
  }));
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
  const params = await searchParams;
  const brands = await getBrands(params.search);

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Search */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-violet-500 bg-clip-text text-transparent">
            Mobile Brands
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Discover phones from top mobile manufacturers. Compare specs,
            prices, and find your perfect device.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search brands..."
                className="pl-10 pr-4 py-2 w-full"
                defaultValue={params.search || ""}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {params.search
                ? `Showing results for "${params.search}"`
                : "Search by brand name"}
            </p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.name.toLowerCase()}`}>
              <Card className="group hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-6">
                  {/* Brand Logo Placeholder */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-border/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-primary">
                      {brand.name.charAt(0)}
                    </span>
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>

                  {/* Phone Count */}
                  <div className="flex justify-center">
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-primary/10 transition-colors"
                    >
                      {brand.phoneCount}{" "}
                      {brand.phoneCount === 1 ? "phone" : "phones"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {brands.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">No brands found</h3>
            <p className="text-muted-foreground">
              Brands will appear here once they&apos;re added to the database.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

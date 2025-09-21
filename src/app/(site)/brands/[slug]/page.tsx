import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { PhoneCard } from "@/components/ui/phone-card";

interface BrandPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand Not Found",
    };
  }

  return {
    title: `${brand.name} Phones | WhatMobile - Pakistan's Premier Mobile Marketplace`,
    description: `Browse ${brand.name} mobile phones with prices, specifications and reviews. Find the best ${brand.name} smartphones in Pakistan.`,
    keywords: [
      `${brand.name} phones`,
      `${brand.name} mobile prices`,
      `${brand.name} smartphones Pakistan`,
      "mobile phone specifications",
      "phone prices Pakistan",
    ],
  };
}

async function getBrandBySlug(slug: string) {
  // First try to find by slug, fallback to name comparison
  let brand = await db.brand.findFirst({
    where: { slug },
  });

  if (!brand) {
    // Fallback: try to find by name (case insensitive)
    brand = await db.brand.findFirst({
      where: { name: { equals: slug } },
    });
  }

  return brand;
}

async function getBrandPhones(brandId: number) {
  const phones = await db.phone.findMany({
    where: { brandId },
    include: {
      brand: true,
      vendorPrices: {
        orderBy: { pricePKR: "asc" },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return phones;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const phones = await getBrandPhones(brand.id);

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/brands" className="hover:text-foreground">
              Brands
            </Link>
          </li>
          <li>/</li>
          <li className="text-foreground">{brand.name}</li>
        </ol>
      </nav>

      {/* Brand Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-500/10 border border-border/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {brand.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{brand.name} Phones</h1>
            <p className="text-muted-foreground">
              Explore smartphones from {brand.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {phones.length} {phones.length === 1 ? "Phone" : "Phones"} Available
          </Badge>
        </div>
      </div>

      {/* Phones Grid */}
      {phones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {phones.map((phone) => (
            <PhoneCard
              key={phone.id}
              title={phone.name}
              brand={phone.brand.name}
              href={`/phones/${phone.slug}`}
              fiveG={phone.fiveG}
              price={
                phone.vendorPrices[0]?.pricePKR
                  ? `Rs ${phone.vendorPrices[0].pricePKR.toLocaleString()}`
                  : undefined
              }
              vendorName={phone.vendorPrices[0] ? "Best Price" : undefined}
              specs={[
                { label: "RAM", value: `${phone.ramGB}GB` },
                { label: "Storage", value: `${phone.storageGB}GB` },
                { label: "Display", value: `${phone.displayInch}"` },
                { label: "Battery", value: `${phone.batteryMAh}mAh` },
              ]}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-2">No phones found</h3>
          <p className="text-muted-foreground mb-6">
            We don&apos;t have any phones from {brand.name} in our database yet.
          </p>
          <Link href="/phones" className="text-primary hover:underline">
            Browse all phones
          </Link>
        </div>
      )}
    </div>
  );
}

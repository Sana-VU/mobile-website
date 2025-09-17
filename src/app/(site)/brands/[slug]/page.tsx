import { Metadata } from "next";
import Link from "next/link";

interface BrandPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} Phones | WhatMobile`,
    description: `Browse ${params.slug} mobile phones with prices, specifications and reviews.`,
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const brandName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

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
          <li className="text-foreground">{brandName}</li>
        </ol>
      </nav>

      {/* Brand Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{brandName} Phones</h1>
        <p className="text-muted-foreground">Explore phones from {brandName}</p>
      </div>

      {/* Placeholder content */}
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">
          Brand page for {brandName} is under construction
        </p>
        <Link href="/phones" className="text-primary hover:underline">
          Browse all phones
        </Link>
      </div>
    </div>
  );
}

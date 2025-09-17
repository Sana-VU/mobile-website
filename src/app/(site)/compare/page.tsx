import { Metadata } from "next";
import { db } from "@/lib/db";
import { PhoneWithBrand } from "@/types/models";
import { CompareClient } from "@/components/compare/compare-client";

export const metadata: Metadata = {
  title: "Compare Phones - WhatMobile",
  description: "Compare specifications of multiple mobile phones side by side",
};

// Fetch multiple phones by their IDs
async function getPhonesForComparison(phoneIds: number[]) {
  if (!phoneIds.length) return [];

  const phones = await db.phone.findMany({
    where: {
      id: {
        in: phoneIds,
      },
    },
    include: {
      brand: true,
      vendorPrices: {
        include: {
          vendor: true,
        },
        orderBy: {
          price: "asc",
        },
        take: 1,
      },
    },
  });

  // Return phones in the same order as the input IDs
  return phoneIds
    .map((id) => phones.find((phone: { id: number }) => phone.id === id))
    .filter(Boolean) as PhoneWithBrand[];
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams
  const params = await searchParams;

  // Get phone IDs from search params (e.g. ?phones=1,2,3)
  const phoneIdsParam = params.phones
    ? Array.isArray(params.phones)
      ? params.phones[0]
      : params.phones
    : "";

  const phoneIds = phoneIdsParam
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id));

  const phones = await getPhonesForComparison(phoneIds);

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Compare Phones</h1>
      <p className="mb-4 text-muted-foreground">
        Select phones to compare their specifications side by side
      </p>

      <CompareClient phones={phones} phoneIds={phoneIds} />
    </div>
  );
}

import { Metadata } from "next";
import { db } from "@/lib/db";
import { CompareClient } from "@/components/compare/compare-client";

export const metadata: Metadata = {
  title: "Compare Phones | WhatMobile - Pakistan's Premier Mobile Marketplace",
  description:
    "Compare specifications of multiple mobile phones side by side. Find the best smartphone for your needs with detailed spec comparison.",
  keywords: [
    "phone comparison",
    "mobile phone specs",
    "compare smartphones",
    "phone specifications",
    "mobile comparison tool",
  ],
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
          pricePKR: "asc",
        },
        take: 1,
      },
    },
  });

  // Return phones in the same order as the input IDs, filtering out any undefined
  return phoneIds
    .map((id) => phones.find((phone) => phone.id === id))
    .filter((phone): phone is NonNullable<typeof phone> => phone !== undefined);
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-violet-500 bg-clip-text text-transparent">
            Compare Phones
          </h1>
          <p className="text-lg text-muted-foreground">
            Compare specifications of multiple mobile phones side by side to
            find the perfect device for you
          </p>
        </div>

        <CompareClient phones={phones} phoneIds={phoneIds} />
      </div>
    </div>
  );
}

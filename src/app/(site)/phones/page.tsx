import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import PhonesList from "@/components/phones/phones-list";
import FiltersSheet from "@/components/phones/filters-sheet";
import { Suspense } from "react";
import PhonesSkeleton from "@/components/phones/phones-skeleton";

export const dynamic = "force-dynamic";

interface SearchParams {
  page?: string;
  brand?: string | string[];
  minPrice?: string;
  maxPrice?: string;
  ram?: string | string[];
  fiveG?: string;
  sort?: string;
}

export default async function PhonesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = parseInt(searchParams.page || "1");
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  // Get all brands for filter options
  const brands = await db.brand.findMany({
    orderBy: { name: "asc" },
  });

  // Get min and max prices for price range slider
  const priceStats = await db.vendorPrice.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  // Get available RAM options
  const ramOptions = await db.phone.findMany({
    select: { ramGB: true },
    distinct: ["ramGB"],
    orderBy: { ramGB: "asc" },
  });

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Phones</h1>
        <FiltersSheet
          brands={brands}
          priceRange={{
            min: priceStats._min.price || 0,
            max: priceStats._max.price || 100000,
          }}
          ramOptions={ramOptions.map((r: { ramGB: number }) => r.ramGB)}
          selectedFilters={{
            brands: Array.isArray(searchParams.brand)
              ? searchParams.brand
              : searchParams.brand
                ? [searchParams.brand]
                : [],
            minPrice: searchParams.minPrice
              ? parseInt(searchParams.minPrice)
              : priceStats._min.price || 0,
            maxPrice: searchParams.maxPrice
              ? parseInt(searchParams.maxPrice)
              : priceStats._max.price || 100000,
            ram: Array.isArray(searchParams.ram)
              ? searchParams.ram.map((r) => parseInt(r))
              : searchParams.ram
                ? [parseInt(searchParams.ram)]
                : [],
            fiveG: searchParams.fiveG === "true",
          }}
        />
      </div>

      <Suspense fallback={<PhonesSkeleton />}>
        <PhonesWithFilters
          searchParams={searchParams}
          pageSize={pageSize}
          skip={skip}
        />
      </Suspense>
    </div>
  );
}

async function PhonesWithFilters({
  searchParams,
  pageSize,
  skip,
}: {
  searchParams: SearchParams;
  pageSize: number;
  skip: number;
}) {
  // Build the where clause for filtering
  const where: Prisma.PhoneWhereInput = {};

  // Filter by brand
  if (searchParams.brand) {
    const brandIds = Array.isArray(searchParams.brand)
      ? searchParams.brand.map(Number)
      : [parseInt(searchParams.brand)];

    where.brandId = { in: brandIds };
  }

  // Filter by RAM
  if (searchParams.ram) {
    const ramValues = Array.isArray(searchParams.ram)
      ? searchParams.ram.map(Number)
      : [parseInt(searchParams.ram)];

    where.ramGB = { in: ramValues };
  }

  // Filter by 5G
  if (searchParams.fiveG) {
    where.fiveG = searchParams.fiveG === "true";
  }

  // Price filter requires joining with VendorPrice
  let priceFilter = {};
  if (searchParams.minPrice || searchParams.maxPrice) {
    priceFilter = {
      vendorPrices: {
        some: {
          price: {
            gte: searchParams.minPrice
              ? parseInt(searchParams.minPrice)
              : undefined,
            lte: searchParams.maxPrice
              ? parseInt(searchParams.maxPrice)
              : undefined,
          },
        },
      },
    };
  }

  // Combine all filters
  const filter = { ...where, ...priceFilter };

  // Determine sort order
  let orderBy;
  switch (searchParams.sort) {
    case "newest":
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orderBy = { releaseYear: "desc" as any };
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orderBy = { id: "desc" as any };
  }

  // Fetch phones with pagination and filtering
  const phones = await db.phone.findMany({
    where: filter,
    include: {
      brand: true,
      vendorPrices: {
        include: {
          vendor: true,
        },
        orderBy: {
          price: "asc",
        },
        take: 1, // Get the lowest price for each phone
      },
    },
    orderBy,
    skip,
    take: pageSize,
  });

  // Get total count for pagination
  const total = await db.phone.count({ where: filter });
  const totalPages = Math.ceil(total / pageSize);

  return (
    <PhonesList
      phones={phones}
      currentPage={parseInt(searchParams.page || "1")}
      totalPages={totalPages}
    />
  );
}

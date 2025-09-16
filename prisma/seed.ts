import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Brands
  const brands = await prisma.brand.createMany({
    data: [
      { name: "Samsung" },
      { name: "Apple" },
      { name: "Xiaomi" },
      { name: "OnePlus" },
      { name: "Google" },
      { name: "Oppo" },
    ],
  });

  // Vendors
  const vendors = await prisma.vendor.createMany({
    data: [
      { name: "Daraz" },
      { name: "MegaMobile" },
      { name: "MobileMall" },
      { name: "PriceOye" },
    ],
  });

  // Phones
  const brandMap = {
    Samsung: 1,
    Apple: 2,
    Xiaomi: 3,
    OnePlus: 4,
    Google: 5,
    Oppo: 6,
  };

  const phones = await prisma.phone.createMany({
    data: [
      {
        name: "Galaxy S24 Ultra",
        brandId: brandMap.Samsung,
        ramGB: 12,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.8,
        releaseYear: 2024,
      },
      {
        name: "Galaxy A55",
        brandId: brandMap.Samsung,
        ramGB: 8,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.6,
        releaseYear: 2024,
      },
      {
        name: "iPhone 15 Pro",
        brandId: brandMap.Apple,
        ramGB: 8,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 3274,
        displayInch: 6.1,
        releaseYear: 2023,
      },
      {
        name: "iPhone SE 2025",
        brandId: brandMap.Apple,
        ramGB: 4,
        storageGB: 128,
        fiveG: false,
        batteryMAh: 2200,
        displayInch: 4.7,
        releaseYear: 2025,
      },
      {
        name: "Xiaomi 14",
        brandId: brandMap.Xiaomi,
        ramGB: 12,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 4610,
        displayInch: 6.36,
        releaseYear: 2024,
      },
      {
        name: "Redmi Note 13",
        brandId: brandMap.Xiaomi,
        ramGB: 6,
        storageGB: 128,
        fiveG: false,
        batteryMAh: 5000,
        displayInch: 6.67,
        releaseYear: 2024,
      },
      {
        name: "OnePlus 12",
        brandId: brandMap.OnePlus,
        ramGB: 16,
        storageGB: 512,
        fiveG: true,
        batteryMAh: 5400,
        displayInch: 6.82,
        releaseYear: 2024,
      },
      {
        name: "OnePlus Nord CE 4",
        brandId: brandMap.OnePlus,
        ramGB: 8,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.7,
        releaseYear: 2024,
      },
      {
        name: "Pixel 9 Pro",
        brandId: brandMap.Google,
        ramGB: 12,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 5050,
        displayInch: 6.7,
        releaseYear: 2025,
      },
      {
        name: "Pixel 8a",
        brandId: brandMap.Google,
        ramGB: 8,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 4492,
        displayInch: 6.1,
        releaseYear: 2024,
      },
      {
        name: "Oppo Find X7",
        brandId: brandMap.Oppo,
        ramGB: 16,
        storageGB: 512,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.74,
        releaseYear: 2024,
      },
      {
        name: "Oppo Reno 11",
        brandId: brandMap.Oppo,
        ramGB: 8,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 4800,
        displayInch: 6.7,
        releaseYear: 2024,
      },
      {
        name: "Galaxy S23 FE",
        brandId: brandMap.Samsung,
        ramGB: 8,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 4500,
        displayInch: 6.4,
        releaseYear: 2023,
      },
      {
        name: "iPhone 14",
        brandId: brandMap.Apple,
        ramGB: 6,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 3279,
        displayInch: 6.1,
        releaseYear: 2022,
      },
      {
        name: "Redmi 13C",
        brandId: brandMap.Xiaomi,
        ramGB: 4,
        storageGB: 64,
        fiveG: false,
        batteryMAh: 5000,
        displayInch: 6.74,
        releaseYear: 2023,
      },
      {
        name: "OnePlus 11R",
        brandId: brandMap.OnePlus,
        ramGB: 8,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.74,
        releaseYear: 2023,
      },
      {
        name: "Pixel 7",
        brandId: brandMap.Google,
        ramGB: 8,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 4355,
        displayInch: 6.3,
        releaseYear: 2022,
      },
      {
        name: "Oppo A78",
        brandId: brandMap.Oppo,
        ramGB: 8,
        storageGB: 128,
        fiveG: false,
        batteryMAh: 5000,
        displayInch: 6.56,
        releaseYear: 2023,
      },
      {
        name: "Galaxy M55",
        brandId: brandMap.Samsung,
        ramGB: 8,
        storageGB: 256,
        fiveG: true,
        batteryMAh: 5000,
        displayInch: 6.7,
        releaseYear: 2024,
      },
      {
        name: "iPhone 13 Mini",
        brandId: brandMap.Apple,
        ramGB: 4,
        storageGB: 128,
        fiveG: true,
        batteryMAh: 2438,
        displayInch: 5.4,
        releaseYear: 2021,
      },
    ],
  });

  // Vendor Prices
  const vendorIds = [1, 2, 3, 4];
  const phoneIds = Array.from({ length: 20 }, (_, i) => i + 1);
  for (const phoneId of phoneIds) {
    for (const vendorId of vendorIds) {
      await prisma.vendorPrice.create({
        data: {
          phoneId,
          vendorId,
          price: 50000 + Math.floor(Math.random() * 100000),
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

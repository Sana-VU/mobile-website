import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Utility to add sample price history data
 * Run this to populate price history for testing
 */
async function addSamplePriceHistory() {
  try {
    console.log("🔄 Adding sample price history...");

    // Get first few phones to add price history for
    const phones = await prisma.phone.findMany({
      take: 3,
      select: { id: true, name: true },
    });

    if (phones.length === 0) {
      console.log("❌ No phones found. Please seed phones first.");
      return;
    }

    for (const phone of phones) {
      console.log(`📱 Adding price history for ${phone.name}...`);

      // Generate sample price history over the last 6 months
      const now = new Date();
      const priceHistoryData = [];

      // Base price (will vary over time)
      let basePrice = Math.floor(Math.random() * 100000) + 50000; // 50k-150k PKR

      for (let i = 180; i >= 0; i -= 15) {
        // Every 15 days for 6 months
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        // Price variation (±5-15%)
        const variation = (Math.random() - 0.5) * 0.3; // ±15%
        const price = Math.floor(basePrice * (1 + variation));

        // Gradually decrease base price over time (phones get cheaper)
        basePrice = Math.max(basePrice * 0.995, basePrice * 0.7);

        const sources = [
          "Daraz",
          "PriceOye",
          "Homeshopping",
          "OLX",
          "WhatMobile",
        ];
        const source = sources[Math.floor(Math.random() * sources.length)];

        priceHistoryData.push({
          phoneId: phone.id,
          pricePKR: price,
          source: source,
          date: date,
        });
      }

      await prisma.priceHistory.createMany({
        data: priceHistoryData,
      });

      console.log(
        `✅ Added ${priceHistoryData.length} price entries for ${phone.name}`
      );
    }

    console.log("🎉 Sample price history data added successfully!");
  } catch (error) {
    console.error("❌ Error adding sample price history:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  addSamplePriceHistory();
}

export { addSamplePriceHistory };

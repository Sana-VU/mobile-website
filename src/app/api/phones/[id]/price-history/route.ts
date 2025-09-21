import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/phones/[id]/price-history
 * Fetch price history for a specific phone
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const phoneId = parseInt(params.id);

    if (isNaN(phoneId)) {
      return NextResponse.json({ error: "Invalid phone ID" }, { status: 400 });
    }

    // Verify phone exists
    const phone = await prisma.phone.findUnique({
      where: { id: phoneId },
      select: { id: true, name: true },
    });

    if (!phone) {
      return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    // Get price history ordered by date descending
    const priceHistory = await prisma.priceHistory.findMany({
      where: { phoneId },
      orderBy: { date: "desc" },
      select: {
        id: true,
        pricePKR: true,
        source: true,
        date: true,
      },
    });

    // Calculate price statistics
    const prices: number[] = priceHistory.map(
      (p: { pricePKR: number }) => p.pricePKR
    );
    const stats =
      prices.length > 0
        ? {
            currentPrice: prices[0] || null,
            lowestPrice: Math.min(...prices),
            highestPrice: Math.max(...prices),
            averagePrice: Math.round(
              prices.reduce((a: number, b: number) => a + b, 0) / prices.length
            ),
            totalEntries: prices.length,
          }
        : {
            currentPrice: null,
            lowestPrice: null,
            highestPrice: null,
            averagePrice: null,
            totalEntries: 0,
          };

    return NextResponse.json({
      phone: {
        id: phone.id,
        name: phone.name,
      },
      priceHistory,
      stats,
    });
  } catch (error) {
    console.error("Price history API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

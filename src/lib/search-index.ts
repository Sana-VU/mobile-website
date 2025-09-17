import { prisma } from "@/lib/prisma";

export interface PhoneSearchDocument {
  id: number;
  name: string;
  brand: string;
  pricePKR: number;
  ramGB: number;
  fiveG: boolean;
  slug: string;
  storageGB: number;
  batteryMAh: number;
  displayInch: number;
  releaseYear: number;
  searchText: string; // Combined searchable text
}

// In-memory search index
let searchIndex: PhoneSearchDocument[] = [];

/**
 * Build search index from database
 */
export async function buildSearchIndex(): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> {
  try {
    console.log("Building search index...");

    const phones = await prisma.phone.findMany({
      include: {
        brand: {
          select: {
            name: true,
          },
        },
        vendorPrices: {
          orderBy: {
            pricePKR: "asc",
          },
          take: 1, // Get lowest price
          select: {
            pricePKR: true,
          },
        },
      },
    });

    searchIndex = phones.map((phone: any) => {
      const lowestPrice = phone.vendorPrices[0]?.pricePKR || 0;

      // Create combined search text for better matching
      const searchText = [
        phone.name,
        phone.brand.name,
        `${phone.ramGB}GB RAM`,
        `${phone.storageGB}GB storage`,
        phone.fiveG ? "5G" : "4G",
        `${phone.batteryMAh}mAh`,
        `${phone.displayInch}" display`,
        phone.chipset || "",
        phone.os || "",
      ]
        .join(" ")
        .toLowerCase();

      return {
        id: phone.id,
        name: phone.name,
        brand: phone.brand.name,
        pricePKR: lowestPrice,
        ramGB: phone.ramGB,
        fiveG: phone.fiveG,
        slug: phone.slug,
        storageGB: phone.storageGB,
        batteryMAh: phone.batteryMAh,
        displayInch: phone.displayInch,
        releaseYear: phone.releaseYear,
        searchText,
      };
    });

    console.log(`Search index built with ${searchIndex.length} phones`);

    return {
      success: true,
      count: searchIndex.length,
    };
  } catch (error) {
    console.error("Error building search index:", error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Search phones with fuzzy matching and ranking
 */
export function searchPhones(
  query: string,
  limit: number = 10
): PhoneSearchDocument[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const words = searchTerm.split(/\s+/);

  // Score and filter phones
  const scoredResults = searchIndex
    .map((phone) => {
      let score = 0;

      // Exact matches get highest score
      if (phone.name.toLowerCase() === searchTerm) score += 1000;
      if (phone.brand.toLowerCase() === searchTerm) score += 800;

      // Partial matches
      if (phone.name.toLowerCase().includes(searchTerm)) score += 500;
      if (phone.brand.toLowerCase().includes(searchTerm)) score += 400;

      // Word-based matching
      words.forEach((word) => {
        if (phone.searchText.includes(word)) {
          score += 100;
        }

        // Prefix matching for model numbers/names
        const nameWords = phone.name.toLowerCase().split(/\s+/);
        const brandWords = phone.brand.toLowerCase().split(/\s+/);

        if (nameWords.some((w) => w.startsWith(word))) score += 200;
        if (brandWords.some((w) => w.startsWith(word))) score += 150;
      });

      // Boost newer phones slightly
      if (phone.releaseYear >= 2023) score += 10;
      if (phone.releaseYear >= 2024) score += 20;

      // Boost 5G phones slightly
      if (phone.fiveG) score += 5;

      return { ...phone, score };
    })
    .filter((phone) => phone.score > 0) // Only return phones with some relevance
    .sort((a, b) => {
      // Sort by score first, then by price (lower is better), then by name
      if (b.score !== a.score) return b.score - a.score;
      if (a.pricePKR !== b.pricePKR) return a.pricePKR - b.pricePKR;
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);

  return scoredResults.map(({ score: _score, ...phone }) => phone);
}

/**
 * Get search index statistics
 */
export function getSearchIndexStats() {
  const brands = new Set(searchIndex.map((p) => p.brand)).size;
  const fiveGCount = searchIndex.filter((p) => p.fiveG).length;
  const avgPrice =
    searchIndex.length > 0
      ? Math.round(
          searchIndex.reduce((sum, p) => sum + p.pricePKR, 0) /
            searchIndex.length
        )
      : 0;

  return {
    totalPhones: searchIndex.length,
    brands,
    fiveGPhones: fiveGCount,
    averagePrice: avgPrice,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Get suggestions based on partial input
 */
export function getSearchSuggestions(
  query: string,
  limit: number = 5
): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const suggestions = new Set<string>();

  searchIndex.forEach((phone) => {
    // Brand suggestions
    if (phone.brand.toLowerCase().includes(searchTerm)) {
      suggestions.add(phone.brand);
    }

    // Phone name suggestions
    if (phone.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(phone.name);
    }

    // Model number/series suggestions
    const nameWords = phone.name.split(/\s+/);
    nameWords.forEach((word) => {
      if (word.toLowerCase().includes(searchTerm) && word.length > 2) {
        suggestions.add(word);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
}

// Initialize search index on module load
buildSearchIndex().catch(console.error);

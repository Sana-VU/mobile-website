import { NextRequest, NextResponse } from "next/server";
import {
  searchPhones,
  getSearchSuggestions,
  getSearchIndexStats,
} from "@/lib/search-index";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const suggestions = searchParams.get("suggestions") === "true";
    const stats = searchParams.get("stats") === "true";

    // Return stats if requested
    if (stats) {
      const indexStats = getSearchIndexStats();
      return NextResponse.json({
        success: true,
        stats: indexStats,
      });
    }

    // Return suggestions if requested
    if (suggestions && query) {
      const searchSuggestions = getSearchSuggestions(query, Math.min(limit, 5));
      return NextResponse.json({
        success: true,
        query,
        suggestions: searchSuggestions,
        count: searchSuggestions.length,
      });
    }

    // Validate query
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Query parameter "q" is required',
          results: [],
          count: 0,
        },
        { status: 400 }
      );
    }

    // Validate limit
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        {
          success: false,
          error: "Limit must be between 1 and 50",
          results: [],
          count: 0,
        },
        { status: 400 }
      );
    }

    // Perform search
    const results = searchPhones(query, limit);

    return NextResponse.json({
      success: true,
      query,
      results,
      count: results.length,
      limit,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during search",
        results: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

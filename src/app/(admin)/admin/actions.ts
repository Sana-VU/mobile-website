"use server";

import { buildSearchIndex } from "@/lib/search-index";
import { revalidatePath } from "next/cache";

export async function reindexPhonesAction() {
  try {
    const result = await buildSearchIndex();

    // Revalidate any cached pages that might use search
    revalidatePath("/");
    revalidatePath("/phones");

    return {
      success: result.success,
      message: result.success
        ? `Successfully indexed ${result.count} phones`
        : `Failed to index phones: ${result.error}`,
      count: result.count,
    };
  } catch (error) {
    console.error("Reindex action error:", error);
    return {
      success: false,
      message: `Error during reindexing: ${error instanceof Error ? error.message : "Unknown error"}`,
      count: 0,
    };
  }
}

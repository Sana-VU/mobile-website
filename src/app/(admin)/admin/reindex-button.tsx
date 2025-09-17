"use client";

import { useState, useTransition } from "react";
import { reindexPhonesAction } from "./actions";

export function ReindexButton() {
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    count: number;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleReindex = () => {
    startTransition(async () => {
      const actionResult = await reindexPhonesAction();
      setResult(actionResult);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleReindex}
          disabled={isPending}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${
              isPending
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }
          `}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="opacity-25"
                />
                <path
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  className="opacity-75"
                />
              </svg>
              Reindexing...
            </span>
          ) : (
            "Reindex Phone Search"
          )}
        </button>
      </div>

      {result && (
        <div
          className={`
            p-4 rounded-lg border-l-4 
            ${
              result.success
                ? "bg-green-50 border-green-400 text-green-800"
                : "bg-red-50 border-red-400 text-red-800"
            }
          `}
        >
          <div className="font-medium">
            {result.success ? "Success!" : "Error"}
          </div>
          <div className="text-sm mt-1">{result.message}</div>
          {result.success && result.count > 0 && (
            <div className="text-sm mt-2 opacity-75">
              {result.count} phones have been indexed for search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

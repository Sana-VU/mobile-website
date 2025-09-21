"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function PhonesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Phones page error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Something went wrong!
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          We encountered an error while loading the phones. This might be a
          temporary issue.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset} variant="default">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left max-w-2xl">
            <summary className="cursor-pointer font-medium mb-2">
              Error details (development only)
            </summary>
            <pre className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileQuestion className="h-24 w-24 text-neutral-400 mb-6" />
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild variant="default">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/phones">Browse Phones</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/brands">View Brands</Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Popular Pages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="text-left">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Browse
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    href="/phones"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    All Phones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/brands"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Phone Brands
                  </Link>
                </li>
                <li>
                  <Link
                    href="/compare"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Compare Phones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                Discover
              </h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Latest Articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-neutral-600 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Your Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

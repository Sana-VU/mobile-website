import { Metadata } from "next";
import Link from "next/link";
import { WifiOff, RefreshCw, Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Offline | WhatMobile",
  description: "You are currently offline. Some features may not be available.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <WifiOff className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            You&apos;re Offline
          </h1>
          <p className="text-gray-600">
            Check your internet connection and try again. Some cached content
            may still be available.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Home
            </Link>
            <Link
              href="/phones"
              className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Search className="w-5 h-5" />
              Search
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Available Offline:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Recently viewed phone pages</li>
            <li>• Cached search results</li>
            <li>• Browse previously visited brands</li>
            <li>• App navigation and interface</li>
          </ul>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          WhatMobile PWA • Version 1.0
        </div>
      </div>
    </div>
  );
}

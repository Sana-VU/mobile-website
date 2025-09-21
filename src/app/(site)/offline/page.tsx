import { Metadata } from "next";
import { Prose } from "@/components/ui/prose";
import { Button } from "@/components/ui/button";
import { WifiOff, Home } from "lucide-react";
import { RefreshButton } from "@/components/ui/refresh-button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Offline | WhatMobile",
  description:
    "You're currently offline. Check your internet connection to continue browsing mobile phones and reviews.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Offline Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6">
              <WifiOff className="h-12 w-12 text-neutral-400" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              You&apos;re Offline
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              It looks like you&apos;ve lost your internet connection. Check
              your network settings and try again.
            </p>
          </div>

          {/* Offline Content */}
          <div className="bg-card rounded-2xl p-8 mb-8 shadow-lg border border-border">
            <Prose className="text-left">
              <h2>What you can do:</h2>
              <ul>
                <li>
                  <strong>Check your internet connection:</strong> Make sure
                  your WiFi or mobile data is working
                </li>
                <li>
                  <strong>Try refreshing the page:</strong> Sometimes a simple
                  refresh can help
                </li>
                <li>
                  <strong>Browse cached content:</strong> Some previously
                  visited pages might still be available
                </li>
                <li>
                  <strong>Wait for connection:</strong> This page will
                  automatically update when you&apos;re back online
                </li>
              </ul>

              <h2>Why this happened:</h2>
              <p>
                This offline page appears when your device can&apos;t connect to
                our servers. This could be due to:
              </p>
              <ul>
                <li>Poor internet connection or network outage</li>
                <li>Server maintenance (rare, but it happens)</li>
                <li>Firewall or proxy blocking the connection</li>
                <li>Issues with your internet service provider</li>
              </ul>

              <h2>About WhatMobile Offline:</h2>
              <p>
                WhatMobile is designed to work best with an active internet
                connection to provide you with the latest phone prices, reviews,
                and availability. While some content might be cached for offline
                viewing, the full experience requires connectivity.
              </p>
            </Prose>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RefreshButton />
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-8"
                size="lg"
              >
                <Home className="h-5 w-5" />
                Go Home
              </Button>
            </Link>
          </div>

          {/* Network Status Indicator */}
          <div className="mt-12 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Network Status: Offline
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
              This page will automatically refresh when your connection is
              restored
            </p>
          </div>
        </div>
      </div>

      {/* Auto-refresh script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Auto-refresh when back online
            window.addEventListener('online', function() {
              window.location.reload();
            });
            
            // Periodic connectivity check
            setInterval(function() {
              fetch('/api/health', { method: 'HEAD' })
                .then(() => window.location.reload())
                .catch(() => {});
            }, 30000); // Check every 30 seconds
          `,
        }}
      />
    </div>
  );
}

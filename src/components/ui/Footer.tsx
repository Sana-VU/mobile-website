"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function Footer() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallHint, setShowInstallHint] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallHint(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallHint(false);
    }

    setDeferredPrompt(null);
  };

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-[#006A67] dark:border-zinc-600 dark:bg-[#004d4a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Explore Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/phones"
                  prefetch={false}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Phones
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  prefetch={false}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  prefetch={false}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Compare
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  prefetch={false}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  prefetch={false}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-white/80">
              © {new Date().getFullYear()} WhatMobile. All rights reserved.
            </p>

            {/* PWA Install Hint */}
            {showInstallHint && (
              <div className="flex items-center space-x-2">
                <p className="text-sm text-white/80">
                  Install our app for better experience
                </p>
                <button
                  onClick={handleInstallClick}
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors underline"
                >
                  Install
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

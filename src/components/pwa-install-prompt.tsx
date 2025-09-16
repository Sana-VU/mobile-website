"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Minimal typing for the beforeinstallprompt event shape
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={cn(
            "fixed inset-x-4 bottom-4 z-[70] rounded-2xl border border-border bg-surface/95 p-4 text-sm shadow-soft backdrop-blur",
            "md:inset-x-auto md:right-6 md:w-80"
          )}
          role="dialog"
          aria-labelledby="pwa-install-title"
        >
          <div className="flex flex-col gap-3">
            <div>
              <p
                id="pwa-install-title"
                className="text-base font-semibold text-foreground"
              >
                Install WhatMobile
              </p>
              <p className="text-sm text-muted-foreground">
                Get a faster, app-like experience on your device with offline
                support.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
              >
                Maybe later
              </Button>
              <Button size="sm" onClick={handleInstall}>
                Install app
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

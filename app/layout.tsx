import type { Metadata } from "next";
import React from "react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { inter, sora } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = siteConfig.defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, sora.variable, "bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100")}> 
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

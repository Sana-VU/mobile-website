"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

interface VendorPriceCardProps {
  vendorName: string;
  price: number;
  href?: string;
  highlight?: boolean;
  updatedAt?: string;
}

export function VendorPriceCard({
  vendorName,
  price,
  href,
  highlight = false,
  updatedAt,
}: VendorPriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-border/60 bg-surface/70 p-4 shadow-sm transition-all duration-soft ease-soft-spring",
        highlight && "border-primary/60 bg-primary/10 shadow-soft"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-text-strong">{vendorName}</span>
        <span className="text-lg font-semibold text-primary">
          {formatPrice(price)}
        </span>
      </div>
      {updatedAt && (
        <span className="text-xs text-text-subtle">
          Updated {updatedAt}
        </span>
      )}
      {href && (
        <Button asChild size="sm" variant={highlight ? "default" : "outline"}>
          <Link href={href}>Visit store</Link>
        </Button>
      )}
    </motion.div>
  );
}
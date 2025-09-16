"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PhoneCardProps {
  title: string;
  brand: string;
  href: string;
  fiveG?: boolean;
  highlight?: boolean;
  price?: string;
  vendorName?: string;
  specs: Array<{ label: string; value: string }>;
}

// Animated card used across listing and comparison flows
export function PhoneCard({
  title,
  brand,
  href,
  fiveG = false,
  highlight = false,
  price,
  vendorName,
  specs,
}: PhoneCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("h-full", highlight && "[&_.card-shell]:border-primary/60")}
    >
      <Card className="card-shell h-full overflow-hidden">
        <CardContent className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-text-subtle">
                {brand}
              </span>
              <Link
                href={href}
                className="text-2xl font-semibold text-text-strong transition-colors hover:text-primary"
              >
                {title}
              </Link>
              <p className="max-w-xs text-sm text-text-muted">
                Sleek design, flagship performance and battery built for modern life.
              </p>
            </div>
            {fiveG && (
              <Badge
                variant="secondary"
                className="absolute right-4 top-4 rounded-full bg-primary/15 text-primary"
              >
                5G Ready
              </Badge>
            )}
          </div>

          <dl className="grid grid-cols-2 gap-3 text-sm text-text-strong">
            {specs.map((spec) => (
              <div key={`${spec.label}-${spec.value}`} className="rounded-2xl bg-surface/80 px-3 py-2">
                <dt className="text-xs uppercase tracking-wide text-text-subtle">
                  {spec.label}
                </dt>
                <dd className="mt-1 font-semibold">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t border-border/60 pt-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              {price ?? "Check price"}
            </span>
            {vendorName && (
              <span className="text-xs text-text-subtle">from {vendorName}</span>
            )}
          </div>
          <Button asChild size="lg" className="w-full">
            <Link href={href}>View details</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  );
}
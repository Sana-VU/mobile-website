"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/layout/bottom-nav";

export function ClientBottomNav() {
  const pathname = usePathname();
  return <BottomNav pathname={pathname} />;
}

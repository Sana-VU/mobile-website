import React from "react";
import { Header } from "@/components/layout/header";
import { ClientBottomNav } from "@/components/layout/client-bottom-nav";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <ClientBottomNav />
    </div>
  );
}

import React from "react";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header and navigation are handled in root layout.tsx */}
      <main className="flex-1">{children}</main>
    </div>
  );
}

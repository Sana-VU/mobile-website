import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brands - WhatMobile",
  description: "Browse mobile phones by brand",
};

export default function BrandsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Mobile Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Brand list will be populated here */}
        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
          Samsung
        </div>
        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
          Apple
        </div>
        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
          Google
        </div>
        <div className="p-4 border rounded-lg hover:border-primary transition-colors">
          Xiaomi
        </div>
      </div>
    </div>
  );
}

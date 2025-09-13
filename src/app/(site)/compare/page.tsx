import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Phones - WhatMobile",
  description: "Compare specifications of multiple mobile phones side by side",
};

export default function ComparePage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Compare Phones</h1>
      <p className="mb-4 text-muted-foreground">
        Select phones to compare their specifications side by side
      </p>

      {/* Compare feature will be implemented here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg flex items-center justify-center h-40">
          <span className="text-muted-foreground">Select first phone</span>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-center h-40">
          <span className="text-muted-foreground">Select second phone</span>
        </div>
      </div>
    </div>
  );
}

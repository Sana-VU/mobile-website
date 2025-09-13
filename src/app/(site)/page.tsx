import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - WhatMobile",
  description: "Explore the latest mobile phones and compare specs",
};

export default function HomePage() {
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to WhatMobile</h1>
      <p className="text-lg text-muted-foreground">
        Your ultimate destination for mobile phone information and comparisons
      </p>
    </div>
  );
}
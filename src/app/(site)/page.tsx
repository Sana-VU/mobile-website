import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LucideGrid, GitCompare, LucideFileText, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WhatMobile - Pakistan's Premier Mobile Marketplace",
  description:
    "Discover, compare, and decide on your perfect mobile phone. Comprehensive reviews, real-time prices, and expert insights for the Pakistani market.",
  keywords: [
    "mobile phones Pakistan",
    "phone comparison",
    "mobile reviews",
    "smartphone prices",
    "PTA approved phones",
  ],
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-24">
      {/* Enhanced Hero Section with Premium Gradient */}
      <section className="w-full max-w-4xl text-center mb-12 relative">
        {/* Premium Blue to Violet Gradient Background */}
        <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent rounded-3xl"></div>

        <div className="relative px-8 py-12 md:py-16 text-white">
          {/* Hero Badge with Glass Morphism */}
          <div className="inline-flex items-center px-4 py-2 mb-6 glass-morphism text-sm text-white/90 backdrop-blur-xl">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Find Your Perfect Mobile
          </div>

          {/* Premium Hero Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            <span className="text-white">Discover.</span>{" "}
            <span className="text-white/90">Compare.</span>{" "}
            <span className="text-white">Decide.</span>
          </h1>

          {/* Hero Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for mobile phone reviews, comparisons, and
            buying guides. Make informed decisions with our comprehensive
            database.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="btn-primary text-lg font-semibold px-8 py-4 rounded-2xl min-w-[200px] group shadow-premium hover:shadow-2xl"
            >
              <Link href="/phones">
                <span className="flex items-center">
                  Browse Phones
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="btn-outline text-lg px-8 py-4 rounded-2xl min-w-[200px] bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              <Link href="/compare">Compare Phones</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Search Section */}
      <section className="w-full max-w-2xl mb-16">
        <div className="card-premium bg-background/95 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-premium">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-foreground">
              Quick Search
            </h2>
            <p className="text-muted-foreground text-center mt-2">
              Find your perfect device instantly
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Premium Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-5"></div>
              <input
                type="text"
                placeholder="Search mobiles, brands, features..."
                className="relative w-full bg-background/60 border border-border/40 h-12 px-4 rounded-xl text-base backdrop-blur-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-muted-foreground/60"
              />
            </div>
            {/* Premium Search Button */}
            <button className="btn-primary h-12 px-8 font-semibold tracking-wide flex items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
              <Search className="w-4 h-4" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Cards Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <Card icon="grid" title="Brands" href="/brands" />
        <Card icon="compare" title="Compare" href="/compare" />
        <Card icon="article" title="Latest Blog" href="/blog" />
      </section>
    </main>
  );
}

function Card({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) {
  const iconColors = {
    grid: "text-success",
    compare: "text-primary",
    article: "text-secondary",
  };

  const gradientBgs = {
    grid: "bg-gradient-to-br from-success/10 to-success/5",
    compare: "bg-gradient-to-br from-primary/10 to-primary/5",
    article: "bg-gradient-to-br from-secondary/10 to-secondary/5",
  };

  const icons: Record<string, React.ReactNode> = {
    grid: (
      <LucideGrid
        className={`w-8 h-8 ${iconColors.grid} transition-all duration-300 group-hover:scale-110`}
      />
    ),
    compare: (
      <GitCompare
        className={`w-8 h-8 ${iconColors.compare} transition-all duration-300 group-hover:scale-110`}
      />
    ),
    article: (
      <LucideFileText
        className={`w-8 h-8 ${iconColors.article} transition-all duration-300 group-hover:scale-110`}
      />
    ),
  };

  const descriptions = {
    Brands: "Explore top mobile brands",
    Compare: "Side-by-side phone comparison",
    "Latest Blog": "Latest reviews & insights",
  };

  return (
    <Link
      href={href}
      className={`card-premium group overflow-hidden rounded-3xl border border-border/30 shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${gradientBgs[icon as keyof typeof gradientBgs]}`}
    >
      {/* Premium Card Content */}
      <div className="relative p-8 flex flex-col items-center justify-center text-center min-h-[180px] backdrop-blur-sm">
        {/* Premium Icon Container */}
        <div className="mb-6 p-4 rounded-2xl bg-background/80 shadow-premium group-hover:shadow-xl transition-all duration-300 border border-border/20">
          {icons[icon]}
        </div>

        {/* Premium Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 tracking-tight">
          {title}
        </h3>

        {/* Premium Description */}
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
          {descriptions[title as keyof typeof descriptions]}
        </p>

        {/* Premium Hover Arrow */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Premium Accent Border */}
      <div
        className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          icon === "grid"
            ? "ring-2 ring-success/30"
            : icon === "compare"
              ? "ring-2 ring-primary/30"
              : "ring-2 ring-secondary/30"
        }`}
      ></div>
    </Link>
  );
}

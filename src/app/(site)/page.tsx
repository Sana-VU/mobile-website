import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { LucideGrid, GitCompare, LucideFileText } from "lucide-react";
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
      {/* Enhanced Hero Section */}
      <section className="w-full max-w-4xl text-center mb-12 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-50/30 to-violet-50/20 dark:from-primary/10 dark:via-blue-950/30 dark:to-violet-950/20 rounded-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent rounded-3xl"></div>

        <div className="relative px-8 py-12 md:py-16">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-accent/50 border border-border/30 rounded-full text-sm text-accent-foreground backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
            Find Your Perfect Mobile
          </div>

          {/* Hero Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Discover.
            </span>{" "}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-violet-500 bg-clip-text text-transparent">
              Compare.
            </span>{" "}
            <span className="bg-gradient-to-r from-violet-500 via-primary to-foreground bg-clip-text text-transparent">
              Decide.
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your ultimate destination for mobile phone reviews, comparisons, and
            buying guides. Make informed decisions with our comprehensive
            database.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-semibold rounded-2xl group min-w-[200px]"
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
              className="border-2 hover:bg-accent/50 transition-all duration-300 px-8 py-4 text-lg rounded-2xl min-w-[200px]"
            >
              <Link href="/compare">Compare Phones</Link>
            </Button>
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
    grid: "text-emerald-500",
    compare: "text-primary",
    article: "text-violet-500",
  };

  const backgroundGradients = {
    grid: "from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20",
    compare:
      "from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20",
    article:
      "from-violet-50 to-violet-100/50 dark:from-violet-950/30 dark:to-violet-900/20",
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
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${backgroundGradients[icon as keyof typeof backgroundGradients]} border border-border/40 shadow-soft hover:shadow-soft-hover transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Card Content */}
      <div className="relative p-8 flex flex-col items-center justify-center text-center min-h-[160px] backdrop-blur-sm">
        {/* Icon Container */}
        <div className="mb-4 p-3 rounded-2xl bg-background/60 shadow-sm group-hover:shadow-md transition-all duration-300">
          {icons[icon]}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-200">
          {descriptions[title as keyof typeof descriptions]}
        </p>

        {/* Hover Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <svg
            className="w-5 h-5 text-primary"
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

      {/* Subtle bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          icon === "grid"
            ? "from-emerald-400 to-emerald-600"
            : icon === "compare"
              ? "from-primary to-blue-600"
              : "from-violet-400 to-violet-600"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>
    </Link>
  );
}

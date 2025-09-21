import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About WhatMobile | Pakistan's Premier Mobile Marketplace",
  description:
    "Learn about WhatMobile - Pakistan's most trusted mobile phone marketplace with comprehensive reviews, price comparisons, and expert insights.",
  keywords: [
    "about whatmobile",
    "mobile marketplace Pakistan",
    "phone reviews",
    "company info",
  ],
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center">
            <span className="text-2xl text-white font-bold">W</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            About WhatMobile
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Pakistan&apos;s most trusted mobile marketplace, providing
          comprehensive reviews, real-time price comparisons, and expert
          insights to help you make informed decisions.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To empower Pakistani consumers with accurate, up-to-date mobile
            phone information, helping them find the perfect device at the best
            price across all major vendors.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">🌟</span>
          </div>
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">
            Our Vision
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To become Pakistan&apos;s go-to platform for mobile device research,
            comparison, and purchasing decisions, setting the standard for
            transparency and user experience.
          </p>
        </div>
      </div>

      {/* What We Do */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Comprehensive Reviews
            </h3>
            <p className="text-muted-foreground">
              Detailed specifications, expert reviews, and real user feedback
              for every device.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Price Tracking
            </h3>
            <p className="text-muted-foreground">
              Real-time price monitoring across all major Pakistani retailers
              and online stores.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Smart Comparison
            </h3>
            <p className="text-muted-foreground">
              Side-by-side comparisons to help you find the perfect device for
              your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Why Choose WhatMobile?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Local Market Focus
              </h3>
              <p className="text-muted-foreground">
                Specialized knowledge of Pakistani market, including PTA
                regulations and local vendor networks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Real-Time Data
              </h3>
              <p className="text-muted-foreground">
                Live price updates, availability status, and the latest device
                launches.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Expert Reviews
              </h3>
              <p className="text-muted-foreground">
                Professional insights from tech experts and real user
                experiences.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-primary text-lg">✓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                User-Friendly
              </h3>
              <p className="text-muted-foreground">
                Clean, mobile-optimized interface designed for Pakistani users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Built with Pakistani Users in Mind
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Our team understands the unique challenges of the Pakistani mobile
          market - from PTA regulations to local vendor preferences. We&apos;ve
          built WhatMobile to address these specific needs and provide the most
          relevant information for Pakistani consumers.
        </p>
      </div>

      {/* Contact CTA */}
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <h2 className="text-2xl font-bold text-card-foreground mb-4">
          Have Questions?
        </h2>
        <p className="text-muted-foreground mb-6">
          We&apos;d love to hear from you. Get in touch with our team for any
          queries or suggestions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
            <span>→</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-xl font-medium hover:bg-muted/80 transition-colors"
          >
            Read Our Blog
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

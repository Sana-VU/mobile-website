import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact WhatMobile | Get in Touch",
  description:
    "Contact WhatMobile team for support, suggestions, or business inquiries. We're here to help you with all your mobile phone needs.",
  keywords: [
    "contact whatmobile",
    "customer support",
    "mobile phone help",
    "business inquiries",
  ],
};

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-white">📞</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Have questions, suggestions, or need support? We&apos;d love to hear
          from you. Get in touch with our team and we&apos;ll get back to you as
          soon as possible.
        </p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-primary">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            General Support
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Questions about phones, features, or technical issues
          </p>
          <a
            href="mailto:support@whatmobile.pk"
            className="text-primary font-medium hover:underline"
          >
            support@whatmobile.pk
          </a>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-600">🤝</span>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Business Inquiries
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Partnerships, advertising, or business opportunities
          </p>
          <a
            href="mailto:business@whatmobile.pk"
            className="text-primary font-medium hover:underline"
          >
            business@whatmobile.pk
          </a>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-purple-600">✍️</span>
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Editorial Team
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Press releases, review requests, or content collaboration
          </p>
          <a
            href="mailto:editorial@whatmobile.pk"
            className="text-primary font-medium hover:underline"
          >
            editorial@whatmobile.pk
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-6">
            Send us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
              >
                <option value="">Select a subject</option>
                <option value="general">General Support</option>
                <option value="technical">Technical Issue</option>
                <option value="business">Business Inquiry</option>
                <option value="editorial">Editorial/Press</option>
                <option value="feedback">Feedback/Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground resize-vertical"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Send Message
            </button>

            <p className="text-sm text-muted-foreground">
              We typically respond within 24 hours during business days.
            </p>
          </form>
        </div>

        {/* Contact Info & FAQ */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Quick Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🕒</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Response Time</p>
                  <p className="text-sm text-muted-foreground">
                    Within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">🌍</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">
                    Karachi, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary text-sm">📱</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Platform</p>
                  <p className="text-sm text-muted-foreground">
                    Mobile-first website
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  How accurate are your prices?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our prices are updated regularly from official vendor sources.
                  However, final prices may vary. Always confirm with the
                  retailer.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-1">
                  Can I buy phones directly from WhatMobile?
                </h4>
                <p className="text-sm text-muted-foreground">
                  We don&apos;t sell phones directly. We help you compare and
                  find the best deals from trusted Pakistani retailers.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-1">
                  How do I submit a phone for review?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Contact our editorial team at editorial@whatmobile.pk with
                  device information and availability details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

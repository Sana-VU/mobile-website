import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WhatMobile",
  description:
    "Read WhatMobile's privacy policy to understand how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "data protection", "user privacy", "whatmobile"],
};

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-white">🔒</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: September 18, 2025
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 prose prose-zinc dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to WhatMobile (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;). This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website
            and use our services.
          </p>
          <p>
            We are committed to protecting your privacy and ensuring the
            security of your personal information. This policy applies to all
            users of our platform.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide to Us</h3>
          <ul>
            <li>
              Contact information (name, email address) when you contact us
            </li>
            <li>Feedback and comments you submit through our contact forms</li>
            <li>Newsletter subscription information</li>
          </ul>

          <h3>2.2 Information We Collect Automatically</h3>
          <ul>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Website usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h3>2.3 Wishlist and Preferences</h3>
          <ul>
            <li>
              Phones added to your wishlist (stored locally on your device)
            </li>
            <li>Search history and preferences</li>
            <li>App settings and customizations</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>
              Send you updates about new features or content (with your consent)
            </li>
            <li>Analyze usage patterns to improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information in the following
            circumstances:
          </p>
          <ul>
            <li>
              <strong>With Your Consent:</strong> When you explicitly agree to
              share information
            </li>
            <li>
              <strong>Service Providers:</strong> With trusted third-party
              service providers who assist us in operating our website
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to
              protect our rights
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of assets
            </li>
          </ul>

          <h2>5. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational security
            measures to protect your personal information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>
          <ul>
            <li>Data encryption in transit and at rest</li>
            <li>Regular security assessments and updates</li>
            <li>Limited access to personal information</li>
            <li>Secure data centers and hosting providers</li>
          </ul>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Improve our services and user experience</li>
            <li>Store your wishlist locally on your device</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences.
            Note that disabling cookies may affect some functionality of our
            website.
          </p>

          <h2>7. Your Rights and Choices</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request access to your personal
              information
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal
              information
            </li>
            <li>
              <strong>Portability:</strong> Request a copy of your data in a
              portable format
            </li>
            <li>
              <strong>Opt-out:</strong> Opt out of marketing communications
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@whatmobile.pk
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            Our services are not directed to children under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>

          <h2>9. International Data Transfers</h2>
          <p>
            Our services are primarily designed for users in Pakistan. If you
            access our services from outside Pakistan, your information may be
            transferred to and processed in Pakistan or other countries where
            our service providers operate.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new Privacy Policy on
            this page and updating the &quot;last updated&quot; date.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we are protecting your information.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul>
            <li>Email: privacy@whatmobile.pk</li>
            <li>General inquiries: support@whatmobile.pk</li>
          </ul>

          <div className="bg-muted rounded-xl p-6 mt-8">
            <h3 className="text-foreground mb-2">Pakistan Data Protection</h3>
            <p className="text-muted-foreground text-sm">
              We are committed to complying with Pakistan&apos;s data protection
              laws and regulations. Our practices align with international
              standards for data privacy and security while respecting local
              requirements and cultural considerations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

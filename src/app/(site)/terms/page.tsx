import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WhatMobile",
  description:
    "Read WhatMobile's terms of service to understand the rules and guidelines for using our platform.",
  keywords: [
    "terms of service",
    "user agreement",
    "terms and conditions",
    "whatmobile",
  ],
};

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl text-white">📋</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: September 18, 2025
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 prose prose-zinc dark:prose-invert max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using WhatMobile (&quot;the Service&quot;,
            &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you accept and
            agree to be bound by the terms and provision of this agreement. If
            you do not agree to abide by the above, please do not use this
            service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            WhatMobile is a mobile phone information and comparison platform
            that provides:
          </p>
          <ul>
            <li>Mobile phone specifications, reviews, and information</li>
            <li>Price comparison across different vendors and retailers</li>
            <li>Brand information and device comparison tools</li>
            <li>Blog content and technical articles</li>
            <li>Wishlist functionality for saving favorite devices</li>
            <li>PTA tax calculation and customs duty information</li>
          </ul>

          <h2>3. User Responsibilities</h2>

          <h3>3.1 Acceptable Use</h3>
          <p>
            You agree to use the Service only for lawful purposes and in
            accordance with these Terms. You agree NOT to:
          </p>
          <ul>
            <li>
              Use the Service for any unlawful purpose or to solicit unlawful
              activity
            </li>
            <li>Attempt to gain unauthorized access to our systems or data</li>
            <li>
              Interfere with or disrupt the Service or servers connected to the
              Service
            </li>
            <li>
              Use automated systems (bots, scrapers) without our written
              permission
            </li>
            <li>Submit false, misleading, or inaccurate information</li>
            <li>
              Violate any applicable local, state, national, or international
              law
            </li>
          </ul>

          <h3>3.2 Account Security</h3>
          <p>
            While we don&apos;t currently require user accounts, any information
            you provide (such as through contact forms) should be accurate and
            up-to-date.
          </p>

          <h2>4. Intellectual Property Rights</h2>

          <h3>4.1 Our Content</h3>
          <p>
            The Service and its original content, features, and functionality
            are and will remain the exclusive property of WhatMobile and its
            licensors. The Service is protected by copyright, trademark, and
            other laws.
          </p>

          <h3>4.2 User Content</h3>
          <p>
            By submitting content to us (such as through contact forms or
            feedback), you grant us a non-exclusive, worldwide, royalty-free
            license to use, reproduce, modify, and display such content in
            connection with the Service.
          </p>

          <h2>5. Disclaimers and Limitations</h2>

          <h3>5.1 Information Accuracy</h3>
          <p>
            While we strive to provide accurate and up-to-date information about
            mobile phones, specifications, and prices:
          </p>
          <ul>
            <li>Information may become outdated or inaccurate</li>
            <li>Prices may vary and should be confirmed with retailers</li>
            <li>We are not responsible for errors in third-party data</li>
            <li>Product availability may change without notice</li>
          </ul>

          <h3>5.2 Third-Party Links and Services</h3>
          <p>
            Our Service may contain links to third-party websites or services.
            We are not responsible for:
          </p>
          <ul>
            <li>The content or practices of third-party websites</li>
            <li>Transactions conducted on external sites</li>
            <li>The privacy policies of third-party services</li>
            <li>Products or services offered by third parties</li>
          </ul>

          <h3>5.3 PTA Tax Information</h3>
          <p>
            Our PTA tax calculator provides estimates based on available
            information. However:
          </p>
          <ul>
            <li>Tax rates and regulations may change</li>
            <li>Actual duties may vary based on specific circumstances</li>
            <li>You should verify current rates with official sources</li>
            <li>We are not responsible for tax calculation accuracy</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, WhatMobile shall
            not be liable for any indirect, incidental, special, consequential,
            or punitive damages, including without limitation, loss of profits,
            data, use, goodwill, or other intangible losses.
          </p>

          <h2>7. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy,
            which also governs your use of the Service, to understand our
            practices.
          </p>

          <h2>8. Modifications to Service</h2>
          <p>
            We reserve the right to modify or discontinue, temporarily or
            permanently, the Service (or any part thereof) with or without
            notice at any time. You agree that we shall not be liable to you or
            any third party for any modification, suspension, or discontinuance
            of the Service.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your access immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be interpreted and governed by the laws of
            Pakistan. Any disputes relating to these Terms shall be subject to
            the exclusive jurisdiction of the courts of Pakistan.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days notice prior to any new terms taking
            effect.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us:
          </p>
          <ul>
            <li>Email: legal@whatmobile.pk</li>
            <li>General inquiries: support@whatmobile.pk</li>
          </ul>

          <div className="bg-muted rounded-xl p-6 mt-8">
            <h3 className="text-foreground mb-2">Pakistani Legal Compliance</h3>
            <p className="text-muted-foreground text-sm">
              WhatMobile operates in compliance with Pakistani laws and
              regulations, including but not limited to the Electronic
              Transactions Ordinance and applicable consumer protection laws. We
              are committed to supporting the Pakistani technology ecosystem
              while maintaining the highest standards of service.
            </p>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 mt-6">
            <h3 className="text-primary mb-2">Questions or Concerns?</h3>
            <p className="text-muted-foreground text-sm">
              If you have any questions about these Terms of Service or need
              clarification on any point, please don&apos;t hesitate to contact
              our support team. We&apos;re here to help ensure you have the best
              possible experience with WhatMobile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

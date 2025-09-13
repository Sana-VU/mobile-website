import { DefaultSeoProps } from "next-seo";

// Default SEO configuration
const config: DefaultSeoProps = {
  defaultTitle: "WhatMobile - Mobile Phone Comparison and Specifications",
  titleTemplate: "%s | WhatMobile",
  description:
    "Compare mobile phones, view detailed specifications, and find the perfect smartphone for your needs.",
  canonical: "https://whatmobile.example.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://whatmobile.example.com",
    siteName: "WhatMobile",
    title: "WhatMobile - Mobile Phone Comparison and Specifications",
    description:
      "Compare mobile phones, view detailed specifications, and find the perfect smartphone for your needs.",
    images: [
      {
        url: "https://whatmobile.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WhatMobile",
      },
    ],
  },
  twitter: {
    handle: "@whatmobile",
    site: "@whatmobile",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "theme-color",
      content: "#FFFFFF",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
};

export default config;

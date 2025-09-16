const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  swSrc: "public/custom-sw.js",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/(.*)/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^\/$/, // Shell
      handler: "NetworkFirst",
      options: { cacheName: "shell" },
    },
    {
      urlPattern: /^\/phones\/(.*)/, // Phone pages
      handler: "NetworkFirst",
      options: {
        cacheName: "phone-pages",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
      },
    },
  ],
  fallback: {
    document: "/offline.html",
  },
});

module.exports = withPWA({
  // ...other Next.js config
});

// Custom service worker for WhatMobile
// This extends the next-pwa generated service worker with custom functionality

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { BackgroundSyncPlugin } from "workbox-background-sync";

// Clean up old caches
cleanupOutdatedCaches();

// Precache and route static assets
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache API Routes
registerRoute(
  /^https:\/\/localhost:3000\/api\/search/,
  new NetworkFirst({
    cacheName: "search-api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 5, // 5 minutes
      }),
    ],
  })
);

// Cache phone detail pages (last 20 visited)
registerRoute(
  /\/phones\/[^\/]+$/,
  new StaleWhileRevalidate({
    cacheName: "phone-pages-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20, // Keep last 20 phone pages
        maxAgeSeconds: 60 * 60 * 24, // 24 hours
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Cache brand pages
registerRoute(
  /\/brands\/[^\/]+$/,
  new StaleWhileRevalidate({
    cacheName: "brand-pages-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 12, // 12 hours
      }),
    ],
  })
);

// Cache images with long expiration
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Cache static resources
registerRoute(
  ({ request }) =>
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "worker",
  new CacheFirst({
    cacheName: "static-resources",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
      }),
    ],
  })
);

// Background sync for analytics and user actions
const backgroundSync = new BackgroundSyncPlugin("user-actions-queue", {
  maxRetentionTime: 24 * 60, // 24 hours in minutes
});

// Handle offline fallback for navigation requests
const navigationHandler = new NetworkFirst({
  cacheName: "navigations",
  plugins: [
    new ExpirationPlugin({
      maxEntries: 20,
      maxAgeSeconds: 60 * 60 * 24, // 24 hours
    }),
  ],
});

const navigationRoute = new NavigationRoute(navigationHandler, {
  denylist: [/^\/_/, /\/api\//, /\/admin/],
});

registerRoute(navigationRoute);

// Listen for messages from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CACHE_PHONE_PAGE") {
    const { url } = event.data;
    // Cache the phone page immediately
    caches.open("phone-pages-cache").then((cache) => {
      cache.add(url);
    });
  }

  if (event.data && event.data.type === "GET_CACHE_INFO") {
    getCacheInfo().then((info) => {
      event.ports[0].postMessage(info);
    });
  }
});

// Get cache information for PWA status
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {
    caches: cacheNames.length,
    phonePages: 0,
    totalSize: 0,
  };

  try {
    const phonePagesCache = await caches.open("phone-pages-cache");
    const keys = await phonePagesCache.keys();
    info.phonePages = keys.length;
  } catch (error) {
    console.warn("Error getting cache info:", error);
  }

  return info;
}

// Handle install event
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Handle activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

// Handle fetch events for offline support
self.addEventListener("fetch", (event) => {
  // Add any custom fetch handling here
  if (event.request.method !== "GET") return;

  // Handle offline fallback
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline") || caches.match("/");
      })
    );
  }
});

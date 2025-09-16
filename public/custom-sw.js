import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";

// Precache shell and fonts
precacheAndRoute(self.__WB_MANIFEST);

// Custom: Track last 20 visited phone pages
let phoneHistory = [];
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/phones/")) {
    phoneHistory = [
      url.pathname,
      ...phoneHistory.filter((p) => p !== url.pathname),
    ].slice(0, 20);
  }
});

// Offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      if (event.request.mode === "navigate") {
        return caches.match("/offline.html");
      }
    })
  );
});

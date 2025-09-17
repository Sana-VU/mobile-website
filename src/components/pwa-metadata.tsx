"use client";

import { useEffect } from "react";

export function PwaMetadata() {
  useEffect(() => {
    // Dynamically add PWA meta tags
    const head = document.getElementsByTagName("head")[0];

    const metaTags = [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, user-scalable=no",
      },
      { name: "theme-color", content: "#3b82f6" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "WhatMobile" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "msapplication-TileColor", content: "#3b82f6" },
      { name: "msapplication-tap-highlight", content: "no" },
    ];

    const linkTags = [
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      {
        rel: "icon",
        href: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        href: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/icon-180x180.png",
        sizes: "180x180",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/icon-152x152.png",
        sizes: "152x152",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/icon-144x144.png",
        sizes: "144x144",
      },
      {
        rel: "apple-touch-icon",
        href: "/icons/icon-128x128.png",
        sizes: "128x128",
      },
    ];

    // Add meta tags
    metaTags.forEach((tag) => {
      const existing = head.querySelector(`meta[name="${tag.name}"]`);
      if (!existing) {
        const metaElement = document.createElement("meta");
        metaElement.name = tag.name;
        metaElement.content = tag.content;
        head.appendChild(metaElement);
      }
    });

    // Add link tags
    linkTags.forEach((tag) => {
      const existing = head.querySelector(
        `link[rel="${tag.rel}"][href="${tag.href}"]`
      );
      if (!existing) {
        const linkElement = document.createElement("link");
        Object.entries(tag).forEach(([key, value]) => {
          linkElement.setAttribute(key, value);
        });
        head.appendChild(linkElement);
      }
    });
  }, []);

  return null;
}

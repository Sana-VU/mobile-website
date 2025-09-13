/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://whatmobile.example.com",
  generateRobotsTxt: true, // Generate robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://whatmobile.example.com/server-sitemap.xml", // Optional: for dynamic routes
    ],
  },
  exclude: ["/admin", "/admin/*"], // Exclude admin routes from sitemap
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  // Set to true if you want to add trailing slash to the URLs
  trailingSlash: false,
};

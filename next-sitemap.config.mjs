export default {
  siteUrl: process.env.NEXTAUTH_URL || "https://pakjobs.example.com",
  generateRobotsTxt: true,
  exclude: ["/admin/*", "/auth/*", "/api/*"],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7,
      lastmod: new Date().toISOString()
    };
  }
};

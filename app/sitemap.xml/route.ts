import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import Company from "@/models/Company";
import { siteConfig } from "@/lib/seo";

const staticRoutes = ["", "/jobs", "/companies", "/about", "/contact"];

export async function GET() {
  await connectDB();
  const [jobs, companies] = await Promise.all([
    Job.find({ status: "published" }).select("slug postedAt updatedAt createdAt").lean(),
    Company.find().select("slug createdAt updatedAt").lean()
  ]);

  const urls = [
    ...staticRoutes.map((route) => ({ url: `${siteConfig.url}${route}`, lastMod: new Date().toISOString() })),
    ...jobs.map((job) => ({ url: `${siteConfig.url}/jobs/${job.slug}`, lastMod: new Date(job.updatedAt ?? job.postedAt ?? job.createdAt ?? Date.now()).toISOString() })),
    ...companies.map((company) => ({ url: `${siteConfig.url}/companies/${company.slug}`, lastMod: new Date(company.updatedAt ?? company.createdAt ?? Date.now()).toISOString() }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
      .map(
        (entry) => `
      <url>
        <loc>${entry.url}</loc>
        <lastmod>${entry.lastMod}</lastmod>
      </url>`
      )
      .join("\n")}
  </urlset>`;

  return new NextResponse(body, {
    headers: { "Content-Type": "application/xml" }
  });
}

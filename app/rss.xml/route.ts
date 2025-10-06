import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { siteConfig } from "@/lib/seo";

export async function GET() {
  await connectDB();
  const jobs = await Job.find({ status: "published" }).sort({ postedAt: -1 }).limit(20).lean();

  const items = jobs
    .map((job) => {
      const url = `${siteConfig.url}/jobs/${job.slug}`;
      return `
        <item>
          <title><![CDATA[${job.title}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(job.postedAt ?? Date.now()).toUTCString()}</pubDate>
          <description><![CDATA[${(job.description ?? "").slice(0, 280)}]]></description>
        </item>
      `;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>PakJobs – Latest Opportunities</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
}

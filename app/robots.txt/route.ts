import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo";

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: ${siteConfig.url}/sitemap.xml`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain" }
  });
}

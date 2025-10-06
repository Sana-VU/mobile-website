import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import Job from "@/models/Job";
import { jobSchema } from "@/lib/validators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { parse } from "csv-parse/sync";
import { slugify } from "@/lib/utils";
import { checkRateLimit } from "@/lib/rate-limit";

const headers = [
  "title",
  "company",
  "type",
  "categories",
  "location.city",
  "location.region",
  "location.country",
  "remote",
  "postedAt",
  "expiresAt",
  "tags",
  "featured",
  "source.name",
  "source.url",
  "source.publishedOn",
  "applyUrl",
  "applyEmail",
  "description"
];

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`jobs-import:${identifier}`, 5, 5 * 60_000)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  const text = await request.text();
  await connectDB();
  const records = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const results: Array<{ row: number; status: "success" | "error"; message?: string }> = [];

  for (let index = 0; index < records.length; index++) {
    const row = records[index];
    try {
      const missingHeader = headers.find((header) => !(header in row));
      if (missingHeader) {
        throw new Error(`Missing column ${missingHeader}`);
      }
      const companyName = row["company"] as string;
      const companySlug = slugify(companyName);
      const company = await Company.findOneAndUpdate(
        { slug: companySlug },
        { name: companyName, slug: companySlug },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      const payload = {
        title: row["title"],
        slug: slugify(row["title"]),
        company: company._id.toString(),
        type: row["type"],
        categories: String(row["categories"] ?? "")
          .split("|")
          .filter(Boolean),
        location: {
          city: row["location.city"] || undefined,
          region: row["location.region"] || undefined,
          country: row["location.country"] || undefined,
          remote: String(row["remote"]).toLowerCase() === "true"
        },
        postedAt: row["postedAt"] ? new Date(row["postedAt"]) : new Date(),
        expiresAt: row["expiresAt"] ? new Date(row["expiresAt"]) : undefined,
        tags: String(row["tags"] ?? "")
          .split("|")
          .filter(Boolean),
        featured: String(row["featured"]).toLowerCase() === "true",
        source: {
          name: row["source.name"],
          url: row["source.url"] || undefined,
          publishedOn: row["source.publishedOn"] ? new Date(row["source.publishedOn"]) : undefined
        },
        applyUrl: row["applyUrl"] || undefined,
        applyEmail: row["applyEmail"] || undefined,
        description: row["description"],
        status: "draft"
      } as any;

      const parsed = jobSchema.safeParse({ ...payload, location: payload.location, source: payload.source });
      if (!parsed.success) {
        throw new Error(parsed.error.message);
      }
      await Job.create(parsed.data);
      results.push({ row: index + 1, status: "success" });
    } catch (error: any) {
      results.push({ row: index + 1, status: "error", message: error.message });
    }
  }

  return NextResponse.json({ results });
}

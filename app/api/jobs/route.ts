import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import Company from "@/models/Company";
import { jobSchema } from "@/lib/validators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  await connectDB();
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const type = url.searchParams.get("type");
  const categories = url.searchParams.getAll("category");
  const remoteOnly = url.searchParams.get("remoteOnly") === "true";
  const postedWithin = url.searchParams.get("postedWithin");
  const sourceName = url.searchParams.get("source.name");
  const page = Number(url.searchParams.get("page") ?? "1");
  const limit = Number(url.searchParams.get("limit") ?? "12");
  const sort = url.searchParams.get("sort") === "featured" ? { featured: -1, postedAt: -1 } : { postedAt: -1 };

  const query: any = {};
  const status = url.searchParams.get("status") ?? "published";
  if (status) {
    query.status = status;
  }
  if (q) query.$text = { $search: q };
  if (type) query.type = type;
  if (categories.length > 0) query.categories = { $in: categories };
  if (remoteOnly) query["location.remote"] = true;
  if (postedWithin) {
    const cutoff = new Date(Date.now() - Number(postedWithin) * 24 * 60 * 60 * 1000);
    query.postedAt = { $gte: cutoff };
  }
  if (sourceName) query["source.name"] = sourceName;

  const skip = (page - 1) * limit;

  const jobs = await Job.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("company")
    .lean();
  const total = await Job.countDocuments(query);

  return NextResponse.json({ jobs, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`jobs-post:${identifier}`)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  await connectDB();
  const body = await request.json();
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }
  const jobData = parsed.data;
  const company = await Company.findById(jobData.company);
  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }
  const job = await Job.create(jobData);
  return NextResponse.json(job, { status: 201 });
}

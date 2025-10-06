import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import { companySchema } from "@/lib/validators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET() {
  await connectDB();
  const companies = await Company.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(companies);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`companies-post:${identifier}`)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  await connectDB();
  const body = await request.json();
  const parsed = companySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }
  const company = await Company.create(parsed.data);
  return NextResponse.json(company, { status: 201 });
}

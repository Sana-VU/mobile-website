import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import { jobSchema } from "@/lib/validators";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const job = await Job.findById(params.id).populate("company").lean();
  if (!job) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.json(job);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`jobs-patch:${identifier}`)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  await connectDB();
  const body = await request.json();
  const parsed = jobSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }
  const job = await Job.findByIdAndUpdate(params.id, parsed.data, { new: true });
  if (!job) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.json(job);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const identifier = request.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(`jobs-delete:${identifier}`)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  await connectDB();
  await Job.findByIdAndDelete(params.id);
  return new NextResponse(null, { status: 204 });
}

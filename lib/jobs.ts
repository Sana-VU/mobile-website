import { connectDB } from "@/lib/db";
import Job from "@/models/Job";
import Company from "@/models/Company";
import type { FilterQuery } from "mongoose";

interface JobFilters {
  q?: string;
  type?: string;
  category?: string[];
  remoteOnly?: boolean;
  postedWithin?: number;
  sourceName?: string;
  page?: number;
  limit?: number;
  sort?: "newest" | "featured";
}

export async function fetchJobs(filters: JobFilters = {}) {
  await connectDB();
  const {
    q,
    type,
    category = [],
    remoteOnly,
    postedWithin,
    sourceName,
    page = 1,
    limit = 12,
    sort = "newest"
  } = filters;

  const query: FilterQuery<typeof Job> = { status: "published" };
  if (q) {
    query.$text = { $search: q };
  }
  if (type) {
    query.type = type;
  }
  if (category.length > 0) {
    query.categories = { $in: category };
  }
  if (remoteOnly) {
    query["location.remote"] = true;
  }
  if (postedWithin) {
    const now = new Date();
    const cutoff = new Date(now.getTime() - postedWithin * 24 * 60 * 60 * 1000);
    query.postedAt = { $gte: cutoff };
  }
  if (sourceName) {
    query["source.name"] = sourceName;
  }

  const skip = (page - 1) * limit;

  const jobsQuery = Job.find(query)
    .sort(sort === "featured" ? { featured: -1, postedAt: -1 } : { postedAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("company")
    .lean();

  const [jobs, total] = await Promise.all([jobsQuery, Job.countDocuments(query)]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
}

export async function fetchJobBySlug(slug: string) {
  await connectDB();
  const job = await Job.findOne({ slug }).populate("company").lean();
  return job;
}

export async function fetchFeaturedJobs(limit = 6) {
  await connectDB();
  return Job.find({ status: "published", featured: true })
    .sort({ postedAt: -1 })
    .limit(limit)
    .populate("company")
    .lean();
}

export async function fetchRecentByCategory(limit = 6) {
  await connectDB();
  const categories = ["Govt", "IT", "Education", "Healthcare"];
  const results = await Promise.all(
    categories.map(async (category) => {
      const jobs = await Job.find({ status: "published", categories: category })
        .sort({ postedAt: -1 })
        .limit(limit)
        .populate("company")
        .lean();
      return { category, jobs };
    })
  );
  return results;
}

export async function fetchJobsByCompany(companyId: string) {
  await connectDB();
  return Job.find({ status: "published", company: companyId }).sort({ postedAt: -1 }).populate("company").lean();
}

export async function fetchCompanies() {
  await connectDB();
  return Company.find().sort({ createdAt: -1 }).lean();
}

export async function fetchCompanyBySlug(slug: string) {
  await connectDB();
  return Company.findOne({ slug }).lean();
}

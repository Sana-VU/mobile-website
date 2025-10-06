import { Schema, model, models, type Document, Types } from "mongoose";
import type { CompanyDocument } from "@/models/Company";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    location: {
      city: String,
      region: String,
      country: String,
      remote: { type: Boolean, default: false }
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
      required: true
    },
    categories: [{ type: String }],
    salary: {
      min: Number,
      max: Number,
      currency: { type: String, enum: ["PKR", "USD"], default: "PKR" },
      period: { type: String, enum: ["month", "year"], default: "month" }
    },
    applyUrl: String,
    applyEmail: String,
    description: { type: String, required: true },
    requirements: [String],
    benefits: [String],
    experienceLevel: { type: String, enum: ["Junior", "Mid", "Senior"] },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
    postedAt: { type: Date, required: true },
    expiresAt: Date,
    source: {
      name: { type: String, required: true },
      url: String,
      publishedOn: Date
    },
    seo: {
      title: String,
      description: String,
      image: String
    },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "jobs",
    timestamps: false
  }
);

JobSchema.index({ status: 1, postedAt: -1 });
JobSchema.index({ featured: 1, postedAt: -1 });
JobSchema.index({ title: "text", tags: "text" });

export type JobDocument = Document & {
  title: string;
  slug: string;
  company: Types.ObjectId | CompanyDocument;
  location: {
    city?: string;
    region?: string;
    country?: string;
    remote: boolean;
  };
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote";
  categories: string[];
  salary?: {
    min?: number;
    max?: number;
    currency: "PKR" | "USD";
    period: "month" | "year";
  };
  applyUrl?: string;
  applyEmail?: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  experienceLevel?: "Junior" | "Mid" | "Senior";
  tags: string[];
  featured: boolean;
  status: "draft" | "published" | "archived";
  postedAt: Date;
  expiresAt?: Date;
  source: {
    name: string;
    url?: string;
    publishedOn?: Date;
  };
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  createdAt: Date;
};

const Job = models.Job || model<JobDocument>("Job", JobSchema);

export default Job;

import { z } from "zod";

export const locationSchema = z.object({
  city: z.string().trim().optional(),
  region: z.string().trim().optional(),
  country: z.string().trim().optional(),
  remote: z.coerce.boolean().default(false)
});

export const salarySchema = z
  .object({
    min: z.coerce.number().optional(),
    max: z.coerce.number().optional(),
    currency: z.enum(["PKR", "USD"]),
    period: z.enum(["month", "year"])
  })
  .partial({ min: true, max: true });

export const sourceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url().optional(),
  publishedOn: z.coerce.date().optional()
});

export const jobSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  company: z.string().min(1),
  location: locationSchema,
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
  categories: z.array(z.string()).default([]),
  salary: salarySchema.optional(),
  applyUrl: z.string().url().optional(),
  applyEmail: z.string().email().optional(),
  description: z.string().min(20),
  requirements: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  experienceLevel: z.enum(["Junior", "Mid", "Senior"]).optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]),
  postedAt: z.coerce.date(),
  expiresAt: z.coerce.date().optional(),
  source: sourceSchema,
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional()
    })
    .optional()
});

export const companySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(1),
  logoUrl: z.string().url().optional(),
  website: z.string().url().optional(),
  about: z.string().optional(),
  hq: z.string().optional(),
  social: z
    .object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
      facebook: z.string().url().optional()
    })
    .optional()
});

export type JobInput = z.infer<typeof jobSchema>;
export type CompanyInput = z.infer<typeof companySchema>;

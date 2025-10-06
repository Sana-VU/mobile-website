import type { Metadata } from "next";
import type { JobDocument } from "@/models/Job";

const baseUrl = process.env.NEXTAUTH_URL || "https://pakjobs.example.com";

export const siteConfig = {
  name: "PakJobs",
  description: "Curated Pakistan job alerts from newspapers and official sources.",
  url: baseUrl,
  defaultMetadata: {
    metadataBase: new URL(baseUrl),
    title: {
      default: "PakJobs • Verified Jobs in Pakistan",
      template: "%s • PakJobs"
    },
    description: "Discover curated job opportunities across Pakistan with verified sources and timely updates.",
    openGraph: {
      type: "website",
      locale: "en_PK",
      siteName: "PakJobs",
      url: baseUrl,
      title: "PakJobs",
      description: "Discover curated job opportunities across Pakistan with verified sources and timely updates."
    },
    twitter: {
      card: "summary_large_image",
      title: "PakJobs",
      description: "Curated jobs for Pakistan",
      creator: "@pakjobs"
    }
  } as Metadata
};

export function jobPostingSchema(job: JobDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.postedAt?.toISOString?.() ?? new Date().toISOString(),
    validThrough: job.expiresAt?.toISOString?.(),
    employmentType: job.type,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company?.name,
      sameAs: job.company?.website
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location.city,
        addressRegion: job.location.region,
        addressCountry: job.location.country ?? "Pakistan"
      }
    },
    directApply: Boolean(job.applyUrl || job.applyEmail),
    applicantLocationRequirements: job.location.remote ? "Remote" : "Onsite",
    baseSalary: job.salary?.min && {
      "@type": "MonetaryAmount",
      currency: job.salary?.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary?.min,
        maxValue: job.salary?.max,
        unitText: job.salary?.period === "month" ? "MONTH" : "YEAR"
      }
    }
  };
}

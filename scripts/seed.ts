import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Company from "@/models/Company";
import Job from "@/models/Job";
import { slugify } from "@/lib/utils";

const companiesData = [
  { name: "State Bank of Pakistan", hq: "Karachi", website: "https://www.sbp.org.pk" },
  { name: "Pakistan Software Export Board", hq: "Islamabad", website: "https://pseb.org.pk" },
  { name: "Punjab Public Service Commission", hq: "Lahore", website: "https://www.ppsc.gop.pk" },
  { name: "Karachi Electric", hq: "Karachi", website: "https://www.ke.com.pk" },
  { name: "National Database & Registration Authority", hq: "Islamabad", website: "https://www.nadra.gov.pk" },
  { name: "Careem Pakistan", hq: "Karachi", website: "https://www.careem.com" },
  { name: "Systems Limited", hq: "Lahore", website: "https://www.systemsltd.com" },
  { name: "Meezan Bank", hq: "Karachi", website: "https://www.meezanbank.com" },
  { name: "Engro Corporation", hq: "Karachi", website: "https://www.engro.com" },
  { name: "Telecom Regulatory Authority", hq: "Islamabad", website: "https://www.pta.gov.pk" }
];

const jobTemplates = [
  {
    title: "Software Engineer (React)",
    type: "Full-time",
    categories: ["IT"],
    tags: ["React", "TypeScript", "Frontend"],
    location: { city: "Karachi", region: "Sindh", country: "Pakistan", remote: false }
  },
  {
    title: "Assistant Director (BPS-17)",
    type: "Full-time",
    categories: ["Govt"],
    tags: ["Administration"],
    location: { city: "Islamabad", region: "ICT", country: "Pakistan", remote: false }
  },
  {
    title: "Data Analyst", type: "Full-time", categories: ["IT"], tags: ["SQL", "BI"], location: { city: "Lahore", region: "Punjab", country: "Pakistan", remote: true }
  },
  {
    title: "Branch Operations Manager",
    type: "Full-time",
    categories: ["Banking"],
    tags: ["Operations", "Finance"],
    location: { city: "Karachi", region: "Sindh", country: "Pakistan", remote: false }
  },
  {
    title: "Medical Officer",
    type: "Full-time",
    categories: ["Healthcare"],
    tags: ["MBBS"],
    location: { city: "Quetta", region: "Balochistan", country: "Pakistan", remote: false }
  }
];

async function seed() {
  await connectDB();
  await Company.deleteMany({});
  await Job.deleteMany({});

  const companies = await Company.insertMany(
    companiesData.map((company) => ({
      ...company,
      slug: slugify(company.name)
    }))
  );

  const now = Date.now();
  const jobsPayload = Array.from({ length: 50 }).map((_, index) => {
    const template = jobTemplates[index % jobTemplates.length];
    const company = companies[index % companies.length];
    const postedAt = new Date(now - index * 86_400_000);
    return {
      ...template,
      title: `${template.title} ${index + 1}`,
      slug: slugify(`${template.title}-${index + 1}`),
      company: company._id,
      description: `### Role summary\n\nWe are seeking a ${template.title.toLowerCase()} to join our team.\n\n- Deliver high-quality work\n- Collaborate with cross-functional teams`,
      status: index % 5 === 0 ? "draft" : "published",
      featured: index % 7 === 0,
      postedAt,
      source: { name: "Dawn", url: "https://epaper.dawn.com" },
      tags: template.tags,
      categories: template.categories
    };
  });

  await Job.insertMany(jobsPayload);
  console.log("Seeded companies and jobs");
  await mongoose.connection.close();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

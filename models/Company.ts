import { Schema, model, models, type Document } from "mongoose";

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logoUrl: String,
    website: String,
    about: String,
    hq: String,
    social: {
      linkedin: String,
      twitter: String,
      facebook: String
    },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "companies"
  }
);

export type CompanyDocument = Document & {
  name: string;
  slug: string;
  logoUrl?: string;
  website?: string;
  about?: string;
  hq?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  createdAt: Date;
};

const Company = models.Company || model<CompanyDocument>("Company", CompanySchema);

export default Company;

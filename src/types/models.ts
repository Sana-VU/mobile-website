// Define types for database models
export type Brand = {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Vendor = {
  id: number;
  name: string;
  slug: string;
  website: string | null;
  logo?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Phone = {
  id: number;
  name: string;
  slug: string;
  brandId: number;
  releaseYear: number;
  displayInch: number;
  ramGB: number;
  storageGB: number;
  batteryMAh: number;
  fiveG: boolean;
  chipset: string | null;
  primaryImage: string | null;
  secondaryImages: string | null;
  ptaApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type VendorPrice = {
  id: number;
  phoneId: number;
  vendorId: number;
  pricePKR: number;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
  vendor: Vendor;
};

// Extended types with relations
export type PhoneWithBrand = Phone & {
  brand: Brand;
  vendorPrices?: VendorPrice[];
};

export type PhoneWithDetails = Phone & {
  brand: Brand;
  vendorPrices: VendorPrice[];
};

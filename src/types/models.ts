// Define types for database models
export type Brand = {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
};

export type Vendor = {
  id: number;
  name: string;
  website: string;
  logo?: string | null;
};

export type Phone = {
  id: number;
  name: string;
  brandId: number;
  releaseYear: number;
  displayInch: number;
  ramGB: number;
  storageGB: number;
  batteryMAh: number;
  fiveG: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type VendorPrice = {
  id: number;
  phoneId: number;
  vendorId: number;
  price: number;
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

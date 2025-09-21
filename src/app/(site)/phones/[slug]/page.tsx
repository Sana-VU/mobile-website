import { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, CheckCircle2, Smartphone, Cpu, Battery } from "lucide-react";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    return {
      title: "Phone Not Found",
    };
  }

  return {
    title: `${phone.brand.name} ${phone.name} - Specs, Prices & Reviews`,
    description: `Check out the ${phone.brand.name} ${phone.name} with ${phone.ramGB}GB RAM, ${phone.storageGB}GB storage, ${phone.displayInch}" display, and ${phone.batteryMAh}mAh battery. Compare prices from top vendors.`,
    openGraph: {
      title: `${phone.brand.name} ${phone.name} - Specs, Prices & Reviews`,
      description: `Check out the ${phone.brand.name} ${phone.name} with ${phone.ramGB}GB RAM, ${phone.storageGB}GB storage, ${phone.displayInch}" display, and ${phone.batteryMAh}mAh battery. Compare prices from top vendors.`,
      type: "website",
    },
  };
}

// Get phone data by slug
async function getPhoneBySlug(slug: string) {
  const phone = await db.phone.findFirst({
    where: { slug },
    include: {
      brand: true,
      vendorPrices: {
        include: {
          vendor: true,
        },
        orderBy: {
          pricePKR: "asc",
        },
      },
    },
  });

  return phone;
}

// Get related phones from the same brand
async function getRelatedPhones(brandId: number, currentPhoneId: number) {
  const relatedPhones = await db.phone.findMany({
    where: {
      brandId,
      id: {
        not: currentPhoneId,
      },
    },
    include: {
      brand: true,
      vendorPrices: {
        include: {
          vendor: true,
        },
        orderBy: {
          pricePKR: "asc",
        },
        take: 1,
      },
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return relatedPhones;
}

// Generate Product structured data for SEO
function generateProductStructuredData(phone: {
  id: number;
  name: string;
  ramGB: number;
  storageGB: number;
  displayInch: number;
  batteryMAh: number;
  brand: { name: string };
  vendorPrices: Array<{
    pricePKR: number;
    vendor: { name: string };
  }>;
}) {
  const lowestPrice = phone.vendorPrices[0]?.pricePKR || 0;
  const highestPrice =
    phone.vendorPrices[phone.vendorPrices.length - 1]?.pricePKR || lowestPrice;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${phone.brand.name} ${phone.name}`,
    image: "/phone-placeholder.jpg", // In a real app, you'd have actual images
    description: `${phone.brand.name} ${phone.name} with ${phone.ramGB}GB RAM, ${phone.storageGB}GB storage, ${phone.displayInch}" display, and ${phone.batteryMAh}mAh battery.`,
    brand: {
      "@type": "Brand",
      name: phone.brand.name,
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceCurrency: "PKR",
      offerCount: phone.vendorPrices.length,
      offers: phone.vendorPrices.map(
        (vp: { pricePKR: number; vendor: { name: string } }) => ({
          "@type": "Offer",
          price: vp.pricePKR,
          priceCurrency: "PKR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: vp.vendor.name,
          },
        })
      ),
    },
  };
}

export default async function PhoneDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    notFound();
  }

  const relatedPhones = await getRelatedPhones(phone.brand.id, phone.id);
  const structuredData = generateProductStructuredData(phone);
  const lowestPrice = phone.vendorPrices[0]?.pricePKR || 0;

  // Determine if phone is PTA approved (for demo, we'll say 50% are)
  const isPtaApproved = phone.id % 2 === 0;

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Breadcrumbs structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://whatmobile.example.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Phones",
                item: "https://whatmobile.example.com/phones",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${phone.brand.name} ${phone.name}`,
                item: `https://whatmobile.example.com/phones/${slug}`,
              },
            ],
          }),
        }}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden bg-secondary/10 aspect-square flex items-center justify-center">
              <div className="text-4xl font-semibold text-muted-foreground/50">
                {phone.brand.name} {phone.name}
              </div>
              {/* In a real app, you'd have actual images here */}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded bg-secondary/10"
                />
              ))}
            </div>
          </div>

          {/* Phone Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">
                  {phone.brand.name} {phone.name}
                </h1>
                {phone.fiveG && (
                  <Badge variant="secondary" className="ml-2">
                    5G
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold">
                  {formatPrice(lowestPrice)}
                </span>
                {isPtaApproved ? (
                  <Badge className="bg-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> PTA Approved
                  </Badge>
                ) : (
                  <Badge variant="destructive">PTA Tax Applicable</Badge>
                )}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <span>{phone.displayInch}&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-muted-foreground" />
                <span>{phone.ramGB} GB RAM</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-muted-foreground"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12h2" />
                  <path d="M6 8h2" />
                  <path d="M10 4h2" />
                  <path d="M14 8h2" />
                  <path d="M18 12h2" />
                  <path d="M10 20h2" />
                  <path d="m16 16 1.9 1.9" />
                  <path d="M4 16a4 4 0 0 0 6.7 3" />
                  <path d="M7 7a4 4 0 0 1 6.7-3" />
                  <path d="M12 18a4 4 0 0 0 0-8" />
                </svg>
                <span>{phone.storageGB} GB Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="h-5 w-5 text-muted-foreground" />
                <span>{phone.batteryMAh} mAh</span>
              </div>
            </div>

            {/* Vendor Prices */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Available Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phone.vendorPrices.map((vp) => (
                    <div
                      key={vp.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-secondary/10"
                    >
                      <div>
                        <p className="font-medium">{vp.vendor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Official Store
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(vp.pricePKR)}
                        </p>
                        {/* In a real app, this would use an actual affiliate URL */}
                        <Button size="sm" className="mt-1">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specifications */}
        <Tabs defaultValue="specs" className="mt-10">
          <TabsList>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Display</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Size</span>
                        <span className="font-medium">
                          {phone.displayInch} inches
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">AMOLED</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">
                          Resolution
                        </span>
                        <span className="font-medium">1080 x 2400 pixels</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-6">
                      Performance
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">RAM</span>
                        <span className="font-medium">{phone.ramGB} GB</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="font-medium">
                          {phone.storageGB} GB
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Processor</span>
                        <span className="font-medium">Snapdragon 8 Gen 2</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Battery</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">
                          {phone.batteryMAh} mAh
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">
                          Fast Charging
                        </span>
                        <span className="font-medium">67W</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">
                          Wireless Charging
                        </span>
                        <span className="font-medium">Yes</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium mb-3 mt-6">Other</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">5G</span>
                        <span className="font-medium">
                          {phone.fiveG ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">
                          Release Year
                        </span>
                        <span className="font-medium">{phone.releaseYear}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-muted-foreground">OS</span>
                        <span className="font-medium">Android 14</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">High-resolution display</p>
                        <p className="text-sm text-muted-foreground">
                          Enjoy vibrant colors and sharp text on the{" "}
                          {phone.displayInch}&quot; screen
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Powerful performance</p>
                        <p className="text-sm text-muted-foreground">
                          {phone.ramGB}GB RAM ensures smooth multitasking and
                          gaming
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Long-lasting battery</p>
                        <p className="text-sm text-muted-foreground">
                          {phone.batteryMAh}mAh battery keeps you powered all
                          day
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Premium design</p>
                        <p className="text-sm text-muted-foreground">
                          Sleek, modern design with premium materials
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {phone.fiveG ? "5G Ready" : "4G LTE"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {phone.fiveG
                            ? "Experience lightning-fast 5G connectivity"
                            : "Fast and reliable 4G connectivity"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Ample storage</p>
                        <p className="text-sm text-muted-foreground">
                          {phone.storageGB}GB of storage for all your apps and
                          media
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No reviews available for this product yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Phones */}
        {relatedPhones.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              More from {phone.brand.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedPhones.map((relatedPhone) => (
                <Card key={relatedPhone.id} className="overflow-hidden">
                  <div className="h-48 bg-secondary/20 flex items-center justify-center">
                    <div className="text-muted-foreground">
                      {relatedPhone.name}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold truncate">
                      <a
                        href={`/phones/${relatedPhone.brand.name.toLowerCase()}-${relatedPhone.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}-${relatedPhone.id}`}
                        className="hover:underline"
                      >
                        {relatedPhone.brand.name} {relatedPhone.name}
                      </a>
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-medium">
                        {formatPrice(
                          relatedPhone.vendorPrices?.[0]?.pricePKR ?? 0
                        )}
                      </p>
                      {relatedPhone.fiveG && (
                        <Badge variant="secondary" className="ml-2">
                          5G
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

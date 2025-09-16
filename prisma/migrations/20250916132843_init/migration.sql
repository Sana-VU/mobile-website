-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "ramGB" INTEGER NOT NULL,
    "storageGB" INTEGER NOT NULL,
    "fiveG" BOOLEAN NOT NULL,
    "batteryMAh" INTEGER NOT NULL,
    "displayInch" REAL NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    CONSTRAINT "Phone_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VendorPrice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    CONSTRAINT "VendorPrice_phoneId_fkey" FOREIGN KEY ("phoneId") REFERENCES "Phone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VendorPrice_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comparison" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneAId" INTEGER NOT NULL,
    "phoneBId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comparison_phoneAId_fkey" FOREIGN KEY ("phoneAId") REFERENCES "Phone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comparison_phoneBId_fkey" FOREIGN KEY ("phoneBId") REFERENCES "Phone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE INDEX "Phone_brandId_idx" ON "Phone"("brandId");

-- CreateIndex
CREATE INDEX "Phone_ramGB_idx" ON "Phone"("ramGB");

-- CreateIndex
CREATE INDEX "Phone_fiveG_idx" ON "Phone"("fiveG");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_name_key" ON "Vendor"("name");

-- CreateIndex
CREATE INDEX "VendorPrice_price_idx" ON "VendorPrice"("price");
